import React, { useState } from 'react';
import { Card, Cell, Button, Input, Form } from 'react-vant';
import './Login.scss'
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';

const Login = () => {

  const [form] = Form.useForm()

  const dispatch = useDispatch() //在组件中调dispatch方法，需要用钩子函数useDispatch
  const onFinish = (values) => { 
    console.log(values)
    //触发异步action fetchLogin
    dispatch(fetchLogin(values)) //参数就是收集到的表单数据values
    console.log(111)
  }

  return (
    <div className='login-page'>
      <Form className='login-form'
        validateTrigger='onblur'
        onFinish={onFinish}
        form={form}
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button round nativeType='submit' type='primary' block>
              提交
            </Button>
          </div>
        }
      >
        <h2 className='login-title'>登录</h2>
        <Form.Item
          tooltip={{
            message:
              'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
          }}
          intro='确保这是唯一的用户名'
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
          name='username' //username 需要和后端接口保持一致
          label='用户名'
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: '请填写密码' }
          ]}
          name='password'
          label='密码'
        >
          <Input placeholder='请输入密码' />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login