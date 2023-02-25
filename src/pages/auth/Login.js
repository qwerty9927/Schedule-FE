import { Form, Input, Checkbox, Button } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"
import style from "../../assets/css/auth/login.module.css"
import message from "../../data/toastMessage"
import useAuth from "../../hooks/useAuth"

function Login(){
  const navigate = useNavigate()
  const { login } = useAuth()
  const location = useLocation()

  const submitData = async (data) => {
    await toast.promise(login(data), {
      success: message.loginSuccess,
      pending: message.loginPending,
      error: message.loginError
    }).then(res => {
      navigate(location.state || "/dashboard")
    })
  }
  return (
    <div className={style.backgroundTemp}>
      <Form
        name="login"
        className={style.loginForm}
        initialValues={{ remember: true }}
        onFinish={submitData}
      >
        <Form.Item>
          <label>Login</label>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login