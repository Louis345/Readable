import React, { Component } from "react";

const EditButton = ({ onClick, commentId, deleteComment, props }) => {
  return (
    <div className="editButtons">
      <button onClick={() => onClick(commentId)} className="button">
        Edit
      </button>
      <button className="button" onClick={() => deleteComment(commentId)}>
        Delete
      </button>
    </div>
  );
};

export default EditButton;
