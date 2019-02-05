import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/comments'
import NewComment from './NewComment'
import Comment from './Comment'

class Comments extends Component {

  componentDidMount() {
    const { postId, startFetchComments } = this.props
    
    startFetchComments(postId)
  }

  render() {
    const { comments } = this.props; 

    return (
      <div>
        <NewComment />
        <h3>{comments.length} Comments</h3>
        <ul>
          {comments.map((comment) => 
            <Comment key={comment.id} {...comment} />
            )}
        </ul>
      </div>
    )
  }
};

const mapStateToProps = (state) => state.comments

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)