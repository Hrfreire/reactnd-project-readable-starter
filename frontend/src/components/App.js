import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import PostList from './PostList'
import PostPage from './PostPage'

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path='/' exact component={PostList}/>
          <Route path='/posts/:id' exact component={PostPage}/>
        </Fragment>
      </Router>
    );
  }
}

export default App
