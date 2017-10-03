import axios from "axios";
export const FETCH_POSTS = "fetch_posts";
export const FETCH_CATEGORIES = "fetch_categories";
export const CREATE_POST = "create_post";
export const FETCH_POST = "fetch_post";
export const UPDATE_VOTE = "update_vote";
export const DELETE_POST = "delete_post";
export const COMMENT = "comment";
export const COMMENT_VOTE = "comment_vote";
export const EDIT_POST = "edit_post";
export const ADD_INPUT = "add_input";
export const REMOVE_INPUT = "remove_input";
export const DELETE_COMMENT = "delete_comment";
export const EDIT_COMMENT = "edit_comment";
export const POST_CATEGORY = "post_category";
export const SORT_POSTS = "sort_posts";
export const ERROR_HANDLER = "error_handler";
const ROOT_URL = "http://localhost:5001";

const headers = {
  headers: {
    Authorization: "Basic Y2NjYzogY2Nj"
  }
};
export function sortPosts(sort) {
  return {
    type: SORT_POSTS,
    payload: sort
  };
}
export function getPostCategory(category) {
  ///:category/posts

  const request = axios.get(`${ROOT_URL}/${category}/posts`, headers);

  return {
    type: POST_CATEGORY,
    payload: request
  };
}
export function handleError(error) {
  return {
    type: ERROR_HANDLER,
    payload: error
  };
}
export function fetchPost(id, callback) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`, headers);
  const commentRequest = axios.get(`${ROOT_URL}/posts/${id}/comments`, headers);

  let data = Promise.all([request, commentRequest])
    .then(values => {
      return values;
    })
    .catch(error => {
      callback(error);
      return error.response.status;
    });

  return {
    type: FETCH_POST,
    payload: data
  };
}
export function updateVote(id, vote) {
  let votedState = vote === "upVote" ? "upVote" : "downVote";

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    timeout: 1000,
    headers: {
      Authorization: "Basic Y2NjYzogY2Nj"
    },
    body: JSON.stringify({
      option: `${votedState}`
    })
  });

  const request = axiosInstance.post(`${ROOT_URL}/posts/${id}`, {
    option: `${votedState}`
  });

  return {
    type: UPDATE_VOTE,
    payload: request
  };
}
export function commentVote(id, vote) {
  let votedState = vote === "upVote" ? "upVote" : "downVote";

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    timeout: 1000,
    headers: {
      Authorization: "Basic Y2NjYzogY2Nj"
    },
    body: JSON.stringify({
      option: `${votedState}`
    })
  });

  const request = axiosInstance.post(`${ROOT_URL}/comments/${id}`, {
    option: `${votedState}`
  });

  return {
    type: COMMENT_VOTE,
    payload: request
  };
}
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`, headers);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}
export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`, headers);
  console.log(request);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}
export function createPost(values, callback) {
  let randomNumber = Math.floor(Math.random() * 1000000000);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    timeout: 1000,
    headers: {
      Authorization: "Basic Y2NjYzogY2Nj"
    }
  });

  const request = axiosInstance
    .post("/posts", {
      id: randomNumber.toString(),
      timestamp: Date.now(),
      title: values.title,
      body: values.message,
      author: values.username,
      category: values.category
    })
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}`, headers).then(() => {
    callback();
  });

  return {
    type: DELETE_POST,
    payload: id
  };
}

export function Comment(values) {
  const { parentId, owner, comment } = values;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    timeout: 1000,
    headers: {
      Authorization: "Basic Y2NjYzogY2Nj",
      "Content-Type": "application/json"
    },
    ContentType: "application/json"
  });
  const data = axiosInstance.post(`${ROOT_URL}/comments`, {
    body: comment,
    author: owner,
    parentId: parentId,
    id: Math.floor(Math.random() * 1000000)
  });

  return {
    type: COMMENT,
    payload: data
  };
}

export function editComment(values) {
  const { id, comment } = values;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    timeout: 1000,
    headers: {
      Authorization: "Basic Y2NjYzogY2Nj"
    }
  });

  const request = axiosInstance.put(`comments/${id}`, {
    timestamp: Date.now(),
    body: comment
  });

  return {
    type: EDIT_COMMENT,
    payload: request
  };
}

export function editPost(values, callback) {
  //PUT /posts/:id
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    timeout: 1000,
    headers: {
      Authorization: "Basic Y2NjYzogY2Nj"
    }
  });

  const request = axiosInstance
    .put(`/posts/${values.id}`, {
      title: values.title,
      body: values.body,
      category: values.category
    })
    .then(() => {
      callback();
    });

  return {
    type: EDIT_POST,
    payload: request
  };
}

export function addInput(commentId) {
  return {
    type: ADD_INPUT,
    payload: commentId
  };
}

export function deleteComment(commentId) {
  ///comments/:id
  const request = axios.delete(`${ROOT_URL}/comments/${commentId}`, headers);
  return {
    type: DELETE_COMMENT,
    payload: request
  };
}
export function removeInput(id) {
  return {
    type: REMOVE_INPUT,
    payload: id
  };
}
