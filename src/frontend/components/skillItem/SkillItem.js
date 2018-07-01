import React, { Component } from 'react'
import { Button, Row, Col } from 'antd'
import Skill from './Skill'

class SkillItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endorser: JSON.stringify(props.network[0]),
      filteredNetwork: null,
      attestors: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.getAttestors = this.getAttestors.bind(this)
  }

  componentDidMount() {
    this.getAttestors()
  }

  componentDidUpdate(prevProps, prevState) {
    const { safeSetState } = prevProps
    if (this.props.network && (prevProps.network !== this.props.network)) {
      safeSetState(() => this.getEndorser())
      safeSetState(() => this.getFilteredNetwork())
    } else if (this.state.attestors !== prevState.attestors) {
      safeSetState(() => this.getFilteredNetwork())
    }
  }

  getEndorser() {
    if (this.props.network) {
      this.setState({ endorser: JSON.stringify(this.props.network[0]) })
    }
  }

  async getFilteredNetwork() {
    const { attestors: attestorsFromState } = this.state
    const attestors = attestorsFromState || []
    const { network } = this.props
    const filteredNetwork = network.filter(a => !attestors.includes(a.ethAddress))
    this.setState({
      filteredNetwork,
    })
  }

  async getAttestors() {
    const { skill, fetchAttestors, ethAddress } = this.props
    const attestors = await fetchAttestors(ethAddress, skill.name)
    this.setState({ attestors })
  }

  handleChange(e) {
    this.setState({ endorser: e.target.value })
  }

  render() {
    const { skill, onEndorse } = this.props
    const { filteredNetwork, attestors } = this.state
    return (
      <div>
        <Row style={{ width: '100%', margin: '1%' }}>
          <Col lg={24}>
            <Skill skill={skill} attestors={attestors} />
          </Col>
          <Col lg={24}>
            {filteredNetwork && filteredNetwork.length !== 0 ? (
              <div>
                <select onChange={this.handleChange}>
                  {filteredNetwork.map(user => <option value={JSON.stringify(user)} key={user._id}>{`${user.firstname}`}</option>)}
                </select>
                <Button onClick={() => onEndorse(this.state.endorser, skill)} style={{ margin: '0px 5px' }}>
                  Endorse
                </Button>
              </div>
            ) : ''}
          </Col>
        </Row>
      </div>
    )
  }
}


export default SkillItem
