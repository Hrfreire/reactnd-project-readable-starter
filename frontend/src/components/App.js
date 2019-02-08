import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
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
            <Route path='/:category?' component={CategoriesBar}/>
            <Route path='/:category?' exact component={PostList}/>
            <Route path='/posts/new/:id?' exact component={NewPost}/>
            <Route path='/posts/datails/:id' exact component={PostPage}/>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App
