import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

interface Props {
  message: string;
  onPress: () => void;
}

const Error = ({ message, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error ocurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onPress}>Okey</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    marginBottom: 8,
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Error;
