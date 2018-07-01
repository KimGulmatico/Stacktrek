import React, { Component } from 'react'
import client from '../../../client'

import { Button, Switch, Icon, Input } from 'antd';

const { TextArea } = Input;

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  switch:{
    float: 'right',
    width: '30%',
    padding: '10px',
  }
}

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.group,
      isPrivate: props.group.isPrivate
    }
    this.onChange = this.onChange.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onChange(checked) {
    this.setState({isPrivate:checked})
    console.log(`switch to ${checked}`);
  }

  handleChange({ target }) {
		this.setState({
			[target.name]: target.value
		});
  }
  
  async saveEdit(){    
    const group = {
      ...this.state
    }
    delete group._id
    let groupService = await client.service('api/groups')
    try {
      await groupService.patch(this.state._id,group)
      console.log('====================================');
      console.log('patched');
      console.log('====================================');
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <div>
          <div>Group Name</div>
           <Input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Group Name" />          
        </div>
        <div style={styles.switch}>
          <div style={{fontSize:'10px'}}>Private: </div>
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
            defaultChecked={this.state.isPrivate}
            onChange={this.onChange}
          />
        </div>
        <div style={{width:"80%"}}>
          <div>About</div>
           <TextArea name="about" value={this.state.about} onChange={this.handleChange} placeholder="About" autosize />          
        </div>
        <Button type="primary" onClick={this.saveEdit}>SAVE</Button>        
      </div>
    )
  }
}
