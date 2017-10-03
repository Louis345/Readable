import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchCategories, createPost, fetchPost } from "../actions";
import "../App.css";
class PostAdd extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  renderTitleField(field) {
    return (
      <div>
        <label className="label">{field.label}</label>
        <input className="input is-primary" type="text" {...field.input} />
      </div>
    );
  }
  renderMessageField(field) {
    return (
      <div>
        <label className="label">{field.label}</label>
        <div className="control">
          <textarea
            type="text"
            className="textarea is-primary"
            {...field.input}
          />
        </div>
      </div>
    );
  }

  renderCategory(field) {
    if (this.props.categories) {
      return (
        <div>
          <label className="label">{field.label}</label>
          <div className="select is-primary">
            <select {...field.input} name="category">
              <option className="select">Select a category</option>
              {this.props.categories.map((category, idx) => {
                return (
                  <option value={category.name} key={idx}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <label className="label" name="category">{field.label}</label>
          <select {...field.input} />
        </div>
      );
    }
  }
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.goBack();
    });
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <Navbar />
        <h1 className="notification title is-primary">Create Post</h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="title"
            component={this.renderTitleField}
            label={"Post A Title"}
          />
          <Field
            name="username"
            component={this.renderTitleField}
            label={"Username"}
          />
          <Field
            name="category"
            component={this.renderCategory.bind(this)}
            label={"Select Category"}
          />
          <Field
            name="message"
            component={this.renderMessageField}
            label={"Message"}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
        <Footer />
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
  return { categories: state.post.categories };
}
export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  connect(mapStateToProps, { fetchCategories, createPost, fetchPost })(PostAdd)
);
