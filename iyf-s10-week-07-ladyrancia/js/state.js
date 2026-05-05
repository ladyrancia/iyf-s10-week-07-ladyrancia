// Centralized state management

import { saveTodos, loadTodos, saveFilter, loadFilter } from './storage.js';

// Initial state
const state = {
    todos: [],
    filter: 'all',
};

// Subscribers list for observer pattern
const subscribers = [];

/**
 * Get current state
 * @returns {Object} Current state
 */
export function getState() {
    return { ...state };
}

/**
 * Update state and notify subscribers
 * @param {Object} updates - Partial state updates
 */
export function setState(updates) {
    Object.assign(state, updates);
    persistState();
    notifySubscribers();
}

/**
 * Add a new todo
 * @param {string} text - Todo text
 */
export function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
    };

    setState({
        todos: [...state.todos, newTodo],
    });
}

/**
 * Toggle todo completion status
 * @param {number} id - Todo ID
 */
export function toggleTodo(id) {
    setState({
        todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
    });
}

/**
 * Delete a todo
 * @param {number} id - Todo ID
 */
export function deleteTodo(id) {
    setState({
        todos: state.todos.filter((todo) => todo.id !== id),
    });
}

/**
 * Set filter
 * @param {string} filter - Filter value ("all", "active", "completed")
 */
export function setFilter(filter) {
    setState({ filter });
    saveFilter(filter);
}

/**
 * Get filtered todos
 * @returns {Array} Filtered todos
 */
export function getFilteredTodos() {
    switch (state.filter) {
    case 'active':
        return state.todos.filter((todo) => !todo.completed);
    case 'completed':
        return state.todos.filter((todo) => todo.completed);
    default:
        return state.todos;
    }
}

/**
 * Get statistics
 * @returns {Object} Stats object
 */
export function getStats() {
    return {
        total: state.todos.length,
        active: state.todos.filter((t) => !t.completed).length,
        completed: state.todos.filter((t) => t.completed).length,
    };
}

/**
 * Clear all todos
 */
export function clearAllTodos() {
    setState({ todos: [] });
}

/**
 * Persist state to localStorage
 */
function persistState() {
    saveTodos(state.todos);
}

/**
 * Load state from localStorage
 */
export function loadState() {
    const savedTodos = loadTodos();
    const savedFilter = loadFilter();

    state.todos = savedTodos;
    state.filter = savedFilter;
}

/**
 * Subscribe to state changes
 * @param {Function} listener - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribe(listener) {
    subscribers.push(listener);
    return () => {
        const index = subscribers.indexOf(listener);
        subscribers.splice(index, 1);
    };
}

/**
 * Notify all subscribers
 */
function notifySubscribers() {
    subscribers.forEach((listener) => listener(getState()));
}
