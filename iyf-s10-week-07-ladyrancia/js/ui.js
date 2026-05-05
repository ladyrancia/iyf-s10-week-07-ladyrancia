// UI rendering and DOM manipulation

import {
    getFilteredTodos,
    getStats,
    subscribe as subscribeToState,
    toggleTodo,
    deleteTodo,
    setFilter,
    getState,
} from './state.js';
import { escapeHtml } from './utils.js';

// DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalEl = document.getElementById('total');
const activeEl = document.getElementById('active');
const completedEl = document.getElementById('completed');
const filterButtons = document.querySelectorAll('[data-filter]');

/**
 * Initialize UI event listeners
 */
export function initUI() {
    addBtn.addEventListener('click', handleAddTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            setFilter(filter);
        });
    });

    // Subscribe to state changes
    subscribeToState(render);
}

/**
 * Initialize clear all button
 */
export function initClearButton() {
    const clearBtn = document.getElementById('clearAllBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all tasks?')) {
                import('./state.js').then(({ clearAllTodos }) => {
                    clearAllTodos();
                });
            }
        });
    }
}

/**
 * Handle adding a new task
 */
function handleAddTask() {
    const text = taskInput.value.trim();
    if (!text) {
        return;
    }

    import('./state.js').then(({ addTodo }) => {
        addTodo(text);
        taskInput.value = '';
        taskInput.focus();
    });
}

/**
 * Create task element
 * @param {Object} todo - Todo object
 * @param {number} index - Index in filtered array
 * @returns {HTMLElement} Task element
 */
function createTaskElement(todo) {
    const div = document.createElement('div');
    div.className = 'task';

    const span = document.createElement('span');
    span.textContent = escapeHtml(todo.text);
    if (todo.completed) {
        span.classList.add('completed');
    }

    const checkBtn = document.createElement('button');
    checkBtn.className = 'check-btn';
    checkBtn.textContent = '✔';
    checkBtn.setAttribute('aria-label', 'Mark as complete');
    checkBtn.onclick = () => toggleTodo(todo.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✖';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.onclick = () => deleteTodo(todo.id);

    div.appendChild(span);
    div.appendChild(checkBtn);
    div.appendChild(deleteBtn);

    return div;
}

/**
 * Render the task list
 */
function renderTaskList() {
    taskList.innerHTML = '';
    const todos = getFilteredTodos();

    if (todos.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'empty-message';
        emptyMsg.textContent = getEmptyMessage();
        taskList.appendChild(emptyMsg);
        return;
    }

    todos.forEach((todo) => {
        const taskEl = createTaskElement(todo);
        taskList.appendChild(taskEl);
    });
}

/**
 * Get empty state message based on filter
 * @returns {string} Message text
 */
function getEmptyMessage() {
    const currentState = getState();
    switch (currentState.filter) {
    case 'active':
        return 'No active tasks. Great job!';
    case 'completed':
        return 'No completed tasks yet.';
    default:
        return 'No tasks yet. Add one above!';
    }
}

/**
 * Update statistics
 */
function updateStats() {
    const stats = getStats();
    totalEl.textContent = stats.total;
    activeEl.textContent = stats.active;
    completedEl.textContent = stats.completed;
}

/**
 * Update filter button states
 */
function updateFilterButtons() {
    const currentState = getState();
    filterButtons.forEach((button) => {
        const filter = button.dataset.filter;
        if (filter === currentState.filter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * Main render function
 */
function render() {
    renderTaskList();
    updateStats();
    updateFilterButtons();
}
