import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { actionCreators } from '../actions/categories'

class CategoriesBar extends Component {
  
  componentDidMount() {
    this.props.startFetchCategories()
  }

  render( ){
    
    const { currentCategory, categories } = this.props

    return (
      <Menu
        mode="horizontal"
        selectedKeys={[currentCategory]}
      >
        <Menu.Item key='all'>
          <Link to='/'>
            All Categories
          </Link>
        </Menu.Item>
        { categories.map(category => (
          <Menu.Item key={category.path}>
            <Link to={`/${category.path}`}>
              {category.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

CategoriesBar.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
  ).isRequired,
  startFetchCategories: PropTypes.func.isRequired
}

const mapStateToProps = (state, { match }) => ({
  categories: state.categories.categories,
  currentCategory: match.params.category || 'all'
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBar)