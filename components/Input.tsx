import { FC } from "react";
import {
  Text,
  TextInput,
  View,
  TextInputProps,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

interface Props extends TextInputProps {
  label: string;
  isValid: boolean;
  stylesContainer?: ViewStyle;
}

const Input: FC<Props> = (props) => {
  const { label, isValid, stylesContainer, ...textInputProps } = props;

  return (
    <View style={[styles.container, stylesContainer]}>
      <Text style={[styles.label, isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          isValid && styles.invalidInput,
          textInputProps.multiline && styles.inputMultiline,
        ]}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: GlobalStyles.colors.primary100,
  },
  input: {
    padding: 6,
    fontSize: 18,
    borderRadius: 6,
    color: GlobalStyles.colors.primary700,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

export default Input;
