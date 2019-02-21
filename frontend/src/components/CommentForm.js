import React from 'react'
import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

function CommentForm ({ author, body, send, onChangeInput, isEdit }) {
  return (
    <Form>
      <Form.Item>
        <Input
          placeholder='Author'
          value={author}
          onChange={(e) => onChangeInput('author', e.target.value)}
          disabled={isEdit === true}
        />
      </Form.Item>
      <Form.Item>
        <Input.TextArea
          placeholder='Content'
          value={body}
          onChange={(e) => onChangeInput('body', e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={send}>Send</Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
	body: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	send: PropTypes.func.isRequired,
	onChangeInput: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired
}

export default CommentForm