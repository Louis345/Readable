import React, { Component } from "react";
import { fetchCategories } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

class showCategory extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  renderCategory() {
    const { categories } = this.props.categories;
    console.log(this.props);

    if (categories) {
      return categories.map((category, idx) => {
        return (
          <div className="column" key={idx}>
            <Link to={`${category.path}`}>

              <div className="notification" key={idx}>

                <span className="title">{category.name}</span>

              </div>

            </Link>
          </div>
        );
      });
    } else {
      <div>!loading</div>;
      this.props.fetchCategories();
    }
  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <h3 className="title is-3 is-spaced">Categories</h3>
        <div className="columns">
          {this.renderCategory()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { ...state, categories: state.post };
}
export default connect(mapStateToProps, { fetchCategories })(showCategory);
