import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import CurrentEvents from './currentEvents'
import TopPerformers from './topPerformers'

const styles = {
  container: {
    height: '100%',
  },
  button: {
    fontSize: '16px',
    margin: '0 7px',
  },
}

class Home extends React.Component {
  componentDidMount() {
    // this.getEvents()
  }

  render() {
    return (
      <div className="home-body" style={styles.container}>
        <CurrentEvents />
        <div style={{ width: '100vw' }}>
          <TopPerformers />
        </div>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'center',
              background: '#115192',
              fontSize: '2em',
              color: '#fff',
              margin: 0,
              padding: '35px 0',
            }}
          >
            SIGN UP, CODE, WIN
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(Home)
