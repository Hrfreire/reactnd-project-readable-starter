import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Row, Col } from 'antd'

import Post from './Post'
import { actionCreators } from '../actions/posts'

class PostList extends Component {
  
  componentDidMount() {
    this.fetchPosts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchPosts()
    }
  }

  fetchPosts = () => {
    // Category is optional. If not passed, startFetchPosts will return all posts.
    
    const { category, startFetchPosts } = this.props

    startFetchPosts(category)
  }

  newPost = () => {
    this.props.history.push('/post/new')
  }
  
  render() {

    const { posts, startRegisterVote, startDeletePost } = this.props

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
        <Row className="full-width" >
          <Col span={12} offset={6}>
            <Button
              className="full-width"
              type="primary"
              style={{ marginTop: 30 }}
              onClick={this.newPost}
            >
              New Post
            </Button>  
          </Col>
        </Row>

        <div className='post-list-wrapper'>
          <ul className="full-width">
            { posts.map((post) => 
              <li key={post.id}>
                <Post
                  startRegisterVote={startRegisterVote}
                  startDeletePost={startDeletePost}
                  {...post}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    ...state.posts,
    category: match.params.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
