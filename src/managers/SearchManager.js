// src/managers/SearchManager.js
export class SearchManager {
    constructor(timelineManager) {
        this.timelineManager = timelineManager;
        this.searchTerm = '';
        this.searchResults = [];
    }

    handleSearch(term) {
        this.searchTerm = term.toLowerCase();
        const searchResultsContainer = document.querySelector('.search-results');
        
        if (!term.trim()) {
            this.clearSearch(searchResultsContainer);
            return;
        }

        this.searchResults = this.timelineManager.events.filter(event => this.searchEvent(event, term));

        if (this.searchResults.length > 0) {
            searchResultsContainer.innerHTML = this.searchResults
                .map((event, index) => `
                    <div class="search-result ${event.category}" data-index="${index}">
                        <div class="search-result-title">${event.title}</div>
                        <div class="search-result-date">${this.timelineManager.formatDate(event.start)}</div>
                    </div>
                `).join('');

            searchResultsContainer.querySelectorAll('.search-result').forEach(result => {
                result.addEventListener('click', () => {
                    const event = this.searchResults[parseInt(result.dataset.index)];
                    this.timelineManager.showEventDetails(event);
                    this.clearSearch(searchResultsContainer);
                });
            });

            searchResultsContainer.style.display = 'block';
        } else {
            searchResultsContainer.innerHTML = '<div class="no-results">No matching events found</div>';
            searchResultsContainer.style.display = 'block';
        }

        // Apply filters while maintaining event positioning
        this.timelineManager.filterManager.applyFiltersWithOverlap();
    }

    clearSearch(searchResultsContainer) {
        document.getElementById('searchInput').value = '';
        searchResultsContainer.style.display = 'none';
        this.searchResults = [];
        this.searchTerm = '';
        this.timelineManager.filterManager.applyFiltersWithOverlap();
    }

    searchEvent(event, term) {
        const searchFields = [
            event.title.toLowerCase(),
            event.description.toLowerCase(),
            ...(event.tags || []).map(tag => tag.toLowerCase())
        ];

        const terms = term.toLowerCase().split(' ');
        return terms.every(term => 
            searchFields.some(field => field.includes(term))
        );
    }
}