import React, { Component } from 'react'
import { Input } from 'antd'

class NewComment extends Component {

  
  render () {
    return (
      <div>
        <Input placeholder='Author'></Input>
        <Input placeholder='Title'></Input>
        <Input.TextArea placeholder='content'></Input.TextArea>
      </div>
    )
  }
}

export default NewComment