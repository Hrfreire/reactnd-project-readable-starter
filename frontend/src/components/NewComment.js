import React, { Component } from 'react'
import CommentForm from './CommentForm'

class NewComment extends Component {

  state = {
    author: '',
    body: ''
  }

  onChangeInput = (input, value) => {    
    this.setState({
      [input]: value
    })
  }

  send = () => {
    const { author, body } = this.state

    const { createNewComment } = this.props

    createNewComment({ author, body })

    this.setState({ author: '', body: '' })
  }
  
  render () {

    const { author, body } = this.state

    return (
      <div className='new-comment'>
        <h3>New Comment</h3>
        <CommentForm
          author={author}
          body={body}
          onChangeInput={this.onChangeInput}
          send={this.send}
          isEdit={false}
        />
      </div>
    )
  }
}

export default NewComment