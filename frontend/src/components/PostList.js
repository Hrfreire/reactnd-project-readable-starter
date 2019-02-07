import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Post from './Post'
import { actionCreators } from '../actions/posts'

class PostList extends Component {
  
  componentDidMount() {
    this.fetchPosts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchPosts()
    }
  }

  fetchPosts = () => {
    // Category is optional. If not passed, startFetchPosts will return all posts.
    
    const { category, startFetchPosts } = this.props

    startFetchPosts(category);
  }
  
  render() {

    const { posts, startRegisterVote } = this.props
    
    return (
      <div className='post-list-wrapper'>
        <ul>
          { posts.map((post) => 
            <li key={post.id}>
              <Post {...post} startRegisterVote={startRegisterVote}/>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    ...state.posts,
    category: match.params.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
