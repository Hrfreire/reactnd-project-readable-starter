import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../actions/posts'
import Post from './Post'
import Comments from './Comments'

class PostPage extends Component {

  componentDidMount() {
    const { startFetchPost, id } = this.props
    startFetchPost(id)
  }

  deletePost = (...args) => {
    const { startDeletePost, history } = this.props
    startDeletePost(...args)
    history.push('/')
  }

  render() {
    const { post, startRegisterVote } = this.props

    if(post === null) {
      return <div />
    }

    return (
      <div className='post-page-wrapper'>
        <Post
          startRegisterVote={startRegisterVote}
          startDeletePost={(...args) => this.deletePost(...args)}
          {...post}
        />
        <Comments postId={post.id} />
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.post_id,
    post: state.posts.currentPost
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)