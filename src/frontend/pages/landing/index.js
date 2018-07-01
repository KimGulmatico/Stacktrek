import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'antd'
import LoginButton from '../../components/buttons/LoginButton'

const styles = {
  container: {
    height: '100%',
    textAlign: 'center',
  },
}

class Home extends React.Component {
  componentDidMount() {
    // this.getEvents()
  }

  render() {
    const { user } = this.props
    return (
      <div className="home-body" style={styles.container}>
        {!user &&
          <Row
            className="home-banner"
            style={{
              height: '100vh',
            }}
            type="flex"
            align="middle"
            justify="center"
          >
            <Col
              xs={16}
              sm={16}
              lg={12}
              style={{ textAlign: 'center' }}
            >
              <span style={{ fontFamily: 'Impact', color: '#fff' }} className="home-title-size">STACKTREK</span>
              <p style={{ color: '#71A0D4' }} className="home-desc-size">Welcome to the Community for the World's Largest E-Competition for Coders</p>
              <LoginButton icon="facebook" className="home-button" />
              <Button ghost className="home-button">
                <a href="https://stacktrek.com/" rel="noopener noreferrer" target="_blank"> Learn More </a>
              </Button>
            </Col>
          </Row>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(Home)
