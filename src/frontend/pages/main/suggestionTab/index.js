import React from 'react'
import { connect } from 'react-redux'
import { Divider } from 'antd'
import SuggestionTab from '../suggestionTab/SuggestionTab'
import promisify from '../../../components/promisify'
import { sendConnectRequest } from '../../../actions/userActions'

const SuggestionTabContainer = ({
  networkConnections, user, connectToUser,
}) =>
  (
    <div className="container padded-holder">
      <Divider> People You May Know </Divider>
      <div style={{ overflow: 'auto', height: '75vh' }} >
        {
          networkConnections &&
          promisify(SuggestionTab)({ networkConnections, user, connectToUser })
        }
      </div>
    </div>
  )

const mapStateToProps = state => ({
  user: state.user.user,
  networkConnections: state.user.networkConnections,
})

const mapDispatchToProps = dispatch => ({
  connectToUser: (senderId, name, recipientId, senderFBID, recipientFBID) => dispatch(sendConnectRequest(senderId, name, recipientId, senderFBID, recipientFBID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionTabContainer)
