import React, { useState } from 'react';
import { Card, Cell, Button, Input, Form, Notify } from 'react-vant';
import './Login.scss'
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [form] = Form.useForm()
  const dispatch = useDispatch() //在组件中调dispatch方法，需要用钩子函数useDispatch
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log(values)
    //触发异步action fetchLogin
    await dispatch(fetchLogin(values)) //参数就是收集到的表单数据values
    console.log(111)

    //登录完成后，1跳转到首页 2提示用户是否登录成功
    navigate('/')
    Notify.show('登录成功')

  }

  return (
    <div className='login-page'>
      <Form className='login-form'
        validateTrigger='onblur'
        onFinish={onFinish}
        form={form}
        footer={
          <div>
            <Button className='login-button'>登录</Button>
            <div class="route-to-signup">
              <p>还没有账户? <a href="#">注册</a></p>
            </div>
          </div>
        }
      >
        <p className='login-logo'>Embodied</p>
        <Form.Item className='login-input'
          rules={[
            {
              required: true,
              message: '请填写用户名'
            },
            // {
            //   pattern: /^[a-zA-Z0-9_]{4,16}$/,
            //   message: '账号名必须由4-16位的英文字母大小写、数字或下划线组成'
            // }
          ]}
          name='userName' //userName 需要和后端接口保持一致
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item className='login-input'
          rules={[
            { required: true, message: '请填写密码' }
          ]}
          name='password'
        >
          <Input placeholder='请输入密码' />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login