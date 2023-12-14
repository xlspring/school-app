import {useCallback, useEffect, useMemo, useState, useRef} from "react";
import {View, Text, StyleSheet, ScrollView, RefreshControl, Button, Modal} from "react-native";
import Post from "../components/Post";
import HeaderText from "../components/HeaderText";
import ScreenContainer from "../components/ScreenContainer";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, submitPost} from "../redux/slice/posts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {ActivityIndicator, FAB, IconButton, TextInput} from "react-native-paper";
import {hideComments, submitComment} from "../redux/slice/comment";
import Comment from "../components/Comment";

export default function HomeScreen(callback, deps) {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const [refreshing, setRefreshing] = useState(false);
  const [openWriteModal, setOpenWriteModal] = useState(false);
  const comments = useSelector(state => state.comments);

  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    onRefresh()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchPosts());

    setTimeout(() => {
      setRefreshing(false);
    }, 2000)
  }, deps)

  const dispatchPost = () => {
    dispatch(submitPost({ user: 20, postText: postText}))
    setPostText("");
    setOpenWriteModal(false);
  };

  const dispatchComment = (parentId) => {
    dispatch(submitComment({ author: 21, text: commentText }));
    setCommentText("");
    dispatch(hideComments());
  }

  return (
    <View style={styles.screen}>

      <Modal visible={openWriteModal}>
        <ScreenContainer
          scrollable={false}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Add a post</Text>
            <IconButton icon={"close"} onPress={() => setOpenWriteModal(false)} />
          </View>
          <TextInput
            label={"Post text"}
            mode={"outlined"}
            text={postText}
            onChangeText={text => setPostText(text)}
            multiline={true}
            style={styles.modalInput}
          />
          <FAB
            icon={"send"}
            label={"Send post"}
            style={styles.fab}
            onPress={() => dispatchPost()}
          />
        </ScreenContainer>
      </Modal>

      <Modal
        visible={comments.display}
      >
        <ScreenContainer
          scrollable={false}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Comments</Text>
            <IconButton icon={"close"} onPress={() => dispatch(hideComments())} />
          </View>
          <View style={styles.commentsWrapper}>
            {comments.comments.map(x => (
              <Comment
                author = {x.author}
                text = {x.text}
              />
            ))}
          </View>

          <View style={styles.commentInputContainer}>
            <TextInput
              label={"Comment"}
              mode={"outlined"}
              text={commentText}
              onChangeText={text => setCommentText(text)}
              multiline={false}
              style={styles.commentInput}
            />
            <IconButton
              icon={"send"}
              onPress={() => dispatchComment()}
            />
          </View>

        </ScreenContainer>
      </Modal>

      <ScreenContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        scrollable={true}
      >
        <HeaderText text={'Post timeline'}/>

        {
          posts.error === null ? (
            posts.data.map((post) => (
              <Post
                author={post.author_name}
                handle={post.author_handle}
                text={post.text}
                likes={post.likes}
                comments={post.comments}
                id={post.id}
                key={post.id}
              />
            ))
          ) : (
            <View style={styles.errorWrapper}>
              <MaterialCommunityIcons name={'access-point-off'} size={108} color={'gray'}/>
              <View>
                <Text>Sorry, something is in our way</Text>
                <Text>Check your internet connection and pull down</Text>
              </View>
            </View>
          )
        }
      </ScreenContainer>
      <FAB
        icon={"pencil"}
        style={styles.fab}
        onPress={() =>
          setOpenWriteModal(true)
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  errorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    gap: 50,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    bottom: 36,
    right: 0,
  },
  screen: {
    paddingBottom: 36,
  },
  modalHeader: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 32,
  },
  modalInput: {
    height: 250,
    width: '90%'
  },
  commentInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '100%',

    position: 'absolute',
    bottom: 40,
    margin: 26,
    left: 0,
  },
  commentsWrapper: {
    width: '90%',
    gap: 10,
  },
  commentInput: {
    width: '80%'
  }
});