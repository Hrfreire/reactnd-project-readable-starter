import React, { Component } from 'react'
import { Card, Row, Col, Icon, Menu, Dropdown } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import VoteScore from './VoteScore'

class Post extends Component {
	
	registerVote = (vote) => {
		const { startRegisterVote, id } = this.props
		
		if(vote !== 'upVote' && vote !== 'downVote') {
			return
		}

		startRegisterVote(id, vote)
	}

	handleMenuClick = ({ key }) => {
		const { id, startDeletePost } = this.props
		
		console.log(key)
		if (key === 'delete') {
			startDeletePost(id)
		}
	}

	renderMenu = () => {
		const options = (
			<Menu onClick={this.handleMenuClick}>
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

	render() {

		const {
			id,
			title,
			body,
			author,
			category,
			voteScore,
			timestamp
		} = this.props

		return (
			<Card
				bordered
				style={{ marginBottom: 15 }}
				bodyStyle={{ width: '600px' }}
				title={
					<Link to={`/posts/details/${id}`}>
						{title}
					</Link>
				}
				extra={this.renderMenu()}
			>
				<div className='post'>
						<VoteScore voteScore={voteScore} registerVote={this.registerVote}/>
						<div className='post-content'>
							<Row>
								<p className='post-body'>{body}</p>
							</Row>
							<Row>
								<Col span={12}>
									<span>Author: {author}</span>
								</Col>
								<Col span={12}>
									<span style={{ float: 'right'}}>
										Category: {' '} 
										<Link to={`/${category}`}>
											{category}
										</Link>
									</span>
								</Col>
							</Row>
							<Row style={{ marginTop: 10}}>
								<span>Posted on: {moment(timestamp).format('LLLL')}</span>
							</Row>
					</div>
				</div>
			</Card>
		)
			
	}
}

export default Post