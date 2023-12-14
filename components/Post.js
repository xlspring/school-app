import {View, Text, StyleSheet} from "react-native";
import {Avatar, IconButton, Divider} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {likePost, dislikePost, setDislikePost, setLikePost} from "../redux/slice/posts";
import {hideComments, showComments} from "../redux/slice/comment";

export default function Post(props) {

  const [like, setLike] = useState(false);
  const [fav, setFav] = useState(false);

  const theme = useSelector(state => state.theme.theme);
  const comments = useSelector(state => state.comments.display);

  const dispatch = useDispatch();

  const toggleLike = (id) => {
    if (like) {
      setLike(false);
      dispatch(dislikePost({id}));
      dispatch(setDislikePost(id));
    } else {
      setLike(true)
      dispatch(likePost({id}))
      dispatch(setLikePost(id));
    }
  }

  const toggleFav = (id) => {
    if (fav) {
      setFav(false)
    } else {
      setFav(true)
    }
  }

  const toggleComments = (commentArray, parentId) => {
    if (comments) {
      dispatch(hideComments());
    } else {
      dispatch(showComments({
        commentArray: commentArray,
        currentId: parentId,
      }));
    }
  }

  return (
    <View style={[styles.postContainer, {
      backgroundColor: theme.colors.elevation.level1,
    }]}>
      <View style={styles.postHeader}>
        <Avatar.Icon icon={'account'} size={36}/>
        <View>
          <Text>{props.author}</Text>
          <Text style={styles.handle}>@{props.handle}</Text>
        </View>
      </View>
      <Text style={styles.postBody}>
        {props.text}
      </Text>
      <View style={styles.postFooter}>
        <View style={styles.mainButtons}>
          <IconButton
            animated={true}
            icon={like ? 'heart' : 'heart-outline'}
            iconColor={like ? 'red' : 'black'}
            size={26}
            onPress={() => toggleLike(props.id)}
          />
          <Text>{props.likes}</Text>
          <IconButton
            icon={'comment-outline'}
            size={26}
            onPress={() => toggleComments(props.comments, props.id)}
          />
          <Text>{props.comments[0].author == null || props.comments[0].text == null ? 0 : props.comments.length}</Text>
        </View>
        <IconButton
          animated={true}
          icon={fav ? 'bookmark' : 'bookmark-outline'}
          iconColor={fav ? '#ffd400' : 'black'}
          size={26}
          onPress={() => toggleFav(props.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,

    marginRight: 10,
    marginLeft: 10,

    borderRadius: 20,
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 15
  },
  handle: {
    fontFamily: 'monospace',
  },
  postBody: {
    fontSize: 18
  },
  postFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainButtons: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  }
});