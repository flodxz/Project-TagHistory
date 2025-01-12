// src/TimelineManager.js
import { events } from '../events.js';

import { EventRenderer } from './renderers/EventRenderer.js';
import { MarkerRenderer } from './renderers/MarkerRenderer.js';

import { UIManager } from './managers/UIManager.js';
import { SearchManager } from './managers/SearchManager.js';
import { FilterManager } from './managers/FilterManager.js';

import { Controls } from './utils/Controls.js';
import { DateFormatter } from './utils/DateFormatter.js';


export class TimelineManager {
    constructor() {
        this.baseSpacing = 1;
        this.currentZoom = 1;
        this.startDate = new Date('2013-10-01');
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 3);
        this.endDate = futureDate;
        this.isInverted = false;
        this.events = events;
        this.eventRows = new Map();
        this.rowHeight = 80;
        this.timelineLeftMargin = 90;

        // Initialize sub-managers
        this.eventRenderer = new EventRenderer(this);
        this.markerRenderer = new MarkerRenderer(this);
        this.uiManager = new UIManager(this);
        this.searchManager = new SearchManager(this);
        this.filterManager = new FilterManager(this);
        this.controls = new Controls(this);
        this.dateFormatter = new DateFormatter();

        this.autoForwardMethods();
    }

    // Forward all methods from sub-managers
    autoForwardMethods() {
        const subManagers = [
            this.eventRenderer,
            this.markerRenderer,
            this.uiManager,
            this.searchManager,
            this.filterManager,
            this.controls,
            this.dateFormatter,
        ];

        subManagers.forEach(manager => {
            const managerMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(manager))
                .filter(name => typeof manager[name] === 'function' && name !== 'constructor');

            managerMethods.forEach(method => {
                if (!this[method]) { // Avoid overwriting existing methods in TimelineManager
                    this[method] = (...args) => manager[method](...args);
                }
            });
        });
    }

    initialize() {
        this.uiManager.setupEventListeners();
        this.renderTimeline();
        this.uiManager.setupZoomControls();

        window.timelineManager = this;
        
        const updateAtMidnight = () => {
            const now = new Date();
            const night = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 1
            );
            const msToMidnight = night - now;
            
            setTimeout(() => {
                this.endDate = new Date();
                this.renderTimeline();
                updateAtMidnight();
            }, msToMidnight);
        };
        
        updateAtMidnight();
    }

    setupMidnightUpdate() {
        const updateAtMidnight = () => {
            const now = new Date();
            const night = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 1
            );
            const msToMidnight = night - now;
            
            setTimeout(() => {
                this.endDate = new Date();
                this.renderTimeline();
                updateAtMidnight();
            }, msToMidnight);
        };
        
        updateAtMidnight();
    }

    calculateTimelineHeight() {
        const totalDays = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
        return totalDays * this.baseSpacing * this.currentZoom;
    }

    calculatePositionForDate(date) {
        const days = Math.floor((new Date(date) - this.startDate) / (1000 * 60 * 60 * 24));
        return days * this.baseSpacing * this.currentZoom;
    }

    createTimelineContinuation() {
        const container = document.createElement('div');
        container.className = 'timeline-continuation';
        
        if (this.isInverted) {
            container.classList.add('timeline-inverted');
        }
        
        const arrow = document.createElement('div');
        arrow.className = 'timeline-arrow';
        
        const text = document.createElement('div');
        text.className = 'continuation-text';
        text.textContent = 'Time continues...';
        
        container.appendChild(arrow);
        container.appendChild(text);
        
        return container;
    }
    

    renderTimeline() {
        const timeline = document.querySelector('.timeline-container');
        timeline.innerHTML = '';
        this.eventRows.clear();
        
        const timelineElements = document.createElement('div');
        timelineElements.className = 'timeline-elements';
        timelineElements.style.zIndex = '1';
        
        const timelineLine = document.createElement('div');
        timelineLine.className = 'timeline';
        timelineLine.style.height = `${this.calculateTimelineHeight()}px`;
        
        timelineElements.appendChild(this.createYearMarkers());
        timelineElements.appendChild(this.createMonthMarkers());
        timelineElements.appendChild(timelineLine);
        
        timeline.appendChild(timelineElements);
        
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'events-container';
        eventsContainer.style.zIndex = '2';
        
        events.forEach(event => {
            const container = this.createEventContainer(event);
            eventsContainer.appendChild(container);
        });
        
        timeline.appendChild(eventsContainer);
    
        const continuation = this.createTimelineContinuation();
        if (this.isInverted) {
            continuation.style.top = '0';
        } else {
            continuation.style.top = `${this.calculateTimelineHeight() - 40}px`;
        }
        continuation.style.zIndex = '2';
        timeline.appendChild(continuation);
    }


    createTimelineLine() {
        const timelineLine = document.createElement('div');
        timelineLine.className = 'timeline';
        timelineLine.style.height = `${this.calculateTimelineHeight()}px`;
        return timelineLine;
    }
}