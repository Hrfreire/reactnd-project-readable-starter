import React from "react"
import { Icon } from 'antd'

export default ({ voteScore, registerVote }) => (
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
