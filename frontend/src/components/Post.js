import React, { Component } from 'react'
import { Card, Row, Col, Icon } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import VoteScore from './VoteScore'

class Post extends Component {
	
	registerVote = (vote) => {
		const { startRegisterVote, id } = this.props;
		
		console.log('vote!!!!', vote, id);
		if(vote !== 'upVote' && vote !== 'downVote') {
			return;
		}

		startRegisterVote(id, vote);
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
		} = this.props;

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
				extra={<a href="#"><Icon type="ellipsis" theme="outlined"/></a>}
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