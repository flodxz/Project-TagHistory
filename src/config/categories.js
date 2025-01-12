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
    bomboclaat: { 
        name: 'Bomboclaat',
        color: '#ff66ff',
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
        border: '2px solid',
        extraStyles: {
            border: '2px solid #ffd700',
            zIndex: 10,
        },
    },
};

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
            ${categoryId === 'special' 
                ? `border: ${config.extraStyles?.border || '2px solid #ffd700'};
                   box-shadow: 0 0 2px rgba(255, 215, 0, 0.5), 
                               0 0 5px rgba(255, 215, 0, 0.4); 
                   z-index: ${config.extraStyles?.zIndex || 10};` 
                : `border-left: ${config.borderStyle || '3px solid'} ${config.color};`
            }
        }
        .search-result.${categoryId} { 
            ${categoryId === 'special'
                ? `border: ${config.extraStyles?.border || '2px solid #ffd700'};
                   box-shadow: 0 0 2px rgba(255, 215, 0, 0.5), 
                               0 0 5px rgba(255, 215, 0, 0.4); 
                   z-index: ${config.extraStyles?.zIndex || 10};`
                : `border-left: ${config.borderStyle || '3px solid'} ${config.color};`
            }
        }
    `).join('\n');
};

export const injectCategoryStyles = () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = generateCategoryStyles();
    document.head.appendChild(styleElement);
};

injectCategoryStyles();