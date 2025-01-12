// src/utils/Controls.js

export class Controls {
    constructor(timelineManager) {
        this.timelineManager = timelineManager;
    }

    invertTimeline() {
        this.timelineManager.isInverted = !this.timelineManager.isInverted;
    
        const continuationArrow = document.querySelector('.timeline-arrow');
        if (continuationArrow) {
            continuationArrow.style.setProperty('--arrow-direction', this.timelineManager.isInverted ? '-1' : '1');
        }
    
        this.timelineManager.renderTimeline();
    }

    handleZoom(factor) {
        this.timelineManager.currentZoom *= factor;
        const timeline = document.querySelector('.timeline-container');
        
        if (this.timelineManager.currentZoom < 1) {
            timeline.classList.add('zoomed-out');
        } else {
            timeline.classList.remove('zoomed-out');
        }
        
        this.timelineManager.renderTimeline();
    }

    resetTimeline() {
        this.timelineManager.currentZoom = 1;
    
        const timelineContainer = document.querySelector('.timeline-container');
        timelineContainer.classList.remove('zoomed-out');
    
        this.timelineManager.filterManager.activeFilter = 'all';
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === 'all');
        });
    
        this.timelineManager.isInverted = false;
    
        this.timelineManager.searchManager.searchTerm = '';
        document.getElementById('searchInput').value = '';
    
        const dropdown = document.querySelector('.dropdown');
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => item.classList.remove('selected'));
        const allItem = dropdown.querySelector('[data-value="all"]');
        allItem.classList.add('selected');
    
        this.timelineManager.filterManager.applyDropdownFilters(['all']);
    
        // NEED WORK ON THIS
        this.resetVerticalStacking();
    
        this.timelineManager.renderTimeline();
    }
    
    // NEED WORK ON THIS
    resetVerticalStacking() {
        this.timelineManager.eventRows.clear();
    
        const eventElements = document.querySelectorAll('.event-container');
        eventElements.forEach(event => {
            event.style.top = '';
        });
    }
}
