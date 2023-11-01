import axios from "axios";
import { IExpenses } from "../store/expenses-context";

const baseUrl = "https://expense-tracker-99e4e-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData: object) {
  const { data } = await axios.post(`${baseUrl}expenses.json`, {
    ...expenseData,
  });
  return data.name;
}

export function editExpense(id: string, expenseData: object) {
  return axios.put(`${baseUrl}expenses/${id}.json`, {
    ...expenseData,
  });
}

export function deleteExpense(id: string) {
  return axios.delete(`${baseUrl}expenses/${id}.json`);
}

export async function fecthExpenses() {
  const { data } = await axios.get(`${baseUrl}expenses.json`);

  const expenses: IExpenses[] = [];

  for (const key in data) {
    const expenseObj: IExpenses = {
      id: key,
      amount: data[key].amount,
      date: data[key].date,
      description: data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}
