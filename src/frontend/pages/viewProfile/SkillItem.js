import React from 'react'
import { Row, Col } from 'antd'
import Skill from '../../components/skillItem/Skill'

class SkillItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attestors: null,
    }

    this.getAttestors = this.getAttestors.bind(this)
  }

  async componentDidMount() {
    this.getAttestors()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.contract !== this.props.contract) {
      this.getAttestors()
    }
  }

  async getAttestors() {
    const { fetchAttestors, skill, ethAddress } = this.props
    const attestors = await fetchAttestors(ethAddress, skill.name)
    this.setState({ attestors })
  }

  render() {
    const { skill } = this.props
    const { attestors } = this.state
    return (
      <div>
        <Row style={{ width: '100%', margin: '1%' }}>
          <Col lg={24}>
            {
              attestors && <Skill skill={skill} attestors={attestors} />
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default SkillItem
