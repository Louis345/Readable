import React, { Component } from "react";
import Votes from "../components/Votes";
import EditButtons from "../components/EditButtons";
import updateComment from "../components/updateComments";
import Comments from "../components/add_comment";
import { Link, Router } from "react-router-dom";
import { Container, Row, Col, Media } from "reactstrap";
import moment from "moment";
const DisplayPost = ({
  post,
  updateVote,
  id,
  title,
  body,
  data,
  commentVote,
  Comments,
  author,
  UpdateComment,
  addInput,
  deleteComment,
  deletePost,
  commentCount,
  navigate
}) => {
  return (
    <div className="container">
      {post.map((items, idx) => {
        if (Object.keys(items).length === 0) {
          return <div>Post has been deleted</div>;
        }
        return (
          <div className="box" key={idx}>
            <article className="media">
              <div className="media-left">
                <Votes
                  id={items.id}
                  updateVote={updateVote}
                  voteScore={items.voteScore}
                />
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    <i className="fa fa-user-circle-o" aria-hidden="true" />
                    <span className="subtitle">{items.author}</span>
                    <i className="fa fa-clock-o" aria-hidden="true" />
                    {moment(items.timestamp).format("MM/DD/YYYY h:mm:ss a")}
                    <br />
                    <Link
                      className="post-body"
                      key={idx}
                      to={`/${items.category}/${items.id}`}
                    >
                      <strong className="title is-5">{items.title}</strong>{" "}
                      <br />
                      <strong className="post-body subtitle is-4">
                        {items.body}
                      </strong>{" "}
                    </Link>

                    <br />
                    <small className="tag">{items.category}</small>
                  </p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fa fa-reply" />
                      </span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fa fa-retweet" />
                      </span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fa fa-heart" />
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
              <div className="media-right">
                <div className="modify-buttons">
                  <div className="button is-primary is-outlined">
                    <span>
                      <Link to={`/Edit/EditPost/${items.id}`}>
                        Edit
                      </Link>
                    </span>
                    <span className="icon is-small">
                      <i className="fa fa-times" />
                    </span>
                  </div>
                  <div className="button is-danger is-outlined">
                    <span
                      onClick={() =>
                        deletePost(items.id, () => {
                          navigate && navigate();
                        })}
                    >
                      Delete
                    </span>
                    <span className="icon is-small">
                      <i className="fa fa-times" />
                    </span>
                  </div>
                </div>
              </div>

            </article>
          </div>
        );
      })}
    </div>
  );
};
export default DisplayPost;
