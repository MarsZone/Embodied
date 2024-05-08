import React, { useEffect } from 'react'
import { Form, Button, Radio, NavBar, Toast, DatetimePicker } from 'react-vant'
import { useNavigate } from 'react-router-dom'
import { getUserId as _getUserId } from '@/utils'
import { useDispatch } from 'react-redux'
import { fetchUserInfo } from '@/store/modules/user'

const UserDetail = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  // useEffect(() => {
  //   const userInfo = dispatch(fetchUserInfo())
  //   console.log(userInfo)
  // }, [dispatch])

  const onFinish = values => {
    console.log(values)
  }

  return (
    <div>

      <NavBar
        className='nav-bar'
        title='个人信息'
        leftText='返回'
        onClickLeft={() => navigate(`/profile/${_getUserId}`)}
      />

      <Form
        form={form}
        onFinish={onFinish}
        footer={
          <div>
            <Button round nativeType='submit'>保存</Button>
          </div>
        }
      >

        <Form.Item name='userName' label='用户名'>
          <div>Embodied</div>
        </Form.Item>

        <Form.Item name='email' label='邮箱'>
          <div>embodied@...</div>
        </Form.Item>

        <Form.Item name='gender' label='性别'>
          <Radio.Group direction='horizontal' defaultValue='male'>
            <Radio name='male'>男</Radio>
            <Radio name='femail'>女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          isLink
          name='birthdate'
          label='出生日期'
          trigger='onConfirm'
          onClick={(_, action) => {
            action.current?.open()
          }}
        >
          <DatetimePicker popup type='date'>
            {(val) => (val ? val.toDateString() : '请选择日期')}
          </DatetimePicker>
        </Form.Item>

      </Form>
    </div>
  )
}


export default UserDetail