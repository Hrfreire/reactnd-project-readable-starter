import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
import VoteScore from './VoteScore'
import PopOverOptions from './PopOverOptions'

class Post extends Component {
	
	registerVote = (vote) => {
		const { startRegisterVote, id } = this.props
		
		if(vote !== 'upVote' && vote !== 'downVote') {
			return
		}

		startRegisterVote(id, vote)
	}

	handleMenuClick = ({ key }) => {
		const { id, category, startDeletePost, history } = this.props
		
		console.log(key)
		if (key === 'delete') {
			startDeletePost(id)
		} else {
			history.push(`/${category}/${id}/edit`)
		}
	}

	render() {

		const {
			id,
			title,
			body,
			author,
			category,
			voteScore,
			timestamp,
			commentCount
		} = this.props

		return (
			<Row style={{width:'100%'}}>
				<Col span={12} offset={6}>
					<Card
						bordered
						style={{ marginBottom: 15 }}
						bodyStyle={{ width: '100%' }}
						title={
							<Link to={`/${category}/${id}`}>
								{title}
							</Link>
						}
						extra={<PopOverOptions handleMenuClick={(e) =>this.handleMenuClick(e)}/>}
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
									<Col span={24}>
										<span>Posted on: {moment(timestamp).format('LLLL')}</span>
									</Col>
								</Row>
								<Row style={{ marginTop: 10}}>
									<Col span={24}>
										<span>{commentCount} comment{commentCount > 1 && 's'}</span>
									</Col>
								</Row>
							</div>
						</div>
					</Card>
				</Col>
			</Row>
		)
			
	}
}

export default withRouter(Post)