// js/init.js
import { TimelineManager } from 'TimelineManager.js';

// Create and export the timeline manager instance so other modules can access it
export const timelineManager = new TimelineManager();

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => timelineManager.initialize());