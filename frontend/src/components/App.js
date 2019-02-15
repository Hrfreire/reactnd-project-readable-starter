import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import PostList from './PostList'
import PostPage from './PostPage'
import CategoriesBar from './CategoriesBar'
import NewPost from './NewPost'

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
        <Router>
          <Fragment>
            <LoadingBar />
            <Route path='/:category?' component={CategoriesBar}/>
            <Route path='/:category?' exact component={PostList}/>
            <Route path='/posts/details/:id' exact component={PostPage}/>
            <Route path='/posts/new' exact component={NewPost}/>
            <Route path='/posts/edit/:id' exact component={NewPost}/>
          </Fragment>
        </Router>
      </div>
    )
  }
}

export default App
