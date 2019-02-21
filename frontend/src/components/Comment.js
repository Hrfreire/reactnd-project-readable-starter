import React, { Component, Fragment } from 'react'
import { Row, Col, Divider, Card } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import VoteScore from './VoteScore'
import PopOverOptions from './PopOverOptions'
import EditCommentModal from './EditCommentModal'

class Comment extends Component {
	
	state = {
		showEditModal: false
	}

	handleMenuClick = ({ key }) => {
		const { startDeleteComment, id } = this.props
		
		if (key === 'delete') {
			startDeleteComment(id)
		} else {
			this.setState({
				showEditModal: true
			})
		}
	}

	sendEdit = (body) => {
		const { id, startEditComment } = this.props

		this.setState({
			showEditModal: false
		})

		startEditComment({ id, body })

	}
	
	render() {
		
		const {
			id,
			voteScore,
			body,
			author,
			timestamp,
			startRegisterCommentVote
		} = this.props

		const { showEditModal } = this.state

		return (
			<Fragment>
				<EditCommentModal
					visible={showEditModal}
					sendEdit={this.sendEdit}
					author={author}
					body={body}
				/>

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
									<PopOverOptions handleMenuClick={this.handleMenuClick}/>
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
			</Fragment>
		)
	}
}

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	voteScore: PropTypes.number.isRequired,
	body: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	timestamp: PropTypes.number.isRequired,
	startRegisterCommentVote: PropTypes.func.isRequired,
	startDeleteComment: PropTypes.func.isRequired,
	startEditComment: PropTypes.func.isRequired
}

export default Comment