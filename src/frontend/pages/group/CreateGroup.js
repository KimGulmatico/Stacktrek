import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps, Button, Input, Select, Upload, Icon, Modal } from 'antd'
import client from '../../client'
import { updateUserData } from '../../actions/userActions'

const { Step } = Steps
const InputGroup = Input.Group
const { Option } = Select

const styles = {
  body: {
    paddingTop: '64px',
  },
  note: {
    padding: '12px 16px',
    backgroundColor: 'grey',
  },
  head: {
    color: 'blue',
    fontSize: '16px',
    fontWeight: 'bold',
  },
}

class CreateGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      type: "school",
      name: "",
      email: "",
      image: "",
      previewVisible: false,
    previewImage: '',
    fileList: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }
  handleCancel(){
    this.setState({ previewVisible: false })
  }
  handlePreview(file){
    console.log(file);
    
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true,
    });
  }
  handleUpload({ fileList }) {
    this.setState({ fileList })
  }

  next() {
    const current = this.state.current + 1
    this.setState({ current })
  }
  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }

  handleType(target) {
		this.setState({
			type: target.key
    });
  }
  
  handleChange({ target }) {
		this.setState({
			[target.name]: target.value
		});
  }
  
  async createGroup(){    
    const { updateUser, userId } = this.props    
    const group = {
      type: this.state.type,
      name: this.state.name,
      email: this.state.email,
      admins: [userId],
      members: [userId],
      isPrivate: false,
      // image: this.state.image
    }
    let user = {...this.props.user}
    let groupService = await client.service('api/groups')
    try {
      let createdGroup = await groupService.create(group)
      if(user.groups){
        user.groups.push({"id":createdGroup._id,"type":createdGroup.type})
      } else {
        user["groups"] = [{"id":createdGroup._id,"type":createdGroup.type}]     
      }
      updateUser(userId, user)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { current, previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div style={styles.body}>
        <div style={styles.head}>+Create Group</div>
        <Steps direction="vertical" current={current}>
          <Step
            title="Group Type"
            description={current === 0 &&
            <div>
              <InputGroup>
                <Select labelInValue onChange={this.handleType} defaultValue={{key: "School Group"}}>
                  <Option key="type" value="school">School Group</Option>
                  <Option key="type" value="company">Company Group</Option>
                  <Option key="type" value="personal">Personal Group</Option>
                </Select>
              </InputGroup>
            </div>
            }
          />
          <Step
            title="Basic Info"
            description={current === 1 &&
            <div>
                <Input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Group Name" />
                <Input name="email" value={this.state.email} onChange={this.handleChange} style={{ width: '50%' }}placeholder="email" />
              {/* <div style={styles.note}>
                Verify that you are the head of this faculty by uploading a photo of your faculty ID
              </div> */}
              {/* <div className="clearfix">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleUpload}
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div> */}
            </div>
            }
          />
          <Step
            title="Finished"
            description={current === 2 &&
            <div>
              <div>DONE</div>
              <div>almost</div>
              <div>
                Your group will be submitted after clicking Finish and will go through approval from the admins
              </div>
            </div>
            }
          />
        </Steps>
        <div className="steps-action">
          {
            this.state.current < 2
                &&
                <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === 2
                &&
                <Button type="primary" onClick={this.createGroup}>FINISH</Button>
          }
          {
            this.state.current > 0
                &&
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user._id,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  updateUser: (id, data) => dispatch(updateUserData(id, data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)
