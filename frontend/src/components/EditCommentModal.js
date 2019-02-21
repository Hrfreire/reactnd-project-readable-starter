import React, { Component } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'

class EditCommentModal extends Component {

  state = {
    body: ''
  }

  componentDidMount() {
    this.setState({ body: this.props.body })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.body !== this.props.body) {
      this.setState({ body: this.props.body })
    }
  }

  onChangeInput = (input, value) => {    
    this.setState({
      [input]: value
    })
  }

  send = () => {
    const { sendEdit } = this.props
    const { body } = this.state

    sendEdit(body)
  }
  
  render() {
    const { visible, author } = this.props
    const { body } = this.state
    
    return (
      <Modal visible={visible} footer={null}>
        <h2>Edit Comment</h2>
        <CommentForm
          isEdit
          onChangeInput={this.onChangeInput}
          send={this.send}
          author={author}
          body={body}
        />
      </Modal>
    )
  }
}

EditCommentModal.propTypes = {
  body: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  sendEdit: PropTypes.func.isRequired
}

export default EditCommentModal;