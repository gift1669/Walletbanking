// Elements
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');

const loginForm = document.getElementById('loginForm');
const transferBtn = document.getElementById('transferBtn');
const sendBtn = document.getElementById('sendBtn');
const logoutBtn = document.getElementById('logoutBtn');
const refreshBalanceBtn = document.getElementById('refreshBalanceBtn');
const toggleBalanceBtn = document.getElementById('toggleBalanceBtn');
const backBtn = document.getElementById('backBtn');
const backToTransferBtn = document.getElementById('backToTransferBtn');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const balanceDisplay = document.getElementById('balance');
const transferAmountInput = document.getElementById('transferAmount');

// Initial state
page1.classList.add('active');

// Example of hardcoded credentials (for validation)
const validUsername = "gift";
const validPassword = "marvelous";

// Initial balance
let balance = 15000; // Initial balance value

// Login Form Submission with validation
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
	
	 // Simple validation logic
    if (username === validUsername && password === validPassword) {
        page1.classList.remove('active');
        page2.classList.add('active');
        
        // Display balance
        balanceDisplay.textContent = balance;
		
		// Initialize the chart once the user logs in
        loadFundsChart();
    } else {
        alert("Invalid username or password. Please try again.");
    }
});

// Function to load the funds analysis chart
function loadFundsChart() {
    const ctx = document.getElementById('fundsChart').getContext('2d');
    const fundsChart = new Chart(ctx, {
        type: 'bar', // You can change this to 'line', 'pie', etc.
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
		
label: 'Fund Balance ($)',
                data: [5000, 10000, 7500, 15000, 13000, balance], // Include current balance
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
				
				
			beginAtZero: true
                }
            }
        }
    });
}
// Transfer Button
transferBtn.addEventListener('click', () => {
    page2.classList.remove('active');
    page3.classList.add('active');
});

// Send Fund Button
sendBtn.addEventListener('click', () => {
    const transferAmount = parseFloat(transferAmountInput.value);
    
    if (isNaN(transferAmount) || transferAmount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
	
	if (transferAmount > balance) {
        alert("Insufficient balance.");
        return;
    }
    
    // Store the transfer amount in local storage
    localStorage.setItem('transferAmount', transferAmount);

    // Navigate to page 4 after transfer
    page3.classList.remove('active');
    page4.classList.add('active');
});

// Back Button on Page 3
backBtn.addEventListener('click', () => {
    page3.classList.remove('active');
    page2.classList.add('active');
});

// Back Arrow Button on Page 4
backToTransferBtn.addEventListener('click', () => {
    page4.classList.remove('active');
    page3.classList.add('active');
});

// Logout Button
logoutBtn.addEventListener('click', () => {
    // Clear the username and password fields
    usernameInput.value = '';
    passwordInput.value = '';

    // Return to the login page
    page2.classList.remove('active');
    page1.classList.add('active');
});

// Refresh Balance Button
refreshBalanceBtn.addEventListener('click', () => {
    // Update the balance display on Page 2
    balanceDisplay.textContent = balance;

    // Refresh the chart with the current balance
    loadFundsChart();
});


// On Page 4: Handle the transfer completion
document.getElementById('page4').addEventListener('DOMContentLoaded', () => {
    const transferAmount = parseFloat(localStorage.getItem('transferAmount'));

    if (!isNaN(transferAmount)) {
        // Deduct the transfer amount from the balance
        balance -= transferAmount;
		
		// Clear the stored transfer amount
        localStorage.removeItem('transferAmount');

        // Update the balance display on Page 2
        document.getElementById('balance').textContent = balance;

        // Update the chart with the current balance
        loadFundsChart();
    }
});

// Toggle balance visibility functionality
toggleBalanceBtn.addEventListener('click', () => {
    const balanceSpan = document.getElementById('balance');
    if (balanceSpan.style.display === 'none') {
        balanceSpan.style.display = 'inline';
        toggleBalanceBtn.textContent = 'Hide Balance';
    } else {
	balanceSpan.style.display = 'none';
        toggleBalanceBtn.textContent = 'Show Balance';
    }
});