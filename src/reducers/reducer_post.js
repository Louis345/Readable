import {
  FETCH_POST,
  FETCH_POSTS,
  FETCH_CATEGORIES,
  UPDATE_VOTE,
  DELETE_POST,
  COMMENT,
  COMMENT_VOTE,
  ADD_INPUT,
  REMOVE_INPUT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  POST_CATEGORY,
  SORT_POSTS,
  ERROR_HANDLER
} from "../actions";
import _ from "lodash";
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, action };
    case FETCH_POSTS:
      let filteredItems = action.payload.data.filter((items, idx) => {
        return items.deleted != true;
      });

      return { response: filteredItems };
    case FETCH_CATEGORIES:
      console.log(state);
      console.log(action);
      return { ...state, categories: action.payload.data.categories };

    case ERROR_HANDLER: {
      return { ...state, error: action.payload.response.status };
    }
    case UPDATE_VOTE:
      const { payload } = action;
      const { voteScore, id } = payload.data;
      const { response } = state;
      let updatedVote = null;

      if (state.response) {
        updatedVote = state.response.map((item, idx) => {
          return item.id == id ? payload.data : item;
        });
      }
      if (state.data) {
        updatedVote = state.data.map((items, idx) => {
          if (action.payload.data.id === items.id) {
            return action.payload.data;
          }
          return items;
        });
      }

      return {
        ...state,
        data: updatedVote,
        response: updatedVote,
        [id]: action.payload.data.voteScore,
        updatedVotes: action.payload.data
      };
    case DELETE_POST:
      let filteredPosts = null;
      let removedItems = null;
      if (state.response) {
        filteredPosts = state.response.filter((items, idx) => {
          return items.id != action.payload;
        });
        if (state.data) {
          removedItems = state.data.slice(0);
          removedItems = removedItems.filter((items, idx) => {
            return items.id != action.payload;
          });
        }
        return {
          ...state,
          data: removedItems,
          response: filteredPosts
        };
      }
      removedItems = state.data.slice(0);
      removedItems = removedItems.filter((items, idx) => {
        return items.id != action.payload;
      });

      return {
        ...state,
        data: removedItems,
        response: filteredPosts
      };
    case COMMENT_VOTE:
      let comments = [action.payload.data].reduce((obj, item) => {
        obj[item.parentId] = item;
        return obj;
      }, {});

      return {
        ...state,
        updatedVote: comments
      };
    case ADD_INPUT:
      const { data } = state.action.payload[1];

      return { ...state, edit: action.payload };
      return state;

    case REMOVE_INPUT:
      return { ...state, edit: null };

    case DELETE_COMMENT: {
      const { id } = action.payload;
      const { payload } = state.action;
      const { data } = action.payload;

      payload[1].data.forEach((comment, idx) => {
        if (comment.id == data.id) {
          comment.delete = true;
        }
      });

      return { ...state };
    }
    case EDIT_COMMENT: {
      const { data } = state.action.payload[1];
      let newState = data.map((comment, id) => {
        if (comment.id === action.payload.data.id) {
          return action.payload.data;
        }

        return state.action.payload[1].data[id];
      });

      let finalState = Object.assign({}, state, {
        action: {
          ...state.action,
          payload: [state.action.payload[0], { data: newState }]
        }
      });

      return { ...finalState, edit: null };
    }
    case COMMENT:
      return { ...state, comment: action.payload.data };
    case POST_CATEGORY: {
      const { data } = action.payload;

      return { ...state, data };
    }
    case SORT_POSTS: {
      const { payload } = action;
      const { data } = action.payload;

      let response = null;

      response = payload === "Score"
        ? _.sortBy(state.response, o => o.voteScore).reverse()
        : _.sortBy(state.response, o => o.timestamp).reverse();

      return { ...state, response, data: response };
    }
    default:
      return state;
  }
}
