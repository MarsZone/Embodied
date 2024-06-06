import React from 'react';
import { Button, Input, Form, Toast } from 'react-vant';
import './Login.scoped.scss'
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch() //在组件中调dispatch方法，需要用钩子函数useDispatch
  const navigate = useNavigate()

  const handleLogin = async (loginForm) => {
    console.log('登录信息：', loginForm)
    //触发异步action fetchLogin
    const resCode = await dispatch(fetchLogin(loginForm)) //参数就是收集到的表单数据values
    console.log('dispatch方法返回：', resCode)

    if (resCode === 20000) {
      //登录完成后，1跳转到首页 2提示用户是否登录成功
      navigate('/')
      Toast.success('登录成功')
    } else {
      Toast.success('登录失败')
    }
  }

  return (
    <div className='login-page'>
      <Form
        className='login-form'
        validateTrigger='onblur'
        onFinish={handleLogin}
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