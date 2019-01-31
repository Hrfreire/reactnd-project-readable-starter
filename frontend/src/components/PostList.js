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

    const { posts, startRegisterVote } = this.props;
    console.log(posts);
    return (
      <ul>
        { posts.map((post) => <Post key={post.id} {...post} startRegisterVote={startRegisterVote}/>)}
      </ul>
    );
  }
}

const mapStateToProps = (state) => (state.posts)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
