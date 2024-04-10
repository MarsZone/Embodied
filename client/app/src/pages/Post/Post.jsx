import React from 'react'
import { Image, NavBar, Toast, Flex, Button, Input, Form } from 'react-vant'
import { useNavigate } from 'react-router-dom'
import TabNavigator from '@/components/TabNavigator/TabNavigator'

const Post = () => {

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const onFinish = values => {
    console.log(values)
  }



  return (

    <div className="layout">

      <NavBar
        className='nav-bar'
        title='发布话题'
        leftText='返回'
        onClickLeft={() => Toast('返回')}
      //rightText={<Edit fontSize={20} />}
      //onClickRight={() => navigate('/userDetail')}
      />

      <div className="container">
        我是发布消息页Post

        <Form
          className='post-form'
          form={form}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType='submit' type='primary' block>
                提交
              </Button>
            </div>
          }
        >

          <Form.Item
            rules={[{ required: true, message: '' }]}
            name='title'
            label='主题'
          >
            <Input placeholder='请输入发布主题' />
          </Form.Item>


        </Form>
      </div>


      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Post