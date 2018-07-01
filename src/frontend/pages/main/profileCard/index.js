import React, { Fragment } from 'react'
import uuidv4 from 'uuid/v4'
import { Card, Button, Icon, Badge } from 'antd'
import ProfilePicture from '../../../components/profilePicture'

const ProfileCard = ({
  networkConnections, requestsReceivedLength, isFetching, setDisplayView,
}) =>
  (
    <Fragment>
      <Card className="hide-on-mobile main-connection" loading={isFetching}>
        <div>Your connections</div>
        <div style={{ fontSize: '40px' }}>{!isFetching && networkConnections ? networkConnections.length : 0}</div>
        <Button className="main-button" onClick={() => { setDisplayView(0) }}>View All</Button>
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          {(networkConnections) && networkConnections.slice(0, 4).map((connection, index) =>
            (<ProfilePicture
              facebookId={connection.facebookId}
              width="36px"
              height="36px"
              key={uuidv4()}
              style={{ marginRight: '-8px', zIndex: `${4 - index}`, border: '1px solid white' }}
            />))}
        </div>
      </Card>
      <Card className="main-tab">
        <Button className="text-left show-on-mobile main-button" onClick={() => { setDisplayView(0) }}>
          <Icon type="share-alt" />
          <span>View All Connections</span>
        </Button>
        <a href="/#/profile">
          <Button className="text-left main-button" onClick={() => { }}>
            <Icon type="profile" />
            <span> Your Profile </span>
          </Button>
        </a>
        <Button className="text-left main-button" onClick={() => { setDisplayView(1) }}>
          <Icon type="notification" />
          <span> Notifications </span>
          <Badge
            count={requestsReceivedLength}
            style={{
              backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', marginLeft: '3px',
            }}
          />
        </Button>
        <Button className="text-left main-button" onClick={() => { setDisplayView(3) }}>
          <Icon type="usergroup-add" />
          <span> Find Connections </span>
        </Button>
      </Card>
    </Fragment>
  )

export default ProfileCard
