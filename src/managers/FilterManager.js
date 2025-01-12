// src/managers/FilterManager.js

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
        const visibleEvents = new Map();
        const containers = document.querySelectorAll('.event-container');

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

        // NEED WORK ON THIS
        this.timelineManager.calculateEventPosition(containers, visibleEvents);
    }


    // NEED WORK ON THIS
    applyFiltersWithOverlap() {
        const visibleEvents = new Map();
        const containers = document.querySelectorAll('.event-container');
    
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
    
        this.timelineManager.calculateEventPosition(containers, visibleEvents);
    }
}