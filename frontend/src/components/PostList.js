import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Post from './Post'
import { actionCreators } from '../actions/posts'

class PostList extends Component {
  
  componentDidMount() {
    this.props.startFetchPosts();
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

const mapStateToProps = (state) => (state.posts)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
