import {View, StyleSheet, ScrollView} from "react-native";
import {useSelector} from "react-redux";

export default function ScreenContainer(props) {
  const theme = useSelector(state => state.theme.theme);

  return (
    props.scrollable ? (
      <ScrollView
        refreshControl={props.refreshControl}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          marginTop: 36,
          backgroundColor: theme.colors.background,
        }}
        contentContainerStyle={{
          gap: 10
        }}
      >
        {props.children}
      </ScrollView>
    ) : (
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        height: '100%',
        marginTop: 36
      }}>
        {props.children}
      </View>
    )
  );
}
