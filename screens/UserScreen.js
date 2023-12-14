import * as React from 'react'
import {View, Text, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import {Avatar, IconButton} from "react-native-paper";

import { TabView, SceneMap } from 'react-native-tab-view';
import Post from "../components/Post";

export default function UserScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'posts', title: 'Posts' },
    { key: 'bookmarks', title: 'Bookmarks' },
  ]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.userInfo}>
        <Avatar.Icon icon={'account'} size={64} />
        <View>
          <Text style={styles.userName}>Vitalii Tsoma</Text>
          <Text style={styles.handle}>@pfxel</Text>
        </View>
        <IconButton
          icon={'pencil-outline'}
        />
      </View>
      {/*<TabView*/}
      {/*  navigationState={{ index, routes }}*/}
      {/*  renderScene={renderScene}*/}
      {/*  onIndexChange={setIndex}*/}
      {/*  initialLayout={{ width: layout.width }}*/}
      {/*  pagerStyle={styles.tabView}*/}
      {/*/>*/}
    </View>
  )
}

const FirstRoute = () => (
  <ScrollView>
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView>
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
  </ScrollView>
);

const renderScene = SceneMap({
  posts: FirstRoute,
  bookmarks: SecondRoute,
});

const styles = StyleSheet.create({
  screenContainer: {
    display: "flex",
    flexDirection: 'column',
    height: '100%',
    marginTop: 36
  },
  userInfo: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 200,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  handle: {
    fontFamily: 'monospace',
  },
  tabView: {
    backgroundColor: "white",
    color: "black",
  }
})