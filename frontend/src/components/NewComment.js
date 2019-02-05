import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'

class NewComment extends Component {

  
  render () {
    return (
      <div className='new-comment'>
        <h3>New Comment</h3>
        <Form>
          <Form.Item>
            <Input placeholder='Author'></Input>
          </Form.Item>
          <Form.Item>
            <Input placeholder='Title'></Input>
          </Form.Item>
          <Form.Item>
            <Input.TextArea placeholder='content'></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <Button>Send</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default NewComment