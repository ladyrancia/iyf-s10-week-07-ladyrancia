# Week 7: JavaScript Best Practices

## Repository Information

**Repository Name:** `iyf-s10-week-07-ladyrancia`

**Student:** [Your Name]
**GitHub Username:** ladyrancia
**Week:** 7
**Course:** IYF Full-Stack Development Program - S10

---

## Overview

This week's project demonstrates professional JavaScript development practices including:

- **Local Storage & State Management** - Persisting data across sessions
- **Code Organization** - Modular architecture with separation of concerns
- **Clean Code Practices** - Meaningful names, single responsibility, no magic numbers
- **Debugging & Tooling** - ESLint, Prettier, Chrome DevTools
- **Code Review** - Peer feedback and quality assurance

---

## Project Structure

```
iyf-s10-week-07-ladyrancia/
│
├── index.html                              # Main To-Do List application
├── styles.css                              # To-Do List styles
├── package.json                            # NPM configuration
├── .eslintrc.json                          # ESLint rules
├── .prettierrc                             # Prettier formatting rules
├── README.md                               # This file
│
├── js/                                     # Modular To-Do List JavaScript
│   ├── app.js         - Entry point, initialization (21 lines)
│   ├── state.js       - Centralized state with observer pattern (110 lines)
│   ├── storage.js     - localStorage helper functions (50 lines)
│   ├── ui.js          - DOM manipulation & rendering (130 lines)
│   └── utils.js       - Utility functions (45 lines)
│
├── shopping-cart/                          # Shopping Cart Mini-Project
│   ├── index.html
│   ├── styles.css
│   └── js/
│       ├── app.js     - Entry point
│       ├── state.js   - State with observer pattern for cart & products
│       ├── storage.js - Cart persistence
│       └── ui.js      - Product & cart rendering
│
└── dailies/                                # Daily Challenge Implementations
    ├── day1-theme/           # Theme toggle with localStorage persistence
    ├── day2-searches/        # Recent searches with dropdown (last 5)
    ├── day3-form-autosave/   # Form auto-save every 5 seconds
    └── day4-refactor/        # Before/after refactoring examples
```

---

## ✅ Week 7 Checklist

### Lesson 13: Local Storage & State Management

- [x] **Task 13.1: Local Storage Basics** - Implemented helper functions `saveToStorage()`, `getFromStorage()`
- [x] **Task 13.2: Persistent To-Do List** - Full persistence with `loadTodos()`, `saveTodos()`, filter preference saved
- [x] **Task 13.3: Session Storage** - Demo in `dailies/day3-form-autosave` using sessionStorage for form auto-save
- [x] **Task 13.4: State Management Patterns** - Implemented observer pattern in `shopping-cart/js/state.js`

### Lesson 14: JavaScript Best Practices & Code Quality

- [x] **Task 14.1: Code Organization** - To-Do List refactored into 5 modular files
- [x] **Task 14.2: Clean Code Practices** - Applied meaningful names, single responsibility, no magic numbers
- [x] **Task 14.3: Debugging Skills** - Used console methods, breakpoints, fixed bugs
- [x] **Task 14.4: ESLint & Prettier** - Configured and ran lint/format scripts

### Daily Challenges

- [x] **Day 1: Theme Persistence** - Light/dark mode toggle saved to localStorage (`dailies/day1-theme/`)
- [x] **Day 2: Recent Searches** - Search history (last 5) with autocomplete dropdown (`dailies/day2-searches/`)
- [x] **Day 3: Form Auto-Save** - Session auto-save every 5 seconds, data recovery on refresh (`dailies/day3-form-autosave/`)
- [x] **Day 4: Refactor Challenge** - Before/after examples demonstrating clean code refactoring (`dailies/day4-refactor/`)
- [x] **Day 5: Code Review** - Review of Weather Dashboard (completed in Week 6)

---

## 📦 Main Projects

### 1. Refactored To-Do List

A complete refactor of the Week 5 To-Do List with modern JavaScript practices.

**Features:**
- ✅ Add, toggle, delete todos
- ✅ Filter by: All / Active / Completed
- ✅ Persistent storage via localStorage
- ✅ Filter preference saved
- ✅ Module-based architecture (ES6 modules)
- ✅ Observer pattern for state changes
- ✅ Proper error handling

**Key Implementation:**
```javascript
// state.js - Centralized state with observer pattern
const store = createStore({ todos: [], filter: "all" });

export function addTodo(text) {
    store.setState({
        todos: [...store.getState().todos, {
            id: Date.now(),
            text,
            completed: false
        }]
    });
    saveTodos(store.getState().todos);
}
```

**Files:**
- `index.html` - Semantic markup with ARIA attributes
- `styles.css` - Responsive design, CSS variables, animations
- `js/app.js` - Application initialization
- `js/state.js` - State management with subscriber pattern
- `js/storage.js` - localStorage abstraction layer
- `js/ui.js` - DOM manipulation and event handlers
- `js/utils.js` - Pure utility functions (generateId, formatDate, escapeHtml)

---

### 2. Shopping Cart

Shopping cart application demonstrating advanced state management with the observer pattern.

**Features:**
- ✅ Product catalog display with images/descriptions
- ✅ Add to cart functionality
- ✅ Quantity adjustment (+ / - buttons)
- ✅ Remove items
- ✅ Real-time cart total calculation
- ✅ Cart item count badge in header
- ✅ Persistence to localStorage
- ✅ Clear all capability
- ✅ Confirmation dialogs

**Key Implementation (Observer Pattern):**
```javascript
// state.js - Observable store
function createStore(initialState) {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => ({ ...state }),
        setState: (updates) => {
            state = { ...state, ...updates };
            listeners.forEach(listener => listener(state));  // Notify all
        },
        subscribe: (listener) => {
            listeners.push(listener);
            return () => { listeners.splice(listeners.indexOf(listener), 1); };
        }
    };
}
```

**Files:**
- `shopping-cart/index.html` - Two-column layout (products + cart)
- `shopping-cart/styles.css` - Responsive grid design
- `shopping-cart/js/app.js` - Entry point
- `shopping-cart/js/state.js` - Observable state (createStore, cart operations)
- `shopping-cart/js/storage.js` - Cart persistence
- `shopping-cart/js/ui.js` - Product grid + cart rendering

---

## 🔧 Tooling Setup

### ESLint Configuration

`.eslintrc.json` enforces:
- Strict equality (`===`)
- Curly braces for blocks
- `const`/`let` over `var`
- Warn on unused variables
- ES2021 syntax

**Run:**
```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix where possible
```

### Prettier Configuration

`.prettierrc` settings:
- Semi-colons: `true`
- Single quotes: `true`
- Tab width: `4`
- Trailing commas: `es5`
- Print width: `80`

**Run:**
```bash
npm run format        # Format all files
```

**VS Code Integration:**
- Install ESLint extension
- Install Prettier extension
- Enable "Format on Save"

---

## 🧪 Daily Challenges

### Day 1: Theme Persistence (`dailies/day1-theme/`)

**Concepts Learned:**
- localStorage with CSS custom properties
- `data-theme` attribute switching
- Persisting user preferences
- Smooth theme transitions

**Key Code:**
```javascript
const THEME_KEY = "theme";
function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
}
function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
}
```

---

### Day 2: Recent Searches (`dailies/day2-searches/`)

**Concepts Learned:**
- Array manipulation (unshift, filter, slice)
- Debounced search suggestions
- Limit storage to last 5 items
- Remove duplicates
- Rendering dropdown UI

**Key Features:**
- Type-ahead suggestions
- Highlight matching text
- Click to reuse search
- Clear history button

---

### Day 3: Form Auto-Save (`dailies/day3-form-autosave/`)

**Concepts Learned:**
- sessionStorage vs localStorage
- Auto-save interval (5 seconds)
- Save on blur event
- Data recovery on refresh
- Unsaved changes indicator

**Key Code:**
```javascript
const AUTOSAVE_INTERVAL = 5000;
setInterval(autoSaveAll, AUTOSAVE_INTERVAL);

input.addEventListener("blur", () => {
    sessionStorage.setItem(key, input.value);
});
```

---

### Day 4: Refactor Challenge (`dailies/day4-refactor/`)

**Before → After Transformation:**

**Problems in messy code:**
- Single-letter variable names (`d`, `e`, `n`, `a`)
- Magic numbers (`0.1`, `86400000`, `8`)
- Monolithic function doing validation + transformation + DB + email + UI
- No error handling
- `var` instead of `const`/`let`

**Clean code solutions:**
- Split into: `validateUserData()`, `normalizeUserData()`, `saveUserToDatabase()`, `sendWelcomeEmail()`, `updateSuccessUI()`
- Named constants: `MIN_AGE = 18`, `DEFAULT_DISCOUNT_RATE = 0.1`
- JSDoc comments
- Proper async/await with error handling

---

## 📋 Code Review Session

### Checklist Applied

**Code Quality:**
- [x] Meaningful variable/function names
- [x] No magic numbers (use constants)
- [x] Functions do one thing (SRP)
- [x] Max nesting depth: 3 levels
- [x] No duplicate code

**JavaScript:**
- [x] Uses `const`/`let` (no `var`)
- [x] Proper error handling (try-catch, validations)
- [x] No unused variables (ESLint warns)
- [x] Strict equality (`===`)

**DOM:**
- [x] Efficient DOM queries (cached references)
- [x] Event delegation where appropriate
- [x] No memory leaks (no unnecessary listeners)

**Async:**
- [x] Error handling on promises
- [x] No unhandled rejections

**Style:**
- [x] Consistent formatting (Prettier)
- [x] Proper indentation (4 spaces)
- [x] JSDoc comments for complex functions

---

## 🚀 Running the Projects

### To-Do List
```bash
# Option 1: Use Live Server in VS Code
# Right-click index.html → "Open with Live Server"

# Option 2: Python simple server
cd iyf-s10-week-07-ladyrancia
python -m http.server 8000
# Open http://localhost:8000

# Option 3: Node http-server
npx http-server
```

### Shopping Cart
```bash
cd shopping-cart
# Open index.html with any local server
```

### Daily Challenges
```bash
# Each day is standalone - just open the index.html in browser
cd dailies/day1-theme
# Open index.html
```

---

## 📊 Lessons Applied

### From Lesson 13: Local Storage & State Management

1. ✅ **JSON Serialization** - All objects stringified before storage
2. ✅ **Helper Functions** - `saveToStorage()`, `getFromStorage()` abstract localStorage API
3. ✅ **Error Handling** - Try-catch blocks around storage operations
4. ✅ **State Persistence** - Todos, filters, cart all persist across refreshes
5. ✅ **Observer Pattern** - Implemented in shopping cart for reactive UI updates

### From Lesson 14: JavaScript Best Practices

1. ✅ **Modular Architecture** - Separation into state, storage, ui, utils modules
2. ✅ **Clean Code** - Descriptive names, single responsibility
3. ✅ **No Magic Numbers** - Constants like `MIN_PASSWORD_LENGTH`, `ONE_DAY_MS`
4. ✅ **ESLint** - Catches issues early, enforces consistency
5. ✅ **Prettier** - Auto-formatting ensures code style consistency
6. ✅ **Debugging** - Console methods, breakpoints, developer tools
7. ✅ **Error Handling Strategy** - Try-catch, fallback values, user-friendly messages

---

## 🔍 Testing Checklist

### To-Do List Tests
- [x] Add a todo → appears in list
- [x] Refresh page → todos persist
- [x] Toggle complete → state saves, UI updates
- [x] Delete → item removed from storage
- [x] Filter → selection persists after refresh
- [x] Empty storage → app initializes correctly
- [x] Clear all → storage emptied

### Shopping Cart Tests
- [x] Add product → appears in cart with quantity 1
- [x] Add same product again → quantity increments
- [x] Increase quantity → total updates correctly
- [x] Decrease to 0 → item removed
- [x] Remove button → item removed immediately
- [x] Refresh → cart persists
- [x] Clear cart → all items removed
- [x] Total calculation → matches sum of (price × quantity)

### Theme Persistence Tests
- [x] Click toggle → theme changes immediately
- [x] Refresh → theme persists
- [x] LocalStorage shows 'light' or 'dark'
- [x] Text updates correctly

### Search History Tests
- [x] Type query → dropdown shows matching history
- [x] Submit search → added to history
- [x] History limit → max 5 items
- [x] Duplicate entry → replaces old one
- [x] Click history item → fills input and searches
- [x] Clear history → localStorage cleared

### Form Auto-Save Tests
- [x] Type in field → saved after 5 seconds
- [x] Blur field → immediate save
- [x] Refresh → fields restored
- [x] Submit → all saved data cleared
- [x] Clear button → empties form + storage
- [x] Recover → restores from sessionStorage

---

## 🎓 Key Takeaways

1. **State Management** matters - Centralized state makes apps predictable and debuggable
2. **Separation of Concerns** - Splitting into modules improves maintainability
3. **Persistence** - localStorage enables data survival across sessions
4. **Clean Code** - Meaningful names, small functions, no magic numbers make code readable
5. **Tooling** - ESLint + Prettier automate quality checks
6. **Debugging** - Console methods and breakpoints are essential
7. **Code Review** - Fresh eyes catch issues you miss

---

## 🏆 Milestone Achieved

**You now write professional-quality JavaScript!** ✨

You're fully prepared for **Phase 3: React**, which builds on:
- ✓ State management (→ React useState/useReducer)
- ✓ Modular architecture (→ React components)
- ✓ Clean code practices (→ Maintainable React code)
- ✓ DOM manipulation (→ What React abstracts away)

---

## 📝 Submission Notes

### How to Submit

1. Push this repository to GitHub
2. Ensure the repository is named: `iyf-s10-week-07-ladyrancia`
3. Verify README exists with this content
4. Confirm all files are present and working
5. Submit the GitHub URL via course portal

### Required Files Checklist
- [x] To-Do List (`index.html`, `styles.css`, `js/` folder)
- [x] Shopping Cart (`shopping-cart/` folder)
- [x] All 4 Daily Challenges (`dailies/` subfolders)
- [x] ESLint config (`.eslintrc.json`)
- [x] Prettier config (`.prettierrc`)
- [x] NPM config (`package.json`)
- [x] README (this file)

### Estimated Time Log

| Task | Time Spent |
|------|------------|
| Lesson 13 Readings & Exercises | 2h |
| Refactor To-Do List (persistence + modules) | 3h |
| Shopping Cart Implementation | 2.5h |
| Lesson 14 Readings & Exercises | 1.5h |
| ESLint + Prettier Setup | 0.5h |
| Daily Challenges (4 days) | 3h |
| Testing + Debugging | 1h |
| Documentation (README) | 1h |
| **Total** | **~14.5 hours** |

---

## 📚 Resources

- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- [ESLint Configuration Guide](https://eslint.org/docs/latest/use/configure/)
- [Prettier Documentation](https://prettier.io/docs/en/index.html)
- [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code/9780136083238/)
- [Refactoring Guru](https://refactoring.guru/)

---

**Ready for Phase 3: React! 🚀**
