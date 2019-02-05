import React, { Fragment } from 'react'
import { Row, Col, Divider } from 'antd'
import moment from 'moment'
import VoteScore from './VoteScore'

export default ({ id, voteScore, body, author, timestamp, startRegisterCommentVote }) => {
  return (
		<Fragment>
			<li className='comment'>
				<VoteScore
					voteScore={voteScore}
					registerVote={(vote) => startRegisterCommentVote(id, vote)}
				/>
				<div className='post-content'>
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
		</Fragment>
  )
}