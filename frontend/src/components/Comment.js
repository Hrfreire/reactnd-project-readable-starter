import React from 'react'
import { Row, Col } from 'antd'
import moment from 'moment'
import VoteScore from './VoteScore'

export default ({ id, voteScore, title, body, author, timestamp, startRegisterCommentVote }) => {
  return (
    <li>
      <VoteScore voteScore={voteScore} registerVote={(vote) => startRegisterCommentVote(id, vote)}/>
						<div className='post-content'>
							<Row>
                <h3>{title}</h3>
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
								<span>Posted on: {moment(timestamp).format('LLLL')}</span>
							</Row>
					</div>
    </li>
  )
}