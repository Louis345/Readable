import React, { Component } from "react";
import { Field, reduxForm, initialize } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories, createPost, fetchPost, editPost } from "../actions";
import category from "../components/show_category";
import Navbar from "../components/Navbar";
import "../App.css";
class Edit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    this.props.fetchCategories();
  }

  renderTitleField(field) {
    return (
      <div className="field">
        <label className="label">{field.label}</label>
        <div className="control">
          <input className="input is-primary" type="text" {...field.input} />
        </div>
      </div>
    );
  }
  renderMessageField(field) {
    return (
      <div>
        <label className="label">{field.label}</label>
        <div className="control">
          <textarea
            className="textarea is-primary"
            placeholder="Textarea"
            {...field.input}
          />
        </div>
      </div>
    );
  }

  renderCategory(field) {
    if (this.props.category) {
      return (
        <div>
          <label className="label">Select a category</label>
          <div className="select is-primary">
            <select {...field.input}>
              {this.props.category.map((items, idx) => {
                if (field.input.value === items.name) {
                  return (
                    <option className="select" key={idx} selected>
                      {items.name}
                    </option>
                  );
                }
                return (
                  <option className="select" key={idx}>{items.name}</option>
                );
              })}
            </select>
          </div>
        </div>
      );
    }
    return (
      <select>
        <option>{field.input.value}</option>
      </select>
    );
  }

  onSubmit(values) {
    // this.props.createPost(values);

    this.props.editPost(values);
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <Navbar />
        <h1 className="notification title is-primary">Edit Post</h1>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="title"
            component={this.renderTitleField}
            label={"Post A Title"}
          />
          <Field
            name="author"
            component={this.renderTitleField}
            label={"Username"}
          />
          <Field
            name="category"
            component={this.renderCategory.bind(this)}
            label={"Message"}
          />
          <Field
            name="body"
            component={this.renderMessageField}
            label={"Message"}
          />
          <button type="submit" className="button is-primary">Submit</button>
          <button
            onClick={() => this.props.history.goBack()}
            className="button is-danger"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Enter a title";
  }
  return errors;
}
function mapStateToProps(state) {
  return state;
}

Edit = reduxForm({
  form: "editForm" // a unique identifier for this form
})(Edit);

Edit = connect(
  state => {
    if (state.post.action) {
      return {
        state,
        initialValues: state.post.action.payload[0].data,
        category: state.post.categories
      };
    }
  },
  { fetchPost, fetchCategories, editPost } // bind account loading action creator
)(Edit);

export default Edit;
