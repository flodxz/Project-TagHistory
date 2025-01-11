// src/managers/UIManager.js
import { generateCategoryDropdown, injectCategoryStyles } from '../utils/categoryUI.js';
import { getCategoryColor, getCategoryName } from '../config/categories.js';

export class UIManager {
    constructor(timelineManager) {
        this.timelineManager = timelineManager;
    }

    initialize() {
        // Generate dynamic category UI elements
        generateCategoryDropdown();
        injectCategoryStyles();
        this.setupEventListeners();
        this.setupZoomControls();
    }

    setupEventListeners() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.timelineManager.handleFilter(btn));
        });

        const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.className = 'search-results';
    searchInput.parentElement.appendChild(searchResultsContainer);

    // Add ESC key handler
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            this.timelineManager.searchManager.clearSearch(searchResultsContainer);
        }
    });

    // Debounce search to improve performance
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            this.timelineManager.handleSearch(e.target.value);
        }, 300);
    });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResultsContainer.contains(e.target)) {
                searchResultsContainer.style.display = 'none';
            }
        });

        const modal = document.getElementById('eventModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        document.querySelector('.close-button').addEventListener('click', () => {
            document.getElementById('eventModal').style.display = 'none';
        });

        // Add event listener for timeline inversion
        document.getElementById('invertTimeline').addEventListener('click', () => {
            this.timelineManager.invertTimeline();
        });
    }

    setupZoomControls() {
        document.getElementById('zoomIn').addEventListener('click', () => 
            this.timelineManager.controls.handleZoom(1.2));
        document.getElementById('zoomOut').addEventListener('click', () => 
            this.timelineManager.controls.handleZoom(0.8));
        document.getElementById('resetTimeline').addEventListener('click', () => 
            this.timelineManager.controls.resetTimeline());
    }

    handleZoom(factor) {
        this.currentZoom *= factor;
        const timeline = document.querySelector('.timeline-container');
        
        // Add or remove zoomed-out class based on zoom level
        if (this.currentZoom < 1) {
            timeline.classList.add('zoomed-out');
        } else {
            timeline.classList.remove('zoomed-out');
        }
        
        this.timelineManager.renderTimeline();
    }

    showEventDetails(event) {
        const modal = document.getElementById('eventModal');
        const modalBody = modal.querySelector('.modal-body');
    
        const categoryColor = getCategoryColor(event.category);
    
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'event-details-container';
        detailsContainer.style.setProperty('--category-color', categoryColor);
    
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.textContent = 'x';
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    
        const categoryLabel = document.createElement('div');
        categoryLabel.className = 'category-label';
        categoryLabel.textContent = getCategoryName(event.category);
    
        const title = `
            <br>
            <div class="event-title">${event.title.trim()}</div>
            <div class="event-date">${event.end
                ? `${this.timelineManager.formatDate(event.start)} - ${this.timelineManager.formatDate(event.end)}`
                : this.timelineManager.formatDate(event.start)}</div>
        `.trim();
    
        const description = `
            <div class="event-description">${event.description.trim()}</div>
        `.trim();
    
        detailsContainer.innerHTML = title + description;
        detailsContainer.appendChild(closeButton);
        detailsContainer.appendChild(categoryLabel);
    
        modalBody.innerHTML = '';
        modalBody.appendChild(detailsContainer);
        modal.style.display = 'block';
    }
}