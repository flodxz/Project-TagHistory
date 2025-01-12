// src/utils/categoryUI.js
import { getAllCategories } from '../config/categories.js';

export function generateCategoryDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (!dropdownMenu) return;

    dropdownMenu.innerHTML = ''; // Clear existing items

    // Add "All Events" option
    const allEventsItem = document.createElement('li');
    allEventsItem.className = 'dropdown-item selected';
    allEventsItem.setAttribute('data-value', 'all');
    allEventsItem.textContent = 'All Events';
    dropdownMenu.appendChild(allEventsItem);

    // Add category options dynamically
    getAllCategories().forEach(category => {
        const item = document.createElement('li');
        item.className = 'dropdown-item';
        item.setAttribute('data-value', category.id);
        item.textContent = category.name;
        item.style.borderLeft = `${category.borderStyle} ${category.color}`;
        dropdownMenu.appendChild(item);
    });
}

// Inject styles into the page for dynamic categories
export function injectCategoryStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = generateCategoryStyles();
    document.head.appendChild(styleSheet);
}

// Initialize the dropdown on page load
document.addEventListener('DOMContentLoaded', () => {
    generateCategoryDropdown();
});