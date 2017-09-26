import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editComment } from "../actions";
class UpdateComment extends Component {
  renderTitleField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
      </div>
    );
  }
  onSubmit(values) {
    const { id, editComment } = this.props;
    values.id = id;

    editComment(values);
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
          />
          <Field
            name="comment"
            component={this.renderTitleField}
            label={"Enter comment"}
          />
          <button type="submit" className="btn btn-primary">Update</button>
          <button
            type="submit"
            onClick={e => this.props.onClick(e)}
            className="btn btn-primary"
          >
            Cancel
          </button>
        </form>
      );
    }
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="username"
          component={this.renderTitleField}
          label={"Username"}
        />
        <Field
          name="comment"
          component={this.renderTitleField}
          label={"Enter comment"}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "updateComment"
})(connect(null, { editComment })(UpdateComment));
