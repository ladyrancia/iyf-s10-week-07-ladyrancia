// Main entry point

import { loadState } from './state.js';
import { initUI, initClearButton } from './ui.js';

/**
 * Initialize the application
 */
function init() {
    // Load saved state from localStorage
    loadState();

    // Initialize UI and event listeners
    initUI();
    initClearButton();

    console.log('Todo App initialized successfully');
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
