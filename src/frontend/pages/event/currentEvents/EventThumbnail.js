import React from 'react'
import { Icon } from 'antd'

// placeholder image
import placeholder from '../../../../../public/img/stackleague_logo_stacktrek_flat_1024.png'

const EventThumbnail = ({ event }) => {
  const from = new Date(event.from.iso).toLocaleDateString()
  const to = new Date(event.to.iso).toLocaleDateString()
  return (
    <div className="current-events-thumbnails">
      <div className="thumb-media" >
        <img src={placeholder} alt={event.Event.name} />
      </div>
      <div>
        <div className="thumb-media-mobile" >
          <img src={placeholder} alt={event.Event.name} />
          <span>{`${event.Event.name.toUpperCase()} ${event.title.toUpperCase()}`}</span>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'flex-start',
          // fontSize: '1em',
          color: '#115192',
        }}
        >
          <a className="event-web-link" href={`https://stackleague.com/event/${event.objectId}/${event.Event.objectId}`} target="_blank">
            Website Link {' '}
            <Icon type="link" />
          </a>
          <span className="event-sched-text"> {from} to {to} </span>
          <span className="event-participant-text"> Participants: </span>
        </div>
      </div>
    </div>
  )
}

export default EventThumbnail
