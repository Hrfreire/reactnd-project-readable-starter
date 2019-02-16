import React from 'react'
import { Row, Col, Divider, Card } from 'antd'
import moment from 'moment'
import VoteScore from './VoteScore'
import PopOverOptions from './PopOverOptions'

const handleMenuClick = ({ key, id, startDeleteComment }) => {
	
	console.log(key)
	if (key === 'delete') {
		startDeleteComment(id)
	} else {
	//	history.push(`/${category}/${id}/edit`)
	}
}

export default ({
	id,
	voteScore,
	body,
	author,
	timestamp,
	startRegisterCommentVote,
	startDeleteComment
}) => {
  return (
		<Card
			bordered={false}
			bodyStyle={{ padding:0 }}
		>
			<li className='comment'>
				<VoteScore
					voteScore={voteScore}
					registerVote={(vote) => startRegisterCommentVote(id, vote)}
				/>
				<div className='post-content'>
					<Row>
						<Col offset={22} span={2}>
							<PopOverOptions handleMenuClick={({ key }) => {
								handleMenuClick({
									key,
									id,
									startDeleteComment
								})
							}}/>
						</Col>
					</Row>
					<Row>
						<p className='post-body'>{body}</p>
					</Row>
					<Row>
						<Col span={12}>
							<span>Author: {author}</span>
						</Col>
					</Row>
					<Row style={{ marginTop: 10}}>
						<span>Commented on: {moment(timestamp).format('LLLL')}</span>
					</Row>
				</div>
			</li>
			<Divider />
		</Card>
  )
}