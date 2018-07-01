import React from 'react'
import { Row, Col } from 'antd'
import uuidv4 from 'uuid/v4'
import stackleague from '../../../../../public/img/stackleague_logo_stacktrek_flat_1024.png'
import EventThumbnail from './EventThumbnail'

const CurrentEvents = (props) => {
  const { events } = props
  const getThumbs = () => events.map((event) => {
    if (event.resultsFilename) {
      return <EventThumbnail key={uuidv4()} event={event} />
    }
    return <div key={uuidv4()} />
  })
  return (
    <div style={{ padding: '16px' }}>
      <Row
        justify="center"
        align="center"
        type="flex"
      >
        <Col
          xs={20}
          md={20}
          lg={10}
          style={{ textAlign: 'center' }}
        >
          <img src={stackleague} width="60%" alt="" />
        </Col>
      </Row>
      <div className="current-events-thumbnails-container">
        {(events && events.length > 0) ? getThumbs() : 'No events'}
      </div>
    </div>
  )
}

export default CurrentEvents
