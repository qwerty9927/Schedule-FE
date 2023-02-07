import { Form, Input, Checkbox, Button } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import style from "./assets/css/login.module.css"
import axiosBase from "#api/axiosBase"

function Login(){
  const callApiLogin = async (data) => {
    return await axiosBase.post("api/auth/login", {
      ...data
    })
  }

  const submitData = async (data) => {
    const result = (await callApiLogin(data)).data
    console.log(result)
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