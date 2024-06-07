import { Link, useNavigate } from "react-router-dom"
import { Button, Input, Form, Image, Toast } from 'react-vant';
import { UserO, Lock, EnvelopO, PhoneO } from '@react-vant/icons'
import './Register.scoped.scss'
import { registerAPI } from "@/apis/user";
import logoImage from '@/assets/logo-embodied.png'

const Register = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const onFinish = async (registerForm) => {
    const res = await registerAPI(registerForm)
    console.log('注册成功返回：', res)
    if (res.code === 20000) {
      Toast.info('注册成功')
      navigate('/login')
    } else {
      Toast.info('注册失败')
    }
  }

  return (
    <div className="register-page">
      <Form
        className='register-form'
        validateTrigger='onblur'
        onFinish={onFinish}
        form={form}
        footer={
          <div>
            <Button className='register-button' nativeType='submit'>注册</Button>
            <div className="route-navigate">
              <p>已经有账户?
                <Link to='/login'> 登录</Link>
              </p>
            </div>
          </div>
        }
      >

        <div className='logo'>
          <div className='logo logo__image'>
            <Image src={logoImage}></Image>
          </div>
          <div className='logo logo__name'>Embodied</div>
        </div>

        <Form.Item
          className='register-input'
          name='userName' //userName 需要和后端接口保持一致
          rules={[
            {
              required: true,
              message: '请填写用户名'
            },
          ]}
          leftIcon=<UserO />
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
          className='register-input'
          name='password'
          //intro='密码必须为8-16位，至少包含一个大写字母、一个小写字母和一个数字'
          rules={[
            { required: true, message: '请输入密码' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/,
              message: '密码必须为8-16位，至少包含一个大写字母、一个小写字母和一个数字'
            }
          ]}
          leftIcon=<Lock />
        >
          <Input placeholder='请输入密码' />
        </Form.Item>

        <Form.Item
          className='register-input'
          name='passwordConfirm'
          rules={[
            { required: true, message: '请重新输入密码' },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  if (value === form.getFieldValue('password')) {
                    resolve();//校验通过
                  } else {
                    reject(new Error('输入的密码不一致，请确认密码'))//校验失败
                  }
                })
              }
            }
          ]}
          leftIcon=<Lock />
        >
          <Input placeholder='请重新输入密码' />
        </Form.Item>

        <Form.Item
          className='register-input'
          name='email'
          rules={[
            {
              required: true
            },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '请输入正确的邮箱地址'
            }
          ]}
          leftIcon=<EnvelopO />
        >
          <Input placeholder='请输入邮箱' />
        </Form.Item>

        <Form.Item
          className='register-input'
          name='phone'
          rules={[
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请输入正确的手机号'
            }
          ]}
          leftIcon=<PhoneO />
        >
          <Input placeholder='请输入手机号' />
        </Form.Item>

      </Form>

    </div>
  )
}

export default Register