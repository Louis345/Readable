import React, { Component } from "react";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";
import PostsShow from "./components/post_show";
import PostAdd from "./components/post_add";
import Post from "./components/post";
import Edit from "./components/Edit";
import category from "./components/category";
import ShowCategory from "./components/show_category";
import { NoMatch } from "./components/no_match";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div>

            <div className="App">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props =>
                    <div>
                      <ShowCategory {...props} />
                      <PostsShow {...props} />
                    </div>}
                />
                <Route exact path="/:id" component={category} />
                <Route exact path="/:category/:id" component={Post} />
                <Route
                  exact
                  path="/posts/PostAdd/post_add"
                  component={PostAdd}
                />
                <Route exact path="/Edit/EditPost/:id" component={Edit} />
                <Route component={NoMatch} />
              </Switch>
            </div>

          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
