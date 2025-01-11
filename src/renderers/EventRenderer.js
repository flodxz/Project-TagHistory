// src/renderers/EventRenderer.js
export class EventRenderer {
    constructor(timelineManager) {
        this.timelineManager = timelineManager;
    }

    createEventContainer(event) {
        const container = document.createElement('div');
        container.className = `event-container ${event.category}`;
        
        const { startPosition, endPosition, row } = this.calculateEventPosition(event);
        const duration = event.end ? Math.abs(endPosition - startPosition) : 0;
        
        // Position container based on timeline direction
        if (this.timelineManager.isInverted) {
            container.style.top = `${this.timelineManager.calculateTimelineHeight() - endPosition}px`;
        } else {
            container.style.top = `${startPosition}px`;
        }
        
        const baseZIndex = 1000;
        container.style.zIndex = baseZIndex - row;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'event-container-wrapper';
        
        const baseOffset = 90;
        const incrementOffset = 220;
        const horizontalOffset = baseOffset + (row * incrementOffset);
        wrapper.style.marginLeft = `${horizontalOffset}px`;
    
        if (event.end) {
            // Position vertical connector at the same horizontal offset as the row
            const verticalConnectorPosition = baseOffset + (row * incrementOffset);
            
            // Create start connector
            const startConnector = document.createElement('div');
            startConnector.className = 'event-connector start-connector';
            startConnector.style.left = `35px`;
            startConnector.style.width = `${verticalConnectorPosition - 33}px`;
            startConnector.style.top = '0px';
            
            // Create end connector
            const endConnector = document.createElement('div');
            endConnector.className = 'event-connector end-connector';
            endConnector.style.left = `35px`;
            endConnector.style.width = `${verticalConnectorPosition - 33}px`;
            endConnector.style.top = `${duration}px`;
            
            // Create vertical connector at the row's position
            const verticalConnector = document.createElement('div');
            verticalConnector.className = 'event-connector vertical-connector';
            verticalConnector.style.left = `${verticalConnectorPosition}px`;
            verticalConnector.style.top = '0px';
            verticalConnector.style.height = `${duration}px`;
            
            // Create connector to card
            const cardConnector = document.createElement('div');
            cardConnector.className = 'event-connector card-connector';
            cardConnector.style.left = `${verticalConnectorPosition}px`;
            cardConnector.style.width = `${140}px`; // Fixed width from vertical line to card
            
            const midPoint = duration / 2;
            cardConnector.style.top = `${midPoint}px`;
            
            container.appendChild(startConnector);
            container.appendChild(endConnector);
            container.appendChild(verticalConnector);
            container.appendChild(cardConnector);
    
            // Center the event card relative to the duration
            setTimeout(() => {
                const wrapperHeight = wrapper.offsetHeight;
                const centerOffset = midPoint - (wrapperHeight / 2);
                wrapper.style.marginTop = `${centerOffset}px`;
            }, 0);
        } else {
            // Single event connector
            const connector = document.createElement('div');
            connector.className = 'event-connector';
            connector.style.left = `${baseOffset - 55}px`;
            connector.style.width = `${horizontalOffset - baseOffset + 240}px`;
            container.appendChild(connector);
    
            setTimeout(() => {
                const wrapperHeight = wrapper.offsetHeight;
                wrapper.style.marginTop = `-${wrapperHeight / 2}px`;
            }, 0);
        }
    
        const card = this.createEventCard(event);
        wrapper.appendChild(card);        
        container.appendChild(wrapper);
        
        return container;
    }

    createEventCard(event) {
        const card = document.createElement('div');
        card.className = `event-card ${event.category}`;
        if (event.special) card.classList.add('special');

        const title = document.createElement('div');
        title.className = 'event-title';
        title.textContent = event.title;

        const date = document.createElement('div');
        date.className = 'event-date';
        date.textContent = this.formatDate(event.start);
        
        if (event.end) {
            date.textContent += ` - ${this.formatDate(event.end)}`;
        }

        card.append(title, date);
        card.addEventListener('click', () => this.timelineManager.showEventDetails(event));
        return card;
    }

    calculateEventPosition(event) {
    const startPosition = this.timelineManager.calculatePositionForDate(new Date(event.start));
    const endPosition = event.end ? this.timelineManager.calculatePositionForDate(new Date(event.end)) : startPosition;
    const duration = event.end ? Math.abs(endPosition - startPosition) : 0;

    // Calculate the overlap window
    const overlapWindow = this.timelineManager.rowHeight * 1.5; // Increased window to prevent tight stacking

    // Separate arrays for duration and single events
    const durationEvents = [];
    const singleEvents = [];

    // Safeguard against undefined or invalid events array
    if (!Array.isArray(this.timelineManager.events)) {
        console.error('timelineManager.events is not an array or is undefined:', this.timelineManager.events);
        return { startPosition, endPosition, duration, row: 0 };
    }

    // Filter through all events to determine overlap
    this.timelineManager.events.forEach(e => {
        const eStart = this.timelineManager.calculatePositionForDate(new Date(e.start));
        const eEnd = e.end ? this.timelineManager.calculatePositionForDate(new Date(e.end)) : eStart;

        // Check if events overlap
        if (
            Math.abs(eStart - startPosition) < overlapWindow || 
            (e.end && (
                (eStart <= startPosition && eEnd >= startPosition) ||
                (eStart <= endPosition && eEnd >= endPosition)
            ))
        ) {
            if (e.end) {
                durationEvents.push(e);
            } else {
                singleEvents.push(e);
            }
        }
    });

    // Calculate row based on position in respective array
    let row;
    if (event.end) {
        row = durationEvents.indexOf(event);
    } else {
        row = durationEvents.length + singleEvents.indexOf(event);
    }

    // Update row mapping for the event
    this.timelineManager.eventRows.set(event, row);

    return { startPosition, endPosition, duration, row };
}

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('default', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
}