// src/renderers/MarkerRenderer.js
export class MarkerRenderer {
    constructor(timelineManager) {
        this.timelineManager = {events: []};
        this.timelineManager = timelineManager;
    }

    createYearMarkers() {
        const yearMarkers = document.createElement('div');
        yearMarkers.className = 'year-markers';
        
        // Access dates from the timelineManager
        const startDate = this.timelineManager.startDate;
        const endDate = this.timelineManager.endDate;
        
        let currentDate = new Date(startDate);
        const endYear = endDate.getFullYear();
        
        while (currentDate.getFullYear() <= endYear) {
            const yearLabel = document.createElement('div');
            yearLabel.className = 'year-label';
            yearLabel.textContent = currentDate.getFullYear();
            
            const position = this.timelineManager.calculatePositionForDate(currentDate);
            yearLabel.style.top = `${this.timelineManager.isInverted ? 
                this.timelineManager.calculateTimelineHeight() - position : 
                position}px`;
            
            yearMarkers.appendChild(yearLabel);
            
            currentDate.setFullYear(currentDate.getFullYear() + 1);
            currentDate.setMonth(0);
            currentDate.setDate(1);
        }
        
        return yearMarkers;
    }

    createMonthMarkers() {
        const markers = document.createElement('div');
        markers.className = 'month-markers';
        
        // Access dates from the timelineManager
        const startDate = this.timelineManager.startDate;
        const endDate = this.timelineManager.endDate;
        
        let currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
            const marker = document.createElement('div');
            marker.className = 'month-marker';
            
            const label = document.createElement('div');
            label.className = 'month-label';
            label.textContent = currentDate.toLocaleString('default', { 
                month: 'short'
            });
            
            const position = this.timelineManager.calculatePositionForDate(currentDate);
            marker.style.top = `${this.timelineManager.isInverted ? 
                this.timelineManager.calculateTimelineHeight() - position : 
                position}px`;
            label.style.top = `${this.timelineManager.isInverted ? 
                this.timelineManager.calculateTimelineHeight() - position : 
                position}px`;
            
            markers.appendChild(marker);
            markers.appendChild(label);
            
            currentDate.setMonth(currentDate.getMonth() + 1);
            currentDate.setDate(1);
        }
        
        return markers;
    }
}