import { useNavigate } from "react-router-dom"
import { request } from "@/utils";
import React, { useState } from 'react';
import { Card, Cell, Button, Input, Form, Notify } from 'react-vant';
import './Register.scss'


const Register = () => {

  const [form] = Form.useForm()
  const navigate = useNavigate()


  const onFinish = async (registerForm) => {
    console.log('注册信息：', registerForm)
    const res = await request.post(
      'api/users/register',
      registerForm
    )
    console.log(res.data)
  }

  return (
    <div className="register-page">
     <Form className='register-form'
        validateTrigger='onblur'
        onFinish={onFinish}
        form={form}
        footer={
          <div>
            <Button className='register-button' nativeType='submit'>注册</Button>
            <div className="route-to-signup">
              <p>已经有账户? <a href="#">登录</a></p>
            </div>
          </div>
        }
      >
        <p className='logo'>Embodied</p>
        <Form.Item className='register-input'
          rules={[
            {
              required: true,
              message: '请填写用户名'
            },
            {
              pattern: /^[a-zA-Z0-9_]{4,16}$/,
              message: '账号名必须由4-16位的英文字母大小写、数字或下划线组成'
            }
          ]}
          name='userName' //userName 需要和后端接口保持一致
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item className='register-input'
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

export default Register