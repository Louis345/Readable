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
  deleteComment,
  handleError
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
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id, error => {
      this.props.handleError(error);
    });
  }

  removeCancel(event) {
    const { edit } = this.props.post;
    this.props.removeInput();
  }
  navigate = location => {
    this.props.history.goBack();
  };
  renderPost() {
    if (this.props.post.error) {
      return (
        <div>
          Error{" "}
        </div>
      );
    }
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
      const commentLength = data.length;
      const { id } = this.props.post.action.payload[0].data;
      let filteredItems = this.props.post.action.payload[0].data === false
        ? this.props.post.action.payload[0].data
        : null;
      if (Object.keys(this.props.post.action.payload[0].data).length === 0) {
        return <div className="title notification">Post has been deleted</div>;
      }
      return (
        <div className="container">
          <div className="columns">
            <div className="column">
              <div>
                <DisplayPost
                  post={[this.props.post.action.payload[0].data]}
                  updateVote={updateVote}
                  deletePost={deletePost}
                  navigate={this.navigate}
                />
                <span className="title is-4">
                  {" "} {`${commentLength} Comments`}
                </span>

                {data.map((comment, idx) => {
                  if (this.props.post.edit === comment.id) {
                    return (
                      <div key={idx} className="well">
                        <article className="media">
                          <div className="media-left">
                            <div className="media-content">
                              <div className="content">
                                <UpdateComment
                                  cancel={true}
                                  onClick={this.removeCancel.bind(this)}
                                  id={comment.id}
                                  comment={comment}
                                />
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    );
                  }
                  if (!comment.delete) {
                    return (
                      <div className="well" key={idx}>
                        <article className="media">
                          <div className="media-left">

                            <Votes
                              post={comment}
                              updateVote={commentVote}
                              voteScore={comment.voteScore}
                              id={comment.id}
                            />

                          </div>
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <strong>{comment.author}</strong>{" "}
                                <br />
                                {comment.body}
                              </p>
                            </div>
                          </div>
                          <EditButtons
                            onClick={this.props.addInput}
                            deleteComment={this.props.deleteComment}
                            commentId={comment.id}
                            formKey="updates"
                          />
                        </article>
                      </div>
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
  deleteComment,
  handleError
})(Post);
