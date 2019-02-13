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

  render() {
    const { post, startRegisterVote, startDeletePost } = this.props

    if(post === null) {
      return <div />
    }

    return (
      <div className='post-page-wrapper'>
        <Post
          startRegisterVote={startRegisterVote}
          startDeletePost={startDeletePost}
          {...post}
        />
        <Comments postId={post.id} />
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    post: state.posts.currentPost
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)