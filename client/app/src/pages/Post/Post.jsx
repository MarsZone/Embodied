import React, { useEffect, useState } from 'react'
import { Image, NavBar, Toast, Flex, Button, Input, Form, Picker, Uploader } from 'react-vant'
import { useNavigate } from 'react-router-dom'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import './Post.scoped.scss'
import { createTopicApi, getChannelAPI } from '@/apis/post'
import { getUserId as _getUserId, getUserId } from '@/utils'
import { previewFileApi, uploadFileApi } from '@/apis/file'
import useChannelList from '@/hooks/useChannelList'


const Post = () => {

  const demoData = [
    {
      url: 'https://img.yzcdn.cn/vant/sand.jpg',
      filename: '图片名称',
    },
    {
      url: 'https://img.yzcdn.cn/vant/tree.jpg',
      filename: '图片名称',
    },
  ]

  const [imgId, setImgId] = useState()
  const [imgUrl, setImgUrl] = useState()


  const uploadCoverImg = async (file) => {

    const files = new FormData();
    files.append('files', file);

    const res = await uploadFileApi(files)
      .then(data => {
        setImgId(data.data[0].id)
        console.log('上传图片id：', imgId)
      })

    const getImgUrlRes = await previewFileApi(imgId)
    setImgUrl(getImgUrlRes.data)
    console.log('上传图片url：', imgUrl)

    return { imgUrl }
  }

  const formatData = (urls) => {
    return urls.map(url => ({
      url
    }));
  };



  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = fromValues => {
    const { title, content, channelKey } = fromValues //解构表单数据
    console.log('提交表单数据：', fromValues)
    const reqData = {
      title, //标题
      content, //内容
      channelKey, //频道
      autherUid: getUserId, //作者UID
      coverImg: imgId, //封面图片id
      contentType: 'common', //内容类型（默认common）
    }
    //调用接口提交
    createTopicApi(reqData)
  }

  //获取频道列表
  const { channelList, loading } = useChannelList()
  console.log(channelList)

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
              columns={channelList.map(item => ({
                key: item.id,
                text: item.name,
                value: item.key
              }))}
              onChange={(val, selectRow, index) => {
                console.log('选中项: ', val, selectRow, index)
              }}
            >
              {val => val || '请选择频道'}
            </Picker>
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: '' }]}
            name='content'
            label='内容'>
            <Input.TextArea rows={3} autoSize maxLength={140} showWordLimit />
          </Form.Item>

          <Form.Item
            label='上传图片'
            name='coverImg'
          >
            <Uploader
              upload={uploadCoverImg}
              maxCount={1}
              // onChange={onChangeImg}
              accept='*' />

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