import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
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
    if (isEdit) {
      this.props.startFetchPost(postId)
    }
  }

  componentWillUnmount() {
    this.props.resetNewPostState()
  }

  componentDidUpdate(prevProps) {

    const { currentPost, newPostRedirect, history } = this.props

    if (newPostRedirect) {
      history.push('/')
    }

    if (prevProps.currentPost !== currentPost && currentPost !== null) {
      const { title, body, author, category } = currentPost
      this.setState({
        title,
        body,
        author,
        category
      })
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
      alert('You must fiil all the fields to create a new post.') //eslint-disable-line
      return
    }

    if (isEdit) {
      this.props.startEditPost({ id: postId, title, body })
      return
    }

    this.props.startCreateNewPost({ title, author, body, category })
  }

  render () {

    const { title, author, body, category } = this.state

    const { categories, isEdit } = this.props

    return (
      <div style={{ display: 'flex', alignSelf: 'center', marginTop: 40, flexDirection: 'column' }}>
        <Row>
          <Col span={12} offset={6}>
            {isEdit
              ? <h2>Edit Post</h2>
              : <h2>New Post</h2>
            }
            <Form>
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
          </Col>
        </Row>
        
      </div>
    )
  }
}

NewPost.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  currentPost: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  newPostRedirect: PropTypes.bool.isRequired,
  postId: PropTypes.string,
  isEdit: PropTypes.bool.isRequired,
  startFetchPost: PropTypes.func.isRequired,
  startCreateNewPost: PropTypes.func.isRequired,
  startEditPost: PropTypes.func.isRequired,
  resetNewPostState: PropTypes.func.isRequired
}

const mapStateToProps = (state, { match }) => ({ 
  categories: state.categories.categories,
  newPostRedirect: state.posts.newPostRedirect,
  postId: match.params.post_id,
  isEdit: match.params.post_id !== undefined,
  currentPost: state.posts.currentPost
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)