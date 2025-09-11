// Load saved expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Render expenses
function renderExpenses() {
    const list = document.querySelector("#expense-list tbody");
    list.innerHTML = "";
    expenses.forEach(exp => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${exp.date}</td>
            <td>${exp.section}</td>
            <td>₹${exp.amount}</td>
            <td>${exp.note || ""}</td>
        `;
        list.appendChild(row);
    });
    updateRemaining();
}

// Add expense
document.getElementById("add-expense").addEventListener("click", () => {
    const section = document.getElementById("expense-section").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const date = document.getElementById("expense-date").value || new Date().toISOString().split("T")[0];
    const note = document.getElementById("expense-note").value;

    if (isNaN(amount) || amount <= 0) return;

    expenses.push({ section, amount, date, note });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();

    // Clear inputs
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-date").value = "";
    document.getElementById("expense-note").value = "";
});

// Update remaining balances
function updateRemaining() {
    const total = parseFloat(document.getElementById("total").value) || 0;
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

// Initial render
renderExpenses();
