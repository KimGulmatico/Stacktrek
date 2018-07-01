import React from 'react'
import { connect } from 'react-redux'
import { Divider } from 'antd'
import NotificationTab from './NotificationTab'
import Filter from './Filter'
import promisify from '../../../components/promisify'
import { approveConnection, rejectConnection, setUserRequestsReceived } from '../../../actions/userActions'
import { endorseSkill as endorseSkillFunc, endorseExperience as endorseExperienceFunc } from '../../../actions/contractActions'

const NotificationTabContainer = ({
  user, handleApprove, handleReject, setRequestsReceived,
  location, parseUrlFilter, requests, endorseSkill, endorseExperience,
}) => (
  <div className="container padded-holder">
    <Divider>Notifications</Divider>
    <Filter parseUrlFilter={parseUrlFilter} location={location} />
    {
      requests &&
        promisify(NotificationTab)({
          requests,
          user,
          location,
          handleApprove,
          handleReject,
          setRequestsReceived,
          endorseSkill,
          endorseExperience,
        })
    }
  </div>
)

const mapStateToProps = state => ({
  user: state.user.user,
  requests: state.user.requestsReceived,
})

const mapDispatchToProps = dispatch => ({
  endorseSkill: (endorseeAddress, skillName, requestId) => dispatch(endorseSkillFunc(endorseeAddress, skillName, requestId)),
  endorseExperience: (endorseeAddress, title, company, dateFrom, dateTo) => dispatch(endorseExperienceFunc(endorseeAddress, title, company, dateFrom, dateTo)),
  handleApprove: requestId => dispatch(approveConnection(requestId)),
  handleReject: requestId => dispatch(rejectConnection(requestId)),
  setRequestsReceived: (requests, filter) => dispatch(setUserRequestsReceived(requests, filter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationTabContainer)
