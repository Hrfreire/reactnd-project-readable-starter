import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Row, Col, Select } from 'antd'
import PropTypes from 'prop-types'

import Post from '../components/Post'
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
    const { posts, startRegisterVote, startDeletePost, sortPosts, sortBy } = this.props

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
          <Col span={4} offset={1} style={{ marginTop: 10 }} >
            <span>Sort by:</span>
            <Select
              placeholder="sort"
              className="full-width"
              onChange={value => sortPosts(value)}
              value={sortBy}
            >
              <Select.Option value='date-descending'>Date (Descending)</Select.Option>
              <Select.Option value='date-ascending'>Date (Ascending)</Select.Option>
              <Select.Option value='score-descending'>Score (Descending)</Select.Option>
              <Select.Option value='score-ascending'>Score (Ascending)</Select.Option>
            </Select>
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

PostList.propTypes = {
	posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
      commentCount: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  category: PropTypes.string,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}),
  sortBy: PropTypes.string.isRequired,
	startDeletePost: PropTypes.func.isRequired,
  startRegisterVote: PropTypes.func.isRequired,
  sortPosts: PropTypes.func.isRequired,
  startFetchPosts: PropTypes.func.isRequired
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
