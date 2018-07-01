import React, { Component } from 'react'
import { Modal, message, Form, Input, Checkbox, Icon } from 'antd'
import moment from 'moment'
import Dropzone from 'react-dropzone'
import ipfs from '../../../util/connectIPFS';

const FormItem = Form.Item

class AddCertificate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      present: false,
      certificate: {},
      files: [],
      ipfsHash: '' 
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.handleUploadIpfs = this.handleUploadIpfs.bind(this)
  }

  handleSubmit() {
    const { title, start, end } = this.state.experience
    if (start < end) {
      if (title) {
        this.props.addWorkExperience(this.state.experience)
        this.props.onOk()
        this.setState({ experience: { start: new Date(), end: new Date() } })
      } else {
        message.error('No title')
      }
    } else {
      message.error('You cannot end before starting')
    }
  }

  handleChange(e) {
    const { certificate } = this.state
    certificate[e.target.name] = e.target.value
  }

  onDrop(file) {
    this.setState({
      files: file
    });
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file[0])
    reader.onloadend = () => this.handleUploadIpfs(reader.result)  
  }


  async handleUploadIpfs(file) {
    const buffer = await Buffer.from(file)
    await ipfs.add(buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        this.setState({ ipfsHash:ipfsHash[0].hash });
    })

  }

  async handleSubmit(){
    await ipfs.pin.add(this.state.ipfsHash, (err) => {
        if(err){
         console.log(err);
        }
        else{
            console.log("hash pinned");
        }
     })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props

    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.onCancel}
        title="Add a certificate"
        destroyOnClose
      >
        <Form>
          <FormItem label="Name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input name!' }],
              initialValue: '',
            })(<Input name="name" onChange={this.handleChange} />)
            }
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input description!' }],
              initialValue: '',
            })(<Input name="description" onChange={this.handleChange} />)
            }
          </FormItem>
          <FormItem label="Hash">
            <Input name="hash" value={this.state.ipfsHash} />
          </FormItem>
          <Dropzone onDrop={this.onDrop} style={{width: '100%', 'backgroundColor': '#f5f5f5', 'borderWidth': '0.5px', 'borderColor': 'gray', 'borderStyle': 'dashed', 'borderRadius': '5px'}}>
            <div align="center" style={{padding: '20px'}}>
                <p className="ant-upload-drag-icon">
                <Icon type="inbox" style={{color: '#1890ff', fontSize: 45}}/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </div>
          </Dropzone>
          <br/>
            {
              this.state.files.map(f => <span key={f.name}><i className="anticon anticon-paper-clip"></i><span className="ant-upload-list-item-name" title="juice.jpg">{f.name} - {f.size} bytes</span></span>)
            }
        </Form>
      </Modal>
    )
  }
}

const FormWrapper = Form.create()(AddCertificate)
export default FormWrapper
