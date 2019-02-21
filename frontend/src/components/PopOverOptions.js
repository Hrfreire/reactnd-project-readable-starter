import React from 'react';
import { Icon, Menu, Dropdown } from 'antd'
import PropTypes from 'prop-types'

function PopOverOptions ({ handleMenuClick }) {
  const options = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">
        <Icon type="edit" theme="outlined" /> Edit
      </Menu.Item>
      
      <Menu.Item key="delete">
        <Icon type="delete" theme="outlined"/>Delete
      </Menu.Item>
    </Menu>
  )		
  
  return (
    <Dropdown overlay={options} trigger={['click']}>
      <Icon type="ellipsis" theme="outlined"/>
    </Dropdown>
  )
}

PopOverOptions.propTypes = {
  handleMenuClick: PropTypes.func.isRequired
}

export default PopOverOptions;