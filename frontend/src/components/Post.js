import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import moment from 'moment'
import VoteScore from './VoteScore'

class Post extends Component {
	
	registerVote = (vote) => {
		const { startRegisterVote, id } = this.props;
		
		if(vote !== 'upVote' && vote !== 'downVote') {
			return;
		}

		startRegisterVote(id, vote);
	}	

	render() {

		const {
			title,
			body,
			author,
			category,
			voteScore,
			timestamp
		} = this.props;

		return (
			<li>
				<Card
					bordered
					style={{ width: 600, marginBottom: 15 }}
					actions={[
						<a>Comments</a>
					]}
				>
					<div className='post'>
							<VoteScore voteScore={voteScore} registerVote={this.registerVote}/>
							<div className='post-content'>
								<Row>
									<h2>{title}</h2>
								</Row>
								<Row>
									<p className='post-body'>{body}</p>
								</Row>
								<Row>
									<Col span={12}>
										<span>Author: {author}</span>
									</Col>
									<Col span={12}>
										<span style={{ float: 'right'}}>Category: {category}</span>
									</Col>
								</Row>
								<Row style={{ marginTop: 10}}>
									<span>Posted on: {moment(timestamp).format('LLLL')}</span>
								</Row>
						</div>
					</div>
				</Card>	
			</li>
		)
			
	}
}

export default Post