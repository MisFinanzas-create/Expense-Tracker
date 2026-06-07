/* ============================================
   EXPENSE TRACKER - JAVASCRIPT
   ============================================ */

// ============ STATE MANAGEMENT ============

// Array to store all transactions
let transactions = [];

// LocalStorage key for persistence
const STORAGE_KEY = 'expenseTrackerData';

// ============ DOM ELEMENTS ============

const transactionForm = document.getElementById('transactionForm');
const typeInput = document.getElementById('type');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const transactionsList = document.getElementById('transactionsList');
const filterType = document.getElementById('filterType');
const clearAllBtn = document.getElementById('clearAllBtn');

const totalBalanceEl = document.getElementById('totalBalance');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpensesEl = document.getElementById('totalExpenses');

// ============ INITIALIZATION ============

/**
 * Initialize the application on page load
 * - Load data from LocalStorage
 * - Set today's date as default
 * - Render initial transactions
 * - Attach event listeners
 */
function init() {
    loadFromStorage();
    setTodayAsDefaultDate();
    renderTransactions();
    updateSummary();
    attachEventListeners();
    console.log('✅ Expense Tracker initialized');
}

// ============ EVENT LISTENERS ============

/**
 * Attach all event listeners to DOM elements
 */
function attachEventListeners() {
    // Add transaction form submission
    transactionForm.addEventListener('submit', handleAddTransaction);
    
    // Filter transactions by type
    filterType.addEventListener('change', renderTransactions);
    
    // Clear all transactions
    clearAllBtn.addEventListener('click', handleClearAll);
    
    // Update category options when type changes
    typeInput.addEventListener('change', updateCategoryOptions);
}

// ============ FORM HANDLERS ============

/**
 * Handle adding a new transaction
 * @param {Event} e - Form submission event
 */
function handleAddTransaction(e) {
    e.preventDefault();
    
    // Get form values
    const type = typeInput.value;
    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    
    // Validate inputs
    if (!title || amount <= 0 || !category || !date) {
        showNotification('Please fill all fields correctly', 'error');
        return;
    }
    
    // Create transaction object
    const transaction = {
        id: generateId(),
        type,
        title,
        amount,
        category,
        date,
        timestamp: new Date().getTime()
    };
    
    // Add to transactions array
    transactions.unshift(transaction);
    
    // Save to LocalStorage
    saveToStorage();
    
    // Update UI
    renderTransactions();
    updateSummary();
    
    // Reset form
    transactionForm.reset();
    setTodayAsDefaultDate();
    
    showNotification('✅ Transaction added successfully', 'success');
}

/**
 * Update category options based on selected transaction type
 */
function updateCategoryOptions() {
    const type = typeInput.value;
    const optgroups = categoryInput.querySelectorAll('optgroup');
    const options = categoryInput.querySelectorAll('option');
    
    // Show/hide optgroups based on type
    optgroups.forEach(group => {
        if (type === 'income' && group.label.includes('Income')) {
            group.style.display = 'block';
            group.querySelectorAll('option').forEach(opt => opt.style.display = 'block');
        } else if (type === 'expense' && group.label.includes('Expense')) {
            group.style.display = 'block';
            group.querySelectorAll('option').forEach(opt => opt.style.display = 'block');
        } else {
            group.style.display = 'none';
        }
    });
    
    // Set first visible option as selected
    if (type === 'income') {
        categoryInput.value = 'salary';
    } else {
        categoryInput.value = 'food';
    }
}

// ============ TRANSACTION RENDERING ============

/**
 * Render transactions in the DOM
 * Filters transactions based on selected filter
 */
function renderTransactions() {
    const filterValue = filterType.value;
    
    // Filter transactions
    const filteredTransactions = filterValue 
        ? transactions.filter(t => t.type === filterValue)
        : transactions;
    
    // Clear existing list
    transactionsList.innerHTML = '';
    
    // Show empty message if no transactions
    if (filteredTransactions.length === 0) {
        transactionsList.innerHTML = '<p class="empty-message">No transactions yet. Add one to get started!</p>';
        return;
    }
    
    // Create transaction items
    filteredTransactions.forEach(transaction => {
        const transactionEl = createTransactionElement(transaction);
        transactionsList.appendChild(transactionEl);
    });
}

/**
 * Create a transaction element (DOM node)
 * @param {Object} transaction - Transaction object
 * @returns {HTMLElement} Transaction element
 */
function createTransactionElement(transaction) {
    const div = document.createElement('div');
    div.className = `transaction-item ${transaction.type}`;
    div.id = `transaction-${transaction.id}`;
    
    // Format amount with currency
    const formattedAmount = formatCurrency(transaction.amount);
    const amountSign = transaction.type === 'income' ? '+' : '-';
    const amountClass = transaction.type === 'income' ? 'income' : 'expense';
    
    // Format date
    const formattedDate = formatDate(transaction.date);
    
    // Format category name
    const categoryName = formatCategoryName(transaction.category);
    
    div.innerHTML = `
        <div class="transaction-info">
            <div class="transaction-details">
                <div class="transaction-title">${escapeHtml(transaction.title)}</div>
                <div class="transaction-meta">
                    <span class="transaction-category">${categoryName}</span>
                    <span class="transaction-date">📅 ${formattedDate}</span>
                </div>
            </div>
        </div>
        <div class="transaction-amount ${amountClass}">${amountSign}${formattedAmount}</div>
        <div class="transaction-actions">
            <button class="btn btn-edit" onclick="editTransaction('${transaction.id}')">Edit</button>
            <button class="btn btn-delete" onclick="deleteTransaction('${transaction.id}')">Delete</button>
        </div>
    `;
    
    return div;
}

// ============ TRANSACTION OPERATIONS ============

/**
 * Edit a transaction
 * @param {string} id - Transaction ID
 */
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    
    if (!transaction) return;
    
    // Populate form with transaction data
    typeInput.value = transaction.type;
    updateCategoryOptions();
    titleInput.value = transaction.title;
    amountInput.value = transaction.amount;
    categoryInput.value = transaction.category;
    dateInput.value = transaction.date;
    
    // Delete the old transaction
    deleteTransaction(id);
    
    // Scroll to form
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    titleInput.focus();
    
    showNotification('📝 Edit the transaction and click "Add Transaction"', 'info');
}

/**
 * Delete a transaction
 * @param {string} id - Transaction ID
 */
function deleteTransaction(id) {
    // Find index of transaction
    const index = transactions.findIndex(t => t.id === id);
    
    if (index === -1) return;
    
    // Remove transaction
    const removed = transactions.splice(index, 1)[0];
    
    // Save to LocalStorage
    saveToStorage();
    
    // Update UI with animation
    const el = document.getElementById(`transaction-${id}`);
    if (el) {
        el.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            renderTransactions();
            updateSummary();
        }, 300);
    } else {
        renderTransactions();
        updateSummary();
    }
    
    showNotification('🗑️ Transaction deleted', 'info');
}

/**
 * Clear all transactions (with confirmation)
 */
function handleClearAll() {
    if (transactions.length === 0) {
        showNotification('No transactions to clear', 'info');
        return;
    }
    
    if (confirm('⚠️ Are you sure you want to delete all transactions? This cannot be undone.')) {
        transactions = [];
        saveToStorage();
        renderTransactions();
        updateSummary();
        showNotification('🗑️ All transactions cleared', 'success');
    }
}

// ============ CALCULATIONS & SUMMARY ============

/**
 * Calculate and update the summary statistics
 * Updates: total balance, total income, total expenses
 */
function updateSummary() {
    let totalIncome = 0;
    let totalExpenses = 0;
    
    // Calculate totals
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });
    
    const balance = totalIncome - totalExpenses;
    
    // Update DOM
    totalBalanceEl.textContent = formatCurrency(balance);
    totalIncomeEl.textContent = formatCurrency(totalIncome);
    totalExpensesEl.textContent = formatCurrency(totalExpenses);
    
    // Update balance color based on value
    if (balance < 0) {
        totalBalanceEl.style.color = '#ef4444'; // Red
    } else if (balance === 0) {
        totalBalanceEl.style.color = '#6b7280'; // Gray
    } else {
        totalBalanceEl.style.color = 'white'; // Default
    }
}

// ============ LOCAL STORAGE ============

/**
 * Save transactions to LocalStorage
 */
function saveToStorage() {
    try {
        const data = JSON.stringify(transactions);
        localStorage.setItem(STORAGE_KEY, data);
        console.log('💾 Data saved to LocalStorage');
    } catch (error) {
        console.error('❌ Error saving to LocalStorage:', error);
        showNotification('Error saving data', 'error');
    }
}

/**
 * Load transactions from LocalStorage
 */
function loadFromStorage() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            transactions = JSON.parse(data);
            // Sort by timestamp (newest first)
            transactions.sort((a, b) => b.timestamp - a.timestamp);
            console.log(`📂 Loaded ${transactions.length} transactions from LocalStorage`);
        }
    } catch (error) {
        console.error('❌ Error loading from LocalStorage:', error);
        transactions = [];
    }
}

// ============ UTILITY FUNCTIONS ============

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Format date string
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @returns {string} Formatted date
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}

/**
 * Format category name
 * Converts 'category-name' to 'Category Name'
 * @param {string} category - Category value
 * @returns {string} Formatted category name
 */
function formatCategoryName(category) {
    return category
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Escape HTML special characters
 * Prevents XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Set today's date as default date in form
 */
function setTodayAsDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

/**
 * Show a notification message
 * @param {string} message - Message to display
 * @param {string} type - Notification type ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
    // Log to console
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // You can enhance this with a visual notification UI
    // For now, it's logged to console and can be extended
}

// ============ CSS ANIMATION FOR SLIDE OUT ============

// Add slideOut animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// ============ INITIALIZE APP ============

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}