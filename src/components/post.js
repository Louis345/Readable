import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchPosts,
  updateVote,
  deletePost,
  fetchPost,
  commentVote,
  addInput,
  removeInput,
  editComment,
  deleteComment
} from "../actions";
import { Container, Row, Col } from "reactstrap";
import Votes from "../components/Votes";
import Navbar from "../components/Navbar";
import Comments from "../components/add_comment";
import UpdateComment from "../components/updateComments";
import EditButtons from "../components/EditButtons";
import { Field, reduxForm, initialize } from "redux-form";
import { bindActionCreator } from "redux";
import DisplayPost from "../components/display_post";
class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchPost(id);
  }
  renderInput() {
    return (
      <div>
        <input />
      </div>
    );
  }
  removeCancel(event) {
    const { edit } = this.props.post;
    this.props.removeInput();
  }

  renderPost() {
    if (this.props.post.action) {
      const { post } = this.props.post.action.payload[0].data;
      const { newComment } = this.props.post;
      const { updateVote, commentVote } = this.props;

      const {
        voteScore,
        title,
        body,
        author
      } = this.props.post.action.payload[0].data;

      const { data } = this.props.post.action.payload[1];

      const { id } = this.props.post.action.payload[0].data;

      return (
        <div className="container">
          <div className="columns">
            <div className="column">
              <div>
                <DisplayPost
                  post={[this.props.post.action.payload[0].data]}
                  updateVote={updateVote}
                  deletePost={deletePost}
                />
                <span className="title is-4">Comments</span>
                {data.map((comment, idx) => {
                  if (this.props.post.edit === comment.id) {
                    return (
                      <Col key={idx} className="pre">
                        <Votes
                          post={comment}
                          updateVote={commentVote}
                          voteScore={comment.voteScore}
                          id={comment.id}
                        />
                        <UpdateComment
                          cancel={true}
                          onClick={this.removeCancel.bind(this)}
                          id={comment.id}
                        />
                      </Col>
                    );
                  }
                  if (!comment.delete) {
                    return (
                      <Col key={idx} className="commentContainer well">
                        <Votes
                          post={comment}
                          updateVote={commentVote}
                          voteScore={comment.voteScore}
                          id={comment.id}
                        />

                        {comment.body}
                        <EditButtons
                          onClick={this.props.addInput}
                          deleteComment={this.props.deleteComment}
                          commentId={comment.id}
                          formKey="updates"
                        />

                      </Col>
                    );
                  }
                })}
                <div className="well">
                  <h4>Add a comment:</h4>
                  <Comments parentId={id} author={author} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        !loading
      </div>
    );
  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <h1 className="notification title is-primary">Post Details</h1>
        {this.renderPost()}
      </div>
    );
  }
}
function mapStateToProps({ post }, ownProps) {
  const { id } = ownProps.match.params;

  if (post.hasOwnProperty("comment")) {
    post.action.payload[1].data.push(post.comment);
    delete post.comment;
  }
  if (post.hasOwnProperty(id)) {
    if (post.action) {
      post.action.payload[0].data.voteScore = post[id];
    }
  }
  if (post.hasOwnProperty("updatedVote")) {
    for (let [index, comments] of post.action.payload[1].data.entries()) {
      if (comments.id === post.updatedVote[id].id) {
        post.action.payload[1].data[index]["voteScore"] =
          post.updatedVote[id].voteScore;
      }
    }
  }

  return {
    post: post
  };
}
export default connect(mapStateToProps, {
  fetchPosts,
  updateVote,
  deletePost,
  fetchPost,
  commentVote,
  addInput,
  removeInput,
  editComment,
  deleteComment
})(Post);
