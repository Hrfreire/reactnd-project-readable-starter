import React from "react"
import { Icon } from 'antd'
import PropTypes from 'prop-types'

function VoteScore ({ voteScore, registerVote }) {
  return (
  <div className='vote-score'>
    <button onClick={() => registerVote('upVote')} className="vote-score-button">
      <Icon type="caret-up" theme="filled" />
    </button>
    {voteScore}
    <button onClick={() => registerVote('downVote')} className="vote-score-button">
      <Icon type="caret-down" theme="filled" />
    </button>
  </div>
  )
}

VoteScore.propTypes = {
  voteScore: PropTypes.number.isRequired,
  registerVote: PropTypes.func.isRequired
}

export default VoteScore