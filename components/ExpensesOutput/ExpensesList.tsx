import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { IExpenses } from "../../store/expenses-context";

interface Props {
  expenses: IExpenses[];
}

function renderExpenseItem(itemData: { item: IExpenses }) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }: Props) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
