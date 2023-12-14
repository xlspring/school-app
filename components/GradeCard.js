import {View, StyleSheet} from "react-native";
import {Text} from "react-native-paper";

export default function GradeCard(props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.text}>
        <Text variant={"headlineSmall"}>{props.subject}</Text>
        <Text variant={"labelMedium"}>Last grade: {props.lastDate}</Text>
      </View>
      <View
        style={[styles.rating,
          {
            backgroundColor:
              props.grade < 60 ? "red" :
                props.grade < 70 && props.grade >= 60 ? "orange" :
                  props.grade < 80 && props.grade >= 70 ? "yellow" :
                    props.grade < 90 && props.grade >= 80 ? "green" : "skyblue"
          }]}
      >
        <Text variant={"displaySmall"}>{props.grade < 60 ? "F" :
          props.grade < 70 && props.grade >= 60 ? "D" :
            props.grade < 80 && props.grade >= 70 ? "C" :
              props.grade < 90 && props.grade >= 80 ? "B" : "A"}</Text>
        <Text variant={'labelMedium'}>{props.grade}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '98%',
    height: 100,
    borderRadius: 15,
    overflow: "hidden",

    marginTop: 5,
    marginBottom: 5,

    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
  },
  rating: {
    height: "100%",
    width: 80,

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginLeft: 15,
    display: "flex",
    flexDirection: 'column',
    gap: 10,
  }
})