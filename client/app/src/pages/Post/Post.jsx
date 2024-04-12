import React, { useEffect, useState } from 'react'
import { Image, NavBar, Toast, Flex, Button, Input, Form, Picker } from 'react-vant'
import { useNavigate } from 'react-router-dom'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import './Post.scss'
import { getChannelAPI } from '@/apis/post'

const Post = () => {

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const onFinish = values => {
    console.log(values)
  }

  //获取频道列表
  const [channalList, setChennalList] = useState([])
  useEffect(() => {
    //1.封装函数，在函数体内调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChennalList(res.data)
    }
    //2.调用函数
    getChannelList()
  }, [])

  console.log(channalList)

  return (
    <div className="layout">
      <NavBar
        className='nav-bar'
        fixed='true'
        placeholder='true'
        title='发布话题'
        leftText='返回'
        onClickLeft={() => Toast('返回')}
      />

      <div className="container">
        <Form
          className='post-form'
          form={form}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType='submit' type='primary' block>
                发布
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

          <Form.Item
            rules={[{ required: true, message: '' }]}
            name='channelKey'
            label='频道选择'
            trigger='onConfirm'
            onClick={(_, action) => {
              action.current?.open()
            }}
          >
            <Picker
              popup
              columns={channalList.map(item => ({ key: item.id, text: item.name, value: item.key }))}
              onChange={(val, selectRow, index) => {
                console.log('选中项: ', val, selectRow, index)
              }}
            >
              {val => val || '请选择频道'}
            </Picker>
          </Form.Item>

          <Form.Item
            name='content'
            label='内容'>
            <Input.TextArea rows={3} autoSize maxLength={140} showWordLimit />
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