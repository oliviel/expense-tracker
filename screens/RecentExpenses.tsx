import { useContext, useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fecthExpenses } from "../util/http";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });

  useEffect(() => {
    async function getExpense() {
      const response = await fecthExpenses();
      expensesCtx.setExpenses(response);
    }
    getExpense();
  }, []);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
