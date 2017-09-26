import React, { Component } from "react";

const Votes = ({ id, Votes, updateVote, voteScore }, props) => {
  return (
    <div className="voting">
      <div className="score">
        <h5>{voteScore}</h5>
      </div>
      <div className="thumbs-icons">
        <i
          className="fa fa-thumbs-o-up up"
          aria-hidden="true"
          onClick={idx => {
            updateVote(id, "upVote");
          }}
        />
        <i
          onClick={idx => {
            updateVote(id, "downVote");
          }}
          className="fa fa-thumbs-o-down down"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Votes;
