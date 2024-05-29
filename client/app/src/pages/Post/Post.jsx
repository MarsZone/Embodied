import React, { useState } from 'react'
import { NavBar, Toast, Popover, Button, Input, Uploader, Tag} from 'react-vant'
import { Plus } from '@react-vant/icons';
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import './Post.scoped.scss'
import { createTopicApi, saveTopicDraftApi } from '@/apis/post'
import {  getUserId } from '@/utils'
import { previewFileApi, uploadFileApi } from '@/apis/file'
import useChannelList from '@/hooks/useChannelList'


const Post = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [coverImgId, setCoverImgId] = useState()
  const { channelList, loading } = useChannelList()
  const [selectChannel, setSelectChannel] = useState('information_plaza')
  const [selectChannelName, setSelectChannelName] = React.useState('广场');
  const [showAddTag, setShowAddTag] = React.useState(true);
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  //频道切换
  const handleselectChannel = (action) => {
    Toast.info(action.text)
    setSelectChannel(action.className)
    setSelectChannelName(action.text)
  }

  const handleUploadCover = async (file) => {
    //上传文件
    const uploadRes = await uploadFileApi(file)
    console.log('上传文件返回：', uploadRes.data[0])
    const imgId = uploadRes.data[0].id //只有一张图片，索引为0
    setCoverImgId(imgId)

    //获取url
    const previewRes = await previewFileApi(imgId)
    console.log('上传文件url：', previewRes.data)
    const imgUrl = previewRes.data

    return {
      key: uploadRes.data[0].createTime,
      url: imgUrl, //上传后文件的url
      file: file, //源文件对象
    }
  }
  const handleCoverChange = (files) => {
    console.log('当前已上传的文件列表：', files);
  }

  //发布话题
  const handlePublish = async formValues => {
    const submitData = {
      topic: {
        title: title, //标题
        content: content, //内容
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

  //存草稿
  const handleSave = async (formValues) => {
    const { title, content } = formValues //解构表单数据
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
    //调用接口
    console.log('存草稿的表单数据：', submitData)
    const res = await saveTopicDraftApi(submitData)
    console.log('存草稿的返回：', res)
  }

  //添加、关闭标签
  const onCloseTab = (tag) => {
    const filteredTags = tags.filter(item => item !== tag)
    console.log(filteredTags)
    setTags(filteredTags)
  }
  const onClickAddTag = () => {
    setTags([...tags, newTag])
    setNewTag('')
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

      <div className="post-container">

        <div className='form-item'>
          <div className='form-item__name'>主题</div>
          <div className='form-item__value'>
            <Input
              value={title}
              onChange={setTitle}
              placeholder='请输入发布主题' />
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item__name'>频道</div>
          <Popover
            actions={channelList.map(item => ({
              text: item.name,
              className: item.key,
            }))}
            theme="light"
            onSelect={handleselectChannel}
            placement='bottom-start'
            reference={
              <Button plain hairline type='primary'>{selectChannelName}</Button>
            }
          />
        </div>

        <div className='form-item'>
          <div className='form-item__name'>内容</div>
          <div className='form-item__value'>
            <Input.TextArea
              value={content}
              placeholder='请输入内容'
              onChange={setContent}
              rows={3} autoSize maxLength={140} showWordLimit />
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item__name'>标签</div>
          <div className='form-item__value'>
            <div className='form-tag-item'>
              <div className='post-tag-box'>
                {tags.map((item, index) => (
                  <Tag
                    key={index}
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
          </div>
        </div>

        <div className='form-item'>
          <div className='form-item__name'>封面</div>
          <div className='form-item__value'>
            <Uploader
              upload={handleUploadCover}
              maxCount={1}
              onChange={handleCoverChange}
              accept='*' />
          </div>
        </div>

        <div className='post-button' style={{ margin: '16px 16px 0' }}>
          <Button onClick={handleSave} round nativeType='submit' type='primary' block>
            存草稿
          </Button>
          <Button onClick={handlePublish} round nativeType='submit' type='primary' block>
            发布
          </Button>
        </div>
      </div>

      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Post