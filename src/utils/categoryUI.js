// src/utils/categoryUI.js

import { getAllCategories } from '../config/categories.js';

export function generateCategoryDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (!dropdownMenu) return;

    dropdownMenu.innerHTML = '';

    const allEventsItem = document.createElement('li');
    allEventsItem.className = 'dropdown-item selected';
    allEventsItem.setAttribute('data-value', 'all');
    allEventsItem.textContent = 'All Events';
    dropdownMenu.appendChild(allEventsItem);

    getAllCategories().forEach(category => {
        const item = document.createElement('li');
        item.className = 'dropdown-item';
        item.setAttribute('data-value', category.id);
        item.textContent = category.name;
        item.style.borderLeft = `${category.borderStyle} ${category.color}`;
        dropdownMenu.appendChild(item);
    });
}

export function injectCategoryStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = generateCategoryStyles();
    document.head.appendChild(styleSheet);
}

document.addEventListener('DOMContentLoaded', () => {
    generateCategoryDropdown();
});