import {Text} from "react-native-paper";

export default function HeaderText(props) {
  return (
    <Text
      variant={"headlineLarge"}
      style={{
      marginLeft: 15,
      marginTop: 30
    }}>
      {props.text}
    </Text>
  )
}