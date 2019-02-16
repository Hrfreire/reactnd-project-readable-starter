import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import PostList from './PostList'
import PostPage from './PostPage'
import CategoriesBar from './CategoriesBar'
import NewPost from './NewPost'

class App extends Component {
  render() {
    return (
      <div className="app full-width">
        <Router>
          <Fragment>
            <LoadingBar />
            <Route path='/:category?' component={CategoriesBar}/>
            <Switch>
              <Route path='/post/new' exact component={NewPost}/>
              
              <Route path='/:category?' exact component={PostList}/>
              <Route path='/:category/:post_id' exact component={PostPage}/>
              <Route path='/:category/:post_id/edit' exact component={NewPost}/>
            </Switch>
          </Fragment>
        </Router>
      </div>
    )
  }
}

export default App
