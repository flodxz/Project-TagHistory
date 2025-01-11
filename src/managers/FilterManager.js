export class FilterManager {
    constructor(timelineManager) {
        this.timelineManager = timelineManager;
        this.activeFilters = ['all'];
    }

    applyDropdownFilters(selectedValues) {
        this.activeFilters = selectedValues;
        this.applyFilters();
    }

    applyFilters() {
        const visibleEvents = new Map(); // Map to store visible events and their containers
        const containers = document.querySelectorAll('.event-container');

        // First pass: determine visibility and collect visible events
        containers.forEach(container => {
            const card = container.querySelector('.event-card');
            const eventTitle = card.querySelector('.event-title').textContent;
            const event = this.timelineManager.events.find(e => e.title === eventTitle);

            const matchesFilter = this.activeFilters.includes('all') ||
                this.activeFilters.some(filter => card.classList.contains(filter));
            const matchesSearch = !this.timelineManager.searchManager.searchTerm ||
                (event && this.timelineManager.searchManager.searchEvent(event, this.timelineManager.searchManager.searchTerm));

            if (matchesFilter && matchesSearch) {
                container.style.display = 'flex';
                if (event) {
                    visibleEvents.set(event, container);
                }
            } else {
                container.style.display = 'none';
            }
        });

        // Reset and recalculate rows for visible events
        this.resetAndRecalculateRows(visibleEvents);
    }

    applyFiltersWithOverlap() {
        const visibleEvents = new Map();
        const containers = document.querySelectorAll('.event-container');

        // First pass: determine visibility
        containers.forEach(container => {
            const card = container.querySelector('.event-card');
            const eventTitle = card.querySelector('.event-title').textContent;
            const event = this.timelineManager.events.find(e => e.title === eventTitle);

            const matchesFilter = this.activeFilters.includes('all') ||
                this.activeFilters.some(filter => card.classList.contains(filter));
            const matchesSearch = !this.timelineManager.searchManager.searchTerm ||
                (event && this.timelineManager.searchManager.searchEvent(event, this.timelineManager.searchManager.searchTerm));

            if (matchesFilter && matchesSearch) {
                container.style.display = 'flex';
                if (event) {
                    visibleEvents.set(event, container);
                }
            } else {
                container.style.display = 'none';
            }
        });

        // Sort visible events by start date
        const sortedEvents = Array.from(visibleEvents.keys())
            .sort((a, b) => new Date(a.start) - new Date(b.start));

        // Apply positioning with overlap handling
        this.positionEventsWithOverlap(sortedEvents, visibleEvents);
    }

    

    resetAndRecalculateRows(visibleEvents) {
        // Clear existing row assignments
        this.timelineManager.eventRows.clear();

        // Convert Map to array and sort by start date
        const sortedEvents = Array.from(visibleEvents.keys()).sort((a, b) => 
            new Date(a.start) - new Date(b.start)
        );

        const activeRows = [];
        const baseOffset = 90;  // Initial left margin
        const incrementOffset = 220; // Space between columns

        sortedEvents.forEach(event => {
            const startDate = new Date(event.start);
            const endDate = event.end ? new Date(event.end) : startDate;
            
            // Find the first available row
            let row = 0;
            while (this.checkRowConflict(activeRows, startDate, endDate, row)) {
                row++;
            }
            
            // Add event to active rows
            activeRows.push({
                row,
                start: startDate,
                end: endDate
            });

            // Update the event's container position
            const container = visibleEvents.get(event);
            if (container) {
                // Update row mapping
                this.timelineManager.eventRows.set(event, row);

                // Update container styles
                const wrapper = container.querySelector('.event-container-wrapper');
                const horizontalOffset = baseOffset + (row * incrementOffset);
                
                // Update all connectors
                const connectors = container.querySelectorAll('.event-connector');
                connectors.forEach(connector => {
                    if (connector.classList.contains('start-connector') || 
                        connector.classList.contains('end-connector')) {
                        connector.style.left = `${baseOffset - 55}px`;
                        connector.style.width = '55px';
                    } else if (connector.classList.contains('vertical-connector')) {
                        connector.style.left = `${baseOffset}px`;
                    } else if (connector.classList.contains('card-connector')) {
                        connector.style.left = `${baseOffset}px`;
                        connector.style.width = `${horizontalOffset - baseOffset + 140}px`;
                    } else {
                        // Single event connector
                        connector.style.left = `${baseOffset - 55}px`;
                        connector.style.width = `${horizontalOffset - baseOffset + 240}px`;
                    }
                });

                // Update wrapper position
                if (wrapper) {
                    wrapper.style.marginLeft = `${horizontalOffset}px`;
                }
            }
        });
    }

    checkRowConflict(activeRows, startDate, endDate, targetRow) {
        const overlapBuffer = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        return activeRows.some(active => 
            active.row === targetRow && 
            startDate <= new Date(active.end.getTime() + overlapBuffer) && 
            endDate >= new Date(active.start.getTime() - overlapBuffer)
        );
    }
}