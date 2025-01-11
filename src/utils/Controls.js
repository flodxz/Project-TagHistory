// src/utils/Controls.js
export class Controls {
    constructor(timelineManager) {
        this.timelineManager = timelineManager;
    }

    invertTimeline() {
        // Update the state in TimelineManager, not locally
        this.timelineManager.isInverted = !this.timelineManager.isInverted;
    
        // Update arrow direction dynamically
        const continuationArrow = document.querySelector('.timeline-arrow');
        if (continuationArrow) {
            continuationArrow.style.setProperty('--arrow-direction', this.timelineManager.isInverted ? '-1' : '1');
        }
    
        // Re-render the timeline with the updated state
        this.timelineManager.renderTimeline();
    }

    handleZoom(factor) {
        // Update zoom in TimelineManager, not locally
        this.timelineManager.currentZoom *= factor;
        const timeline = document.querySelector('.timeline-container');
        
        // Add or remove zoomed-out class based on zoom level
        if (this.timelineManager.currentZoom < 1) {
            timeline.classList.add('zoomed-out');
        } else {
            timeline.classList.remove('zoomed-out');
        }
        
        this.timelineManager.renderTimeline();
    }

    resetTimeline() {
        // Reset zoom level in TimelineManager
        this.timelineManager.currentZoom = 1;
    
        // Remove zoomed-out class from timeline container
        const timelineContainer = document.querySelector('.timeline-container');
        timelineContainer.classList.remove('zoomed-out');
    
        // Reset active filter
        this.timelineManager.filterManager.activeFilter = 'all';
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === 'all');
        });
    
        // Reset inversion
        this.timelineManager.isInverted = false;
    
        // Clear search
        this.timelineManager.searchManager.searchTerm = '';
        document.getElementById('searchInput').value = '';
    
        // Reset dropdown to "All"
        const dropdown = document.querySelector('.dropdown');
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => item.classList.remove('selected'));
        const allItem = dropdown.querySelector('[data-value="all"]');
        allItem.classList.add('selected');
    
        // Notify FilterManager about the reset
        this.timelineManager.filterManager.applyDropdownFilters(['all']);
    
        // Reset vertical stacking of events
        this.resetVerticalStacking();
    
        // Re-render timeline to apply changes
        this.timelineManager.renderTimeline();
    }
    
    // Helper function to reset vertical stacking
    resetVerticalStacking() {
        // Clear the event rows map in TimelineManager
        this.timelineManager.eventRows.clear();
    
        // Reset the vertical stacking positions of all events
        const eventElements = document.querySelectorAll('.event-container');
        eventElements.forEach(event => {
            event.style.top = ''; // Remove any custom vertical positioning
        });
    }
}
