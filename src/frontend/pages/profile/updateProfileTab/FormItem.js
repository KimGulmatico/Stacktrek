import React from 'react'
import { Form } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const Item = props => (
  <FormItem {...props} {...formItemLayout}>
    {props.children}
  </FormItem>
)

export default Item
