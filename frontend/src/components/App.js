import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'

import PostList from '../containers/PostList'
import PostPage from '../containers/PostPage'
import CategoriesBar from '../containers/CategoriesBar'
import NewPost from '../containers/NewPost'

import NotFound from './NotFound'

class App extends Component {
  render() {
    return (
      <div className="app full-width">
        <Router>
          <Fragment>
            <LoadingBar />
            <Route path='/:category?' component={CategoriesBar}/>
            <Switch>
              <Route path='/page-not-found' exact component={NotFound}/>
              
              <Route path='/post/new' exact component={NewPost}/>
              
              <Route path='/:category?' exact component={PostList}/>
              <Route path='/:category/:post_id' exact component={PostPage}/>
              <Route path='/:category/:post_id/edit' exact component={NewPost}/>
              
              <Route component={NotFound}/>
            </Switch>
          </Fragment>
        </Router>
      </div>
    )
  }
}

export default App
