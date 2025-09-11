// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalIncome = localStorage.getItem("totalIncome") || 0;

document.getElementById("total").value = totalIncome;

// Update breakdown when calculate is pressed
document.getElementById("calculate").addEventListener("click", () => {
  totalIncome = parseFloat(document.getElementById("total").value);
  if (isNaN(totalIncome) || totalIncome <= 0) return;

  localStorage.setItem("totalIncome", totalIncome);
  updateRemaining();
});

// Render expense list
function renderExpenses() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";
  expenses.forEach((exp, index) => {
    let li = document.createElement("li");
    li.textContent = `${exp.section.toUpperCase()}: ₹${exp.amount}`;
    list.appendChild(li);
  });
  updateRemaining();
}

// Add new expense
document.getElementById("add-expense").addEventListener("click", () => {
  const section = document.getElementById("expense-section").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  if (isNaN(amount) || amount <= 0) return;

  expenses.push({ section, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();
  document.getElementById("expense-amount").value = "";
});

// Clear all expenses
document.getElementById("clear-expenses").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all expenses?")) {
    expenses = [];
    localStorage.removeItem("expenses");
    renderExpenses();
  }
});

// Update needs/wants/savings breakdown
function updateRemaining() {
  const total = parseFloat(totalIncome);
  if (isNaN(total) || total <= 0) return;

  const needs = total * 0.5;
  const wants = total * 0.3;
  const savings = total * 0.2;

  let spentNeeds = 0, spentWants = 0, spentSavings = 0;
  expenses.forEach(exp => {
    if (exp.section === "needs") spentNeeds += exp.amount;
    if (exp.section === "wants") spentWants += exp.amount;
    if (exp.section === "savings") spentSavings += exp.amount;
  });

  document.getElementById("needs").textContent =
    `Needs: ₹${needs.toFixed(2)} (Remaining: ₹${(needs - spentNeeds).toFixed(2)})`;
  document.getElementById("wants").textContent =
    `Wants: ₹${wants.toFixed(2)} (Remaining: ₹${(wants - spentWants).toFixed(2)})`;
  document.getElementById("savings").textContent =
    `Savings: ₹${savings.toFixed(2)} (Remaining: ₹${(savings - spentSavings).toFixed(2)})`;
}

// Initial load
renderExpenses();
updateRemaining();
