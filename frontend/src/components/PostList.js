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

    console.log(this.props);
    const { posts } = this.props;
    
    return (
      <ul>
        { posts.map((post) => <Post key={post.id}/>)}
      </ul>
    );
  }
}

const mapStateToProps = (state) => (state.posts)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
