import React from 'react'
import { connect } from 'react-redux'
import { fetchEvents as fetchEventsFunc } from '../../../actions/eventActions'
import EventsList from './Events'

class Events extends React.Component {
  componentDidMount() {
    const { fetchEvents } = this.props
    fetchEvents()
  }

  render() {
    const { events } = this.props

    return (
      <EventsList events={events} />
    )
  }
}

const mapStateToProps = state => ({
  events: state.event,
})

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEventsFunc()),
})

const EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events)

export default EventsContainer
