import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "./UI/Button";
import { IExpenses } from "../store/expenses-context";
import { getFormattedDate } from "../util/date";
import { GlobalStyles } from "../constants/styles";

interface Props {
  isEditing: boolean;
  defaultValues?: IExpenses | undefined;
  onCancel: () => void;
  onSubmit: (value: any) => void;
}

const ExpenseForm = ({
  isEditing,
  defaultValues,
  onCancel,
  onSubmit,
}: Props) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues?.date
        ? getFormattedDate(defaultValues.date as Date)
        : "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description ? defaultValues.description : "",
      isValid: true,
    },
  });

  function handleInput(inputType: string, inputText: string) {
    setInputs({ ...inputs, [inputType]: { value: inputText, isValid: true } });
  }

  function handleSubmit() {
    const expenseData = {
      amount: Number(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      new Date(expenseData.date).toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsContainer}>
        <Input
          label="Amount"
          isValid={!inputs.amount.value}
          value={inputs.amount.value}
          keyboardType="decimal-pad"
          stylesContainer={styles.input}
          onChangeText={(text) => handleInput("amount", text)}
        />
        <Input
          label="Date"
          maxLength={10}
          isValid={!inputs.date.value}
          value={inputs.date.value}
          placeholder="YYYY-MM-DD"
          keyboardType="decimal-pad"
          stylesContainer={styles.input}
          onChangeText={(text) => handleInput("date", text)}
        />
      </View>
      <Input
        multiline
        label="Description"
        isValid={!inputs.description.value}
        value={inputs.description.value}
        onChangeText={(text) => handleInput("description", text)}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
  },
  errorText: {
    margin: 8,
    textAlign: "center",
    color: GlobalStyles.colors.error500,
  },
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ExpenseForm;
