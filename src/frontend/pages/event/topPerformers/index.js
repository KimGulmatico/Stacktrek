import React, { Component } from 'react'
import { Row } from 'antd'
import { connect } from 'react-redux'
import TopDevs from './TopDevs'
import { fetchTopPerformers } from '../../../actions/performerActions'

class TopPerformers extends Component {
  componentDidMount() {
    const { fetchPerformers } = this.props
    fetchPerformers(3)
  }

  render() {
    const { devs } = this.props
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ background: 'rgb(200, 208, 214)', width: '100%' }}
      >
        {/* <Col
          xs={24}
          sm={24}
          lg={24}
          style={{ width: '82vw', margin: 'auto' }}
        > */}
        {devs && <TopDevs devs={devs} />}
        {/* </Col> */}
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  devs: state.performer.devs,
})

const mapDispatchToProps = dispatch => ({
  fetchPerformers: count => dispatch(fetchTopPerformers(count)),
})

const TopPerformersContainer = connect(mapStateToProps, mapDispatchToProps)(TopPerformers)

export default TopPerformersContainer
