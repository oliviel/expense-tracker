import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fecthExpenses } from "../util/http";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [isFecting, setIsFecthing] = useState(true);
  const [error, setError] = useState("");

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });

  function handleError() {
    setError("");
  }

  useEffect(() => {
    async function getExpense() {
      try {
        const response = await fecthExpenses();
        expensesCtx.setExpenses(response);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFecthing(false);
    }
    getExpense();
  }, []);

  if (error && !isFecting) {
    return <Error message={error} onPress={handleError} />;
  }

  if (isFecting) {
    return <Loading />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
