import React from 'react'
import { Button, Card } from 'antd'
import ProfilePicture from '../profilePicture'
import { inherits } from 'util'

const styles = {
  image: {
    width: '150px',
    height: '150px',
  },
  card: {
    width: '100%',
    height: '283px',
  },
  button: {
    width: '100%',
    border: 'none',
    position: 'absolute',
    bottom: '0',
    left: '0',
    borderRadius: '0',
  },
  name: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontSize: '13px',
  },
}

class SuggestedUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      requestStatus: null,
    }
    this.connectToUser = this.connectToUser.bind(this)
  }

  async connectToUser(userId) {
    const { connectToUser } = this.props
    this.setState({ requestStatus: 'SENDING' })
    try {
      await connectToUser(userId)
      this.setState({ requestStatus: 'SUCCESS' })
    } catch (e) {
      this.setState({ requestStatus: 'FAILED' })
    }
  }

  render() {
    const {
      suggestion, requestedUsers, userId, networkConnections,
      loading,
    } = this.props
    const { requestStatus } = this.state
    const requested = requestedUsers && requestedUsers.includes(suggestion._id)
    const connected = networkConnections && networkConnections.includes(suggestion._id)

    let status = 'Connect'

    if (requestStatus === 'FAILED') {
      status = 'Failed'
    } else if (requestStatus === 'SUCCESS' || requested) {
      status = 'Sent'
    } else if (requestStatus === 'SENDING') {
      status = 'Sending'
    } else if (suggestion._id === userId) {
      status = 'You'
    } else if (connected) {
      status = 'Connected'
    }

    return (
      <div style={{ margin: '0 0 5% 0' }} className="suggested-user">
        <Card style={styles.card} loading={loading}>
          <a href={`/#/user/${suggestion.facebookId}`} style={{ color: 'inherit' }}>
            <div style={{ marginBottom: '40px', paddingLeft: '5px', paddingRight: '5px' }}>
              <ProfilePicture facebookId={suggestion.facebookId} width="125px" height="125px" />
              <div className="clip" style={styles.name}>
                {suggestion.firstname} {suggestion.lastname}
                {(!suggestion.firstname && !suggestion.lastname) && 'A man has no name'}
              </div>
              <div style={styles.description}>{suggestion.company ? suggestion.company : (suggestion.school && suggestion.school)}</div>
            </div>
          </a>
          <Button
            style={styles.button}
            type="primary"
            onClick={() => { this.connectToUser(suggestion._id) }}
            loading={requestStatus === 'SENDING'}
            disabled={requestStatus === 'SUCCESS' || requested || suggestion._id === userId || connected}
          >
            {status}
          </Button>
        </Card>
      </div>
    )
  }
}

export default SuggestedUser
