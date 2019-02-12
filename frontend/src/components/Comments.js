import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Divider } from 'antd'
import { actionCreators } from '../actions/comments'
import NewComment from './NewComment'
import Comment from './Comment'

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
    const { postId, comments, startRegisterCommentVote } = this.props

    return (
      <div>
        <Divider style={{ height: 2}}/>
        <NewComment postId={postId} createNewComment={this.createNewComment} />
        <Divider style={{ height: 2}}/>
        <h3>{comments.length} Comments</h3>
        <ul>
          {comments.map((comment) => 
            <Comment
              key={comment.id}
              startRegisterCommentVote={startRegisterCommentVote}
              {...comment}
            />
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.comments

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)