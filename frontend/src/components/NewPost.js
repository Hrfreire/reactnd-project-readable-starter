import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Button } from 'antd'
import { actionCreators } from '../actions/posts'

class NewPost extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: undefined
  }

  onChangeInput = (input, value) => {    
    this.setState({
      [input]: value
    })
  }

  send = () => {
    const { title, author, body, category } = this.state

    if(!title || !body || !author || !category) {
      alert('You must fiil all the fields to create a new post.')
      return;
    }

    this.props.startCreateNewPost({ title, author, body, category })
  }

  render () {

    const { title, author, body, category } = this.state

    const { categories } = this.props

    return (
      <div style={{ display: 'flex', alignSelf: 'center', marginTop: 40, flexDirection: 'column' }}>
        <h2>New Post</h2>
        <Form style={{ width: 600 }}>
          <Form.Item>
              <Input
                placeholder='title'
                value={title}
                onChange={(e) => this.onChangeInput('title', e.target.value)}
              />
          </Form.Item>
          <Form.Item>
              <Input
                placeholder='author'
                value={author}
                onChange={(e) => this.onChangeInput('author', e.target.value)}
              />
          </Form.Item>
          <Form.Item>
            <Select
              value={category}
              onChange={(value) => this.onChangeInput('category', value)}
              placeholder='category'
            >
              { categories.map((category) => 
                <Select.Option
                  key={category.path}
                  value={category.path}
                >
                  {category.name}
                </Select.Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              placeholder='body'
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

const mapStateToProps = (state) => ({ ...state.posts, categories: state.categories.categories })

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)