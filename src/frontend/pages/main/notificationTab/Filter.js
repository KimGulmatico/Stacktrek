import React from 'react'
import { withRouter } from 'react-router-dom'
import { Checkbox } from 'antd'

const CheckboxGroup = Checkbox.Group
const options = ['Connections', 'Attestations']

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedList: this.getOptionsFromUrl(this.props.location.search),
    }

    this.onChange = this.onChange.bind(this)
    this.changeUrl = this.changeUrl.bind(this)
    this.getOptionsFromUrl = this.getOptionsFromUrl.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.setState({ checkedList: this.getOptionsFromUrl(nextProps.location.search) })
    }
  }

  onChange(e) {
    this.setState({ checkedList: e })
    this.changeUrl(e)
  }

  getOptionsFromUrl(url) {
    const { parseUrlFilter } = this.props
    const parsed = parseUrlFilter(url)

    if (parsed === 'connections') {
      return ['Connections']
    } else if (parsed === 'attestations') {
      return ['Attestations']
    } else if (parsed === 'none') {
      return []
    } else if (!parsed) {
      return options
    }
    return null
  }

  changeUrl(e) {
    const { history } = this.props
    const urlString = e.reduce((acc, val, index) => {
      if (index === e.length - 1) {
        acc += val
      } else {
        acc += `${val},`
      }
      return acc
    }, '').toLowerCase()

    if (e.length === 0) {
      history.push('?include=none')
    } else if (e.length === 2) {
      history.push('')
    } else {
      history.push(`?include=${urlString}`)
    }
  }

  render() {
    return (
      <div style={{
        width: '100%', height: '40px', display: 'flex', justifyContent: 'flex-end', padding: '0px 5px',
      }}
      >
        <CheckboxGroup options={options} value={this.state.checkedList} onChange={this.onChange} />
      </div>
    )
  }
}

export default withRouter(Filter)
