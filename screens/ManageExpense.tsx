import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ExpenseForm";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { StackParamList } from "../App";
import { deleteExpense, editExpense, storeExpense } from "../util/http";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

type RouteNativeProps = NativeStackScreenProps<StackParamList, "ManageExpense">;

function ManageExpense({ route, navigation }: RouteNativeProps) {
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const currentExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmiting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setIsSubmiting(false);
      setError("Could not delete your expense, please try again");
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function handleError() {
    setError("");
  }

  async function confirmHandler(expenseData: any) {
    setIsSubmiting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await editExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      setIsSubmiting(false);
      setError("Could not edit your expense, please try again");
    }
  }

  if (error && !isSubmiting) {
    return <Error message={error} onPress={handleError} />;
  }

  if (isSubmiting) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={currentExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
