// src/utils/categoryUI.js

import { getAllCategories } from '../config/categories.js';

export function generateCategoryDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (!dropdownMenu) return;

    // Add "All Events" option
    const allEventsItem = document.createElement('li');
    allEventsItem.className = 'dropdown-item selected';
    allEventsItem.setAttribute('data-value', 'all');
    allEventsItem.textContent = 'All Events';
    dropdownMenu.appendChild(allEventsItem);

    // Add category options
    getAllCategories().forEach(category => {
        const item = document.createElement('li');
        item.className = 'dropdown-item';
        item.setAttribute('data-value', category.id);
        item.textContent = category.name;
        dropdownMenu.appendChild(item);
    });
}

// Add this to your existing CSS or create a new file: src/styles/dynamicCategories.css
export function injectCategoryStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = generateCategoryStyles();
    document.head.appendChild(styleSheet);
}