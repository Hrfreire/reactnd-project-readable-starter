import React from 'react'
import { Form, Input, Button } from 'antd'

export default ({ author, body, send, onChangeInput, isEdit }) => (
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