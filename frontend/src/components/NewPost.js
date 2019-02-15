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

  componentDidMount() {
    const { postId, isEdit } = this.props

    if(isEdit) {
      this.props.startFetchPost(postId)
    }
  }

  onChangeInput = (input, value) => {    
    this.setState({
      [input]: value
    })
  }

  send = () => {
    const { title, author, body, category } = this.state

    const { postId, isEdit } = this.props

    if (!title || !body || !author || !category) {
      alert('You must fiil all the fields to create a new post.')
      return
    }

    if (isEdit) {
      this.props.startEditPost({ id: postId, title, body })
      return
    }

    this.props.startCreateNewPost({ title, author, body, category })
  }

  componentDidUpdate(prevProps) {

    const { currentPost, newPostRedirect, history, resetNewPostState} = this.props

    if (prevProps.currentPost !== currentPost) {
      const { title, body, author, category } = currentPost
      this.setState({
        title,
        body,
        author,
        category
      })
    }

    if (newPostRedirect) {
      resetNewPostState()
      history.push('/')
    }

  }

  render () {

    const { title, author, body, category } = this.state

    const { categories, isEdit } = this.props

    return (
      <div style={{ display: 'flex', alignSelf: 'center', marginTop: 40, flexDirection: 'column' }}>
        
        {isEdit
          ? <h2>Edit Post</h2>
          : <h2>New Post</h2>
        }

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
                disabled={isEdit}
              />
          </Form.Item>
          <Form.Item>
            <Select
              value={category}
              onChange={(value) => this.onChangeInput('category', value)}
              placeholder='category'
              disabled={isEdit}
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

const mapStateToProps = (state, { match }) => ({ 
  categories: state.categories.categories,
  newPostRedirect: state.posts.newPostRedirect,
  postId: match.params.id,
  isEdit: match.params.id !== undefined,
  currentPost: state.posts.currentPost
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)