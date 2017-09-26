import { combineReducers } from "redux";
import PostsReducer from "./reducer_post";
import { reducer as formReducer } from "redux-form";
const rootReducer = combineReducers({
  post: PostsReducer,
  form: formReducer
});

export default rootReducer;
