import React, { useState } from 'react';
import { Card, Cell, Button, Input, Form } from 'react-vant';
import './Login.scss'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [form] = Form.useForm()

  const handleLogin = () => {
    // 在此处执行登录逻辑，可以发送登录请求等
    console.log('用户名:', username);
    console.log('密码:', password);
  }

  return (

    // <div className='login-page'>
    //   <div className='login-form'>
    //     {/* <Cell.Group> */}
    //       <h2 className='login-title'>登录</h2>
    //       <Cell title='用户名'>
    //         <Input
    //           value={username}
    //           onChange={(value) => setUsername(value)}
    //           placeholder='请输入用户名'
    //           rules={[
    //             { required: true, message: '请填写用户名' }
    //           ]}
    //         />
    //       </Cell>
    //       <Cell title='密码'>
    //         <Input
    //           value={password}
    //           onChange={(value) => setPassword(value)}
    //           placeholder='请输入密码'
    //         />
    //       </Cell>
    //       <Button round nativeType='submit' type='primary' block
    //         className="login-button"
    //         onClick={handleLogin}
    //       >
    //         登录
    //       </Button>
    //     {/* </Cell.Group> */}
    //   </div>
    // </div>

    <div className='login-page'>
      <Form className='login-form'
        validateTrigger='onblur'
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