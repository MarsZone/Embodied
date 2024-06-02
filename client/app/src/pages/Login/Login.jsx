import React from 'react';
import { Button, Input, Form, Notify } from 'react-vant';
import './Login.scoped.scss'
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch() //在组件中调dispatch方法，需要用钩子函数useDispatch
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log('登录信息：', values)
    //触发异步action fetchLogin
    const loginSuccess = await dispatch(fetchLogin(values)) //参数就是收集到的表单数据values

    if (loginSuccess) {
      //登录完成后，1跳转到首页 2提示用户是否登录成功
      navigate('/')
      Notify.show('登录成功')
    } else {
      Notify.show('登录失败')
    }
  }

  return (
    <div className='login-page'>
      <Form
        className='login-form'
        validateTrigger='onblur'
        onFinish={onFinish}
        form={form}
        footer={
          <div>
            <Button className='login-button' nativeType='submit'>登录</Button>
            <div className="route-to-register">
              <p>还没有账户?
                <Link to='/register'>注册</Link>
              </p>
            </div>
          </div>
        }
      >
        <p className='logo'>Embodied</p>
        <Form.Item
          className='login-input'
          rules={[
            {
              required: true,
              message: '请填写用户名'
            }
          ]}
          name='userName' //userName 需要和后端接口保持一致
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
          className='login-input'
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