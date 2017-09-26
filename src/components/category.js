import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPostCategory,
  addInput,
  deleteComment,
  updateVote,
  deletePost
} from "../actions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DropDown from "../components/Dropdown";
import DisplayPost from "../components/display_post";
import { Link } from "react-router-dom";
class Category extends Component {
  componentDidMount() {
    const { getPostCategory } = this.props;
    const { id } = this.props.match.params;

    getPostCategory(id);
  }
  renderPostCategory() {
    const { id } = this.props.match.params;

    return (
      <div>
        <Navbar />
        <h1 className="notification">{id}</h1>
        <h3 className="title is-3 is-spaced">
          {this.props.data.length}
          {" "}Posts{" "}
        </h3>
        <div className="flex-dropdown">
          <DropDown />
        </div>
      </div>
    );
  }

  render() {
    if (this.props.data) {
      const { data, updateVote, deletePost } = this.props;
      const { response } = this.props;
      const postData = response ? data : response;

      return (
        <div className="container">
          {this.renderPostCategory()}
          <DisplayPost
            post={data}
            updateVote={updateVote}
            deletePost={deletePost}
          />
          <div className="buttons">
            <a className="button is-primary is-outlined">Back</a>
          </div>

        </div>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}
function mapStateToProps({ post }) {
  return post;
}
export default connect(mapStateToProps, {
  getPostCategory,
  addInput,
  deleteComment,
  updateVote,
  deletePost
})(Category);
