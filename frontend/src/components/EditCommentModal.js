import React, { Component } from 'react'
import { Modal } from 'antd'
import CommentForm from './CommentForm'

export default class EditCommentModal extends Component {

  state = {
    body: ''
  }

  getderivedstatefromprops(props, state) {
    return {
      body: props.comment.body
    }
  }

  onChangeInput = (input, value) => {    
    this.setState({
      [input]: value
    })
  }

  send = () => {
    const { comment, startEditComment } = this.props
    const { body } = this.state

    startEditComment({ id: comment.id, body })
  }
  
  render() {
    const { visible } = this.props
    
    return (
      <Modal visible={visible}>
        <CommentForm
          isEdit
          onChangeInput={this.onChangeInput}
          send={this.send} />
      </Modal>
    )
  }
}