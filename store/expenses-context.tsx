import { ReactNode, createContext, useReducer } from "react";

export interface IExpenses {
  id: string;
  description: string;
  amount: number;
  date: string | number | Date;
}

interface IExpensesContext {
  expenses: IExpenses[];
  addExpense: ({ description, amount, date }: Omit<IExpenses, "id">) => void;
  setExpenses: (expenses: IExpenses[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (
    id: string,
    { description, amount, date }: Omit<IExpenses, "id">
  ) => void;
}

export const ExpensesContext = createContext<IExpensesContext>({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

enum CountingKind {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  SET = "SET",
}

interface CountingAction {
  type: CountingKind;
  payload: IExpenses;
}

function expensesReducer(state: IExpenses[], action: CountingAction) {
  switch (action.type) {
    case CountingKind.ADD:
      return [action.payload, ...state];
    case CountingKind.SET:
      const paylod = action.payload as unknown as IExpenses[];
      return paylod.reverse();
    case CountingKind.UPDATE:
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case CountingKind.DELETE:
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

interface Props {
  children: ReactNode;
}

const DUMMY_EXPENSES: IExpenses[] = [];

function ExpensesContextProvider({ children }: Props) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: Omit<IExpenses, "id">) {
    dispatch({ type: CountingKind.ADD, payload: expenseData as IExpenses });
  }

  function setExpenses(expenses: IExpenses[]) {
    dispatch({ type: CountingKind.SET, payload: expenses });
  }

  function deleteExpense(id: string) {
    dispatch({ type: CountingKind.DELETE, payload: { id } });
  }

  function updateExpense(id: string, expenseData: Omit<IExpenses, "id">) {
    dispatch({ type: CountingKind.UPDATE, payload: { id, ...expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
