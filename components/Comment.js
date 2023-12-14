import {View, Text, StyleSheet} from "react-native";
import {Avatar, IconButton} from "react-native-paper";
import {useSelector} from "react-redux";

export default function Comment(props) {
  const theme = useSelector(state => state.theme.theme);
  return (
    <View style={[styles.commentContainer, {
      backgroundColor: theme.colors.elevation.level1
    }]}>
      <Text style={styles.author}>{props.author}</Text>
      <Text>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  commentContainer: {
    width: '100%',
    height: 60,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  author: {
    fontWeight: "600",
  }
});