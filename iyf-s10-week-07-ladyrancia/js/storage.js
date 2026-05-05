const STORAGE_PREFIX = 'todoapp_';
const TODO_KEY = 'todos';
const FILTER_KEY = 'filter';

export function saveToStorage(key, data) {
    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

export function getFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(STORAGE_PREFIX + key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Failed to read from localStorage:', error);
        return defaultValue;
    }
}

export function removeFromStorage(key) {
    try {
        localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
        console.error('Failed to remove from localStorage:', error);
    }
}

export function saveTodos(todos) {
    saveToStorage(TODO_KEY, todos);
}

export function loadTodos() {
    return getFromStorage(TODO_KEY, []);
}

export function saveFilter(filter) {
    saveToStorage(FILTER_KEY, filter);
}

export function loadFilter() {
    return getFromStorage(FILTER_KEY, 'all');
}
