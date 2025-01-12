// src/utils/headerControls.js

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownHeader = dropdown.querySelector('.dropdown-header');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    const label = dropdownHeader.querySelector('.label');
    const items = dropdown.querySelectorAll('.dropdown-item');

    let selectedValues = ['all'];

    label.textContent = 'Categories...';

    dropdownHeader.addEventListener('click', () => {
        dropdownHeader.classList.toggle('active');
        dropdownMenu.style.display = dropdownHeader.classList.contains('active') ? 'block' : 'none';
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;

            if (value === 'all') {
                selectedValues = ['all'];
                items.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
            } else {
                if (selectedValues.includes('all')) {
                    selectedValues = [];
                    dropdownMenu.querySelector('[data-value="all"]').classList.remove('selected');
                }

                if (selectedValues.includes(value)) {
                    selectedValues = selectedValues.filter(v => v !== value);
                    item.classList.remove('selected');
                } else {
                    selectedValues.push(value);
                    item.classList.add('selected');
                }

                if (selectedValues.length === 0) {
                    selectedValues = ['all'];
                    dropdownMenu.querySelector('[data-value="all"]').classList.add('selected');
                }
            }

            const timelineManager = window.timelineManager;
            timelineManager.filterManager.applyDropdownFilters(selectedValues);
            label.textContent = 'Categories...';
        });
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            dropdownHeader.classList.remove('active');
            dropdownMenu.style.display = 'none';
        }
    });
});