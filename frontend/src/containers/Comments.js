import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Divider } from 'antd'
import PropTypes from 'prop-types'
import { actionCreators } from '../actions/comments'
import NewComment from '../components/NewComment'
import Comment from '../components/Comment'

class Comments extends Component {

  componentDidMount() {
    const { postId, startFetchComments } = this.props
    
    startFetchComments(postId)
  }

  createNewComment = ({ author, body }) => {
    const { startCreateNewComment, postId } = this.props

    startCreateNewComment({
      parentId: postId,
      body,
      author
    })
  }

  render() {
    const {
      postId,
      comments, 
      startRegisterCommentVote,
      startDeleteComment,
      startEditComment
    } = this.props

    return (
      <div>
        <Divider style={{ height: 2}}/>
        <NewComment postId={postId} createNewComment={this.createNewComment} />
        <Divider style={{ height: 2}}/>
        <h3>{comments.length} Comment{comments.length > 1 && 's'}</h3>
        <ul>
          {comments.map((comment) => 
            <Comment
              key={comment.id}
              startRegisterCommentVote={startRegisterCommentVote}
              startEditComment={startEditComment}
              startDeleteComment={startDeleteComment}
              {...comment}
            />
          )}
        </ul>
      </div>
    )
  }
}

Comments.propTypes = {
	comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  postId: PropTypes.string.isRequired,
  startRegisterCommentVote: PropTypes.func.isRequired,
  startDeleteComment: PropTypes.func.isRequired,
  startEditComment: PropTypes.func.isRequired,
  startFetchComments: PropTypes.func.isRequired,
  startCreateNewComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => state.comments

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)