import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'

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
    const { author, body } = this.state;

    const { createNewComment } = this.props;

    createNewComment({ author, body });

    this.setState({ author: '', body: '' })
  }
  
  render () {

    const { author, body } = this.state;

    return (
      <div className='new-comment'>
        <h3>New Comment</h3>
        <Form>
          <Form.Item>
            <Input
              placeholder='Author'
              value={author}
              onChange={(e) => this.onChangeInput('author', e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              placeholder='Content'
              value={body}
              onChange={(e) => this.onChangeInput('body', e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={this.send}>Send</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default NewComment