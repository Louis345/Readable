import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Comment } from "../actions";
class PostComment extends Component {
  handleSubmit() {}
  renderTitleField(field) {
    console.log(field);
    return (
      <div>
        <label className="label">{field.label}</label>
        <input
          className="input is-small"
          placeholder={field.input.name}
          type="text"
          {...field.input}
        />
      </div>
    );
  }
  onSubmit(values) {
    const { post, Comment, parentId, author } = this.props;

    let randomNumber = Math.floor(Math.random() * 1000000);
    let commentObj = {
      id: randomNumber,
      parentId: parentId,
      owner: author,
      timestamp: Date.now()
    };
    Object.assign(values, commentObj);

    Comment(values);
  }
  renderMessageField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <textarea type="text" className="textarea" {...field.input} />
      </div>
    );
  }
  render() {
    const { handleSubmit } = this.props;
    const { cancel } = this.props;
    const { onClick } = this.props;
    if (cancel) {
      return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="username"
            component={this.renderTitleField}
            label={"Username"}
            placeholder={"Enter your username"}
          />
          <Field
            name="Enter a comment"
            component={this.renderTitleField}
            label={"Enter comment"}
            placeholder={"Enter your comment"}
          />
          <button type="submit" className="button">Submit</button>
          <button
            type="submit"
            onClick={e => this.props.onClick(e)}
            className="button"
          >
            Cancel
          </button>
        </form>
      );
    }
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="username" component={this.renderTitleField} />
        <Field name="comment" component={this.renderTitleField} />
        <button type="submit" className="button">Submit</button>
        <Link to="/" className="button">Cancel</Link>
      </form>
    );
  }
}

const forms = reduxForm({
  form: "forms"
})(connect(null, { Comment })(PostComment));

export default forms;
