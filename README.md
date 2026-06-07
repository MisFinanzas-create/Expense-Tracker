# 💰 Expense Tracker

A modern, responsive web application for managing your personal finances. Track your income and expenses with ease, and keep all your financial data locally on your device.

## ✨ Features

- **Add Transactions**: Record income and expenses with title, amount, category, and date
- **Multiple Categories**: Pre-defined categories for both income and expenses
- **Real-time Summary**: View your total balance, income, and expenses at a glance
- **Transaction Management**: Edit or delete any transaction
- **Filter Transactions**: View all transactions, or filter by income/expense
- **Local Storage**: Your data persists even after closing your browser
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Currency Formatting**: Automatic formatting of amounts in USD

## 📋 Project Structure

```
Expense-Tracker/
├── index.html          # HTML structure and form
├── style.css           # Complete styling and responsive design
├── script.js           # JavaScript logic and state management
└── README.md           # This file
```

## 🚀 How to Run

### Option 1: Direct File Access

1. **Download the files** from GitHub
   - Visit: https://github.com/MisFinanzas-create/Expense-Tracker
   - Click "Code" → "Download ZIP"

2. **Extract the files**
   - Unzip the folder to your desired location

3. **Open in a web browser**
   - Double-click `index.html` to open it in your default browser
   - Or right-click → Open With → Select your preferred browser

### Option 2: Using a Local Server (Recommended)

Using a local server prevents potential issues with file access:

**With Python 3:**
```bash
cd Expense-Tracker
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**With Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**With Node.js (http-server):**
```bash
npm install -g http-server
http-server
```

**With VS Code Live Server:**
- Install the "Live Server" extension
- Right-click on `index.html` → "Open with Live Server"

## 💡 Usage Guide

### Adding a Transaction

1. **Select Type**: Choose between "Income" or "Expense"
2. **Enter Title**: Give your transaction a name (e.g., "Monthly Salary", "Grocery Shopping")
3. **Enter Amount**: Type the transaction amount
4. **Select Category**: Choose an appropriate category from the dropdown
5. **Pick Date**: Select the date of the transaction
6. **Submit**: Click "Add Transaction" button

### Managing Transactions

- **View**: All transactions are displayed in the list with latest first
- **Filter**: Use the dropdown to show only income or expenses
- **Edit**: Click "Edit" button to modify a transaction
- **Delete**: Click "Delete" button to remove a transaction
- **Clear All**: Remove all transactions at once (with confirmation)

### Understanding the Summary

- **Total Balance**: Income minus expenses (positive = surplus, negative = deficit)
- **Total Income**: Sum of all income transactions
- **Total Expenses**: Sum of all expense transactions

## 📂 Categories

### Income Categories
- Salary
- Freelance
- Investment
- Gift
- Other Income

### Expense Categories
- Food & Dining
- Transportation
- Utilities
- Entertainment
- Shopping
- Healthcare
- Education
- Other Expense

## 💾 Data Storage

Your data is automatically saved to your browser's LocalStorage:

- **Automatic Saving**: Every transaction is saved immediately
- **Persistent**: Data remains after closing the browser or computer restart
- **Single Device**: Data is stored locally and not synced across devices
- **Privacy**: All data stays on your device (no server uploads)

**To clear all data:**
- Click "Clear All" button and confirm
- Or use browser dev tools to clear LocalStorage: `localStorage.clear()`

## 📱 Responsive Design Breakpoints

- **Desktop** (1200px+): Two-column layout with sticky form
- **Tablet** (768px - 1199px): Responsive grid layout
- **Mobile** (480px - 767px): Single column, optimized touch targets
- **Small Mobile** (<480px): Full-width, simple layout

## 🎨 Design Features

- **Gradient Header**: Modern purple-pink gradient
- **Color-Coded**: Green for income, red for expenses
- **Smooth Animations**: Slide-in effects and hover transitions
- **Custom Scrollbar**: Styled to match the design
- **Accessibility**: Proper labels, focus states, and semantic HTML

## 🌐 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Code Organization

### HTML (index.html)
- Semantic structure
- Organized into sections (header, summary, form, transactions)
- Proper form elements with validation

### CSS (style.css)
- CSS variables for easy theming
- Mobile-first responsive design
- Smooth transitions and animations
- Organized by sections with comments

### JavaScript (script.js)
- Modular functions with clear purposes
- Comprehensive comments explaining each section
- State management with localStorage integration
- Event delegation for dynamic elements
- Error handling for data operations

## 🔒 Security Notes

- HTML escaping prevents XSS attacks
- Input validation on form submission
- No external API calls
- All data stored locally

## 🚀 Future Enhancement Ideas

- Export data as CSV or PDF
- Budget goals and alerts
- Charts and analytics
- Recurring transactions
- Multi-currency support
- Dark mode
- Cloud backup and sync
- Mobile app version

## 📄 License

Free to use for personal and commercial projects.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## ❓ Troubleshooting

### Data not saving?
- Check if LocalStorage is enabled in your browser
- Try clearing browser cache
- Try a different browser

### Form not submitting?
- Ensure all fields are filled correctly
- Check browser console for errors (F12)
- Try refreshing the page

### UI looks broken?
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure CSS file is in the same directory
- Check that JavaScript is enabled

## 📞 Support

For issues or questions:
1. Check the code comments (well-documented)
2. Review the HTML structure
3. Check browser console (F12) for errors

---

**Made with ❤️ for personal finance management**