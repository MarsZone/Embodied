import React, { useEffect, useState } from 'react'
import { Image, NavBar, Toast, Popover, Button, Input, Form, Picker, Uploader, Tag, Field } from 'react-vant'
import { Plus } from '@react-vant/icons';
import { useNavigate } from 'react-router-dom'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import './Post.scoped.scss'
import { createTopicApi } from '@/apis/post'
import { getUserId as _getUserId, getUserId } from '@/utils'
import { previewFileApi, uploadFileApi } from '@/apis/file'
import useChannelList from '@/hooks/useChannelList'


const Post = () => {

  //获取频道列表
  const { channelList, loading } = useChannelList()
  console.log('频道列表：', channelList)
  const [selectChannel, setSelectChannel] = useState()
  const [selectChannelName, setSelectChannelName] = React.useState();

  // useEffect(() => {
  //   setSelectChannel(channelList[0].key)
  //   setSelectChannelName(channelList[0].name)
  // }, [])

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [coverImgId, setCoverImgId] = useState()
  const [coverImgUrl, setCoverImgUrl] = useState()

  const uploadCoverImg = async (files) => {

    const uploadRes = await uploadFileApi(files)
    console.log('上传文件：', files)
    console.log('上传文件返回：', uploadRes.data[0].id)
    //上传图片的id
    setCoverImgId(uploadRes.data[0].id) //只有一张图片，索引为0

    const previewRes = await previewFileApi(uploadRes.data[0].id)
    //上传图片的url
    setCoverImgUrl(previewRes.data)

    return { coverImgUrl }
  }

  const onFinish = async formValues => {
    const { title, content, selectChannel, coverImgId } = formValues //解构表单数据
    const submitData = {
      topic: {
        title, //标题
        content, //内容
        channelKey: selectChannel, //频道
        autherUid: getUserId, //作者UID
        coverImg: coverImgId, //封面图片id
        contentType: 'common', //内容类型（默认common）
      },
      tags
    }
    //调用接口提交
    console.log('提交表单数据：', submitData)
    const res = await createTopicApi(submitData)
    console.log('提交表单的返回：', res)
  }

  //测试标签
  const [showAddTag, setShowAddTag] = React.useState(true);
  const selectChannel2 = (action) => {
    Toast.info(action.text)
    setSelectChannel(action.className)
    setSelectChannelName(action.text)
  }



  //标签
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const onCloseTab = (tag) => {
    const filteredTags = tags.filter(item => item !== tag)
    console.log(filteredTags)
    setTags(filteredTags)
  }
  const onClickAddTag = () => {
    setTags([...tags, newTag])
  }

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
            <div className='post-button' style={{ margin: '16px 16px 0' }}>
              <Button round nativeType='submit' type='primary' block>
                存草稿
              </Button>
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
            // name='channelKey'
            label='频道选择'
            trigger='onConfirm'
            onClick={(_, action) => {
              action.current?.open()
            }}
          >
            <Picker
              popup
              value={selectChannel}
              columns={channelList.map(item => ({
                key: item.key,
                text: item.name,
                value: item.name,
              }))}
              onChange={(val, selectRow, index) => {
                console.log('选中项: ', selectRow)
                Toast.info(`选中值${val}，索引: ${index}，key: ${selectRow.key}`)
              }}
              onConfirm={(val, selectRow, index) => {
                setSelectChannel(selectRow.key)
              }}
            >
              {val => val || '广场'}
            </Picker>

          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: '' }]}
            name='content'
            label='内容'>
            <Input.TextArea rows={3} autoSize maxLength={140} showWordLimit />
          </Form.Item>

          <Form.Item
            name='tag'
            label='标签'
          >
            <div className='form-tag-item'>
              <div className='post-tag-box'>
                {tags.map(item => (
                  <Tag
                    plain
                    closeable
                    size="medium"
                    type="primary"
                    onClose={() => onCloseTab(item)}
                  >
                    {item}
                  </Tag>
                ))}


                <Tag
                  show={showAddTag}
                  plain
                  size="medium"
                  type="primary"
                  onClick={() => setShowAddTag(false)}
                >
                  <Plus />add tag
                </Tag>
              </div>

              <div className='post-tag-input'>
                {showAddTag === true ? (
                  <div></div>
                ) : (
                  <Input
                    suffix={
                      <div>
                        <Button size="small" type="primary" onClick={onClickAddTag}>add tag</Button>
                        <Button size="small" type="primary" onClick={() => setShowAddTag(true)}>cancel</Button>
                      </div>
                    }
                    placeholder="请输入tag名称~~"
                    value={newTag}
                    onChange={setNewTag}
                  />)}
              </div>
            </div>
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

        {/* <Popover
          actions={channelList.map(item => ({
            text: item.name,
            className: item.key,
          }))}
          theme="dark"
          onSelect={selectChannel2}
          reference={<Button type="primary">{selectChannelName}</Button>}
        /> */}
      </div>

      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Post