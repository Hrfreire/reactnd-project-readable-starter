import React, { Component } from 'react'
import { Card } from 'antd'

class Post extends Component {
    
	render() {
		return (
			<li>
					<Card
						hoverable
						bordered
						style={{ width: 240 }}
					>
						<Card.Meta
							title="Title"
							description="description"
						/>
					</Card>	
			</li>
		)
			
	}
}

export default Post