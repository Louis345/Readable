import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, initialize } from "redux-form";
import { sortPosts } from "../actions";
class DropDown extends Component {
  onSubmit(field) {
    this.props.sortPosts(field.target.value);
  }
  renderCategory(field) {
    return (
      <div className="dropdown">
        <div className="items controls">
          <div className="select">
            <select {...field.input}>
              <option>
                Recent
              </option>
              <option>
                Score
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <form onChange={this.onSubmit.bind(this)}>
        <Field
          name="category"
          component={this.renderCategory.bind(this)}
          label={"Message"}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "PostsNewForm"
})(connect(null, { sortPosts })(DropDown));
