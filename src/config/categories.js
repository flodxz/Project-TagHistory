// src/config/categories.js

export const categories = {
    hypixel: {
        name: 'Hypixel',
        color: '#66ff66',
        borderStyle: '3px solid',
    },
    feuds: {
        name: 'Feuds',
        color: '#ff6666',
        borderStyle: '3px solid',
    },
    guilds: {
        name: 'Guilds',
        color: '#66f2ff',
        borderStyle: '3px solid',
    },
    other: {
        name: 'Other',
        color: '#ffffff',
        borderStyle: '3px solid',
    },
    special: {
        name: 'Special',
        color: '#ffd700',
        borderStyle: '2px solid',
        extraStyles: {
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.2)'
        }
    }
};

// Utility functions for working with categories
export const getCategoryColor = (categoryId) => {
    return categories[categoryId]?.color || '#888';
};

export const getCategoryName = (categoryId) => {
    return categories[categoryId]?.name || categoryId;
};

export const getAllCategories = () => {
    return Object.entries(categories).map(([id, config]) => ({
        id,
        ...config
    }));
};

export const generateCategoryStyles = () => {
    return Object.entries(categories).map(([categoryId, config]) => `
        .event-card.${categoryId} { 
            border-left: ${config.borderStyle || '3px solid'} ${config.color};
            ${config.extraStyles ? Object.entries(config.extraStyles).map(([prop, value]) => `${prop}: ${value};`).join('\n') : ''}
        }
        .search-result.${categoryId} { 
            border-left: ${config.borderStyle || '3px solid'} ${config.color}; 
        }
    `).join('\n');
};