import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { actionCreators } from '../actions/categories'

class CategoriesBar extends Component {
  
  componentDidMount() {
    this.props.startFetchCategories()
  }

  render( ){
    
    const { currentCategory, categories } = this.props;

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
            <Link to={category.path}>
              {category.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  ...state.categories,
  currentCategory: match.params.category || 'all'
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBar)