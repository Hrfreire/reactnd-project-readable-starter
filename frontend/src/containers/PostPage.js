import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actionCreators } from '../actions/posts'
import Post from '../components/Post'
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

  componentDidUpdate() {
    const { postError, history } = this.props
    if(postError) {
      history.push('/page-not-found')
    }
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

PostPage.propTypes = {
  id: PropTypes.string.isRequired,
	post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }),
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}),
	startDeletePost: PropTypes.func.isRequired,
  startRegisterVote: PropTypes.func.isRequired,
  startFetchPost: PropTypes.func.isRequired,
  postError: PropTypes.bool.isRequired
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.post_id,
    post: state.posts.currentPost,
    postError: (state.posts.fetchPostError !== null)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)