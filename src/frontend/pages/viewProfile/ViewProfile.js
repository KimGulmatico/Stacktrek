import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col, List } from 'antd'
import moment from 'moment'
import Banner from '../profile/banner/Banner'
import SkillItem from './SkillItem'
import NotificationPopup from '../../components/notificationPopup'
import { getUserDataFromFB } from '../../actions/userActions'
import { fetchFromStackleague } from '../../util/'
import { getSkills } from '../../actions/skillActions'
import { getAttestors } from '../../actions/contractActions'
import { getExperiences } from '../../actions/experienceActions'

class ViewProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      userExists: null,
      skills: [],
      experiences: [],
    }
    this.fetchUser = this.fetchUser.bind(this)
  }

  componentDidMount() {
    this.fetchUser()
    this.fetchSkills()
    this.fetchExperiences()
  }

  componentDidUpdate(prevProps, prevState) {
    const { safeSetState } = this.props
    if (JSON.stringify(this.props.user) !== JSON.stringify(prevProps.user)) {
      safeSetState(() => {
        this.fetchUser()
      })
    }

    if (JSON.stringify(prevState.skills) !== JSON.stringify(this.state.skills)) {
      safeSetState(() => {
        this.fetchSkills()
        this.fetchExperiences()
      })
    }
  }

  async fetchUser() {
    const { params } = this.props.match.params
    const { getUser } = this.props

    if (params.split('&').length > 1) {
      const split = params.split('&')
      if (split[0].includes('=') && split[1].includes('=')) {
        const fbId = split[1].split('=')[1]
        const user = await getUser(fbId)
        if (!user) {
          const res = await fetchFromStackleague(`https://api.stacktrek.com/stacktrek/classes/_User?where={"facebookId":"${fbId}"}`, 'GET')
          const { firstName: firstname, lastName: lastname, school } = res.results[0]
          this.setState({
            user: {
              facebookId: fbId, firstname, lastname, school,
            },
            userExists: false,
          })
        } else {
          this.setState({ user, userExists: true })
        }
      }
    } else {
      const user = await getUser(params)
      this.setState({ user, userExists: true })
    }
  }

  async fetchSkills() {
    const { params } = this.props.match.params
    const user = await this.props.getUser(params)
    if (user) {
      const skills = await this.props.getSkills(user._id)
      this.setState({ skills })
    }
  }

  async fetchExperiences() {
    const { params } = this.props.match.params
    const user = await this.props.getUser(params)
    if (user) {
      const experiences = await this.props.getExperiences(user._id)
      this.setState({ experiences })
    }
  }

  render() {
    const {
      user, userExists, skills, experiences,
    } = this.state
    const { fetchAttestors, contract } = this.props

    return (
      <Fragment>
        <NotificationPopup />
        <Row style={{ marginTop: '2%' }}>
          <Col lg={1} />
          <Col lg={22}>
            <div style={{ marginBottom: '1%' }}>
              {user && <Banner
                user={user}
                userExists={userExists}
              />}
            </div>
            <Card style={{ marginBottom: '1%' }} loading={!user}>
              <div style={{ fontSize: '22px', marginBottom: '1.5%', borderBottom: '1px solid #c4c4c4' }}>Bio</div>
              {user && user.bio && user.bio.trim() ? <div style={{ marginTop: '1%' }}> {user && user.bio} </div> : <List dataSource={[]} />}
            </Card>
            <Card style={{ marginBottom: '1%' }} loading={!user}>
              <div style={{ fontSize: '22px', marginBottom: '1%', borderBottom: '1px solid #c4c4c4' }}>Skills</div>
              {user &&
                <List
                  dataSource={skills}
                  renderItem={skill =>
                    (<SkillItem
                      skill={skill}
                      ethAddress={user && user.ethAddress}
                      fetchAttestors={fetchAttestors}
                      key={skill._id}
                      contract={contract}
                    />)}
                />
              }
            </Card>
            <Card style={{ marginBottom: '1%' }} loading={!user}>
              <div style={{ fontSize: '22px', marginBottom: '1%', borderBottom: '1px solid #c4c4c4' }}>Experience</div>
              {user &&
                <List
                  dataSource={experiences}
                  renderItem={item =>
                    (
                      <div className="holder experience-card">
                        <div>
                          <div className="title">{item.title}</div>
                          <div>{item.company}</div>
                          <div>{moment(new Date(item.start)).format('MMM YYYY')} - {item.present ? 'present' : moment(new Date(item.end)).format('MMM YYYY')}</div>
                        </div>
                      </div>
                    )}
                />
              }
            </Card>
          </Col>
          <Col lg={1} />
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  contract: state.web3.contract,
})

const mapDispatchToProps = dispatch => ({
  getUser: id => dispatch(getUserDataFromFB(id)),
  getSkills: id => dispatch(getSkills(id)),
  getExperiences: id => dispatch(getExperiences(id)),
  fetchAttestors: (ethAddress, skillName) => (dispatch(getAttestors(ethAddress, skillName))),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile)
