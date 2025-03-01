import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Select Elements
const logoutBtn = document.getElementById("logoutBtn");
const addIncomeBtn = document.getElementById("addIncomeBtn");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const balanceAmount = document.getElementById("balanceAmount");
const incomeAmount = document.getElementById("incomeAmount");
const expenseAmount = document.getElementById("expenseAmount");
const transactionTable = document.getElementById("transactionTable");

// Check if User is Logged In & Show Logout Button
onAuthStateChanged(auth, (user) => {
    if (user) {
        logoutBtn.style.display = "block"; // Show Logout Button
        fetchTransactions(); // Fetch transactions if logged in
    } else {
        logoutBtn.style.display = "none"; // Hide Logout Button
        window.location.href = "signin.html"; // Redirect to Sign In if not logged in
    }
});

// Logout Functionality
logoutBtn.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            alert("Logged Out Successfully!");
            window.location.href = "signin.html"; // Redirect to Sign In
        })
        .catch(error => alert(error.message));
});

// Fetch Transactions & Update UI
function fetchTransactions() {
    const transactionsRef = collection(db, "transactions");

    onSnapshot(transactionsRef, (snapshot) => {
        let balance = 0, income = 0, expenses = 0;
        transactionTable.innerHTML = "";

        snapshot.forEach((doc) => {
            const transaction = doc.data();
            let row = `
                <tr>
                    <td>${transaction.name}</td>
                    <td>$${transaction.amount}</td>
                    <td>${transaction.type}</td>
                    <td>${new Date(transaction.date).toLocaleDateString()}</td>
                </tr>
            `;
            transactionTable.innerHTML += row;

            if (transaction.type === "Income") {
                income += transaction.amount;
            } else {
                expenses += transaction.amount;
            }
        });

        balance = income - expenses;
        balanceAmount.textContent = `$${balance}`;
        incomeAmount.textContent = `$${income}`;
        expenseAmount.textContent = `$${expenses}`;
    });
}

// Add Transaction Function
function addTransaction(type) {
    let transactionName = prompt(`Enter ${type} Name:`);
    let transactionAmount = parseFloat(prompt(`Enter ${type} Amount:`));

    if (!transactionName || isNaN(transactionAmount) || transactionAmount <= 0) {
        alert("Invalid input. Please try again.");
        return;
    }

    addDoc(collection(db, "transactions"), {
        name: transactionName,
        amount: transactionAmount,
        type: type,
        date: new Date().toISOString()
    })
    .then(() => alert(`${type} Added Successfully!`))
    .catch(error => alert("Error adding transaction:", error));
}

// Attach Event Listeners
addIncomeBtn.addEventListener("click", () => addTransaction("Income"));
addExpenseBtn.addEventListener("click", () => addTransaction("Expense"));

