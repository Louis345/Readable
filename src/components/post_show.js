import React, { Component } from "react";
import {
  fetchPosts,
  updateVote,
  deletePost,
  fetchCategories
} from "../actions";
import Votes from "../components/Votes";
import Navbar from "../components/Navbar";
import DisplayPost from "../components/display_post";
import ShowCategory from "../components/show_category";
import DropDown from "../components/Dropdown";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "bulma/css/bulma.css";
import Footer from "../components/Footer";
import _ from "lodash";
class PostsShow extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  renderPosts() {
    let objPost = null;
    if (this.props.posts.response) {
      const { response } = this.props.posts;
      const { updateVote, deletePost } = this.props;
      return (
        <div>
          <DisplayPost
            post={response}
            updateVote={updateVote}
            deletePost={deletePost}
          />
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="flex-dropdown">
            <DropDown />
          </div>
          <h3 className="title is-3 is-spaced">

            {this.props.posts.response
              ? this.props.posts.response.length + " "
              : 0}
            Posts {" "}
          </h3>
          <div className="container">
            {this.renderPosts()}
          </div>
          <div className="submit">
            <a
              className="button is-primary"
              onClick={() => {
                this.props.history.push("/posts/create_post");
              }}
            >
              <span className="icon is-small">
                <i className="fa fa-plus" aria-hidden="true" />
              </span>
              <span>Add Post</span>
            </a>
          </div>
        </div>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return { posts: state.post };
}
export default connect(mapStateToProps, {
  fetchPosts,
  updateVote,
  deletePost,
  fetchCategories
})(PostsShow);
