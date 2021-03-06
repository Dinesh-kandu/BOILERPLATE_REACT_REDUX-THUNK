import { PostTypes } from './action';

const initialState = {
  posts: [],
  post: null,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PostTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
      };
    case PostTypes.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case PostTypes.POST_ERROR:
      return {
        ...state,
        error: payload,
      };
    case PostTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post),
      };
    case PostTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
      };
    case PostTypes.GET_POST:
      return {
        ...state,
        post: payload,
      };
    case PostTypes.ADD_COMMENT:
      console.log(state.post.comments);
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    case PostTypes.REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== payload),
        },
      };
    default:
      return state;
  }
}
