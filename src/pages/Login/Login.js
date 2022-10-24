import React from "react";
import "pages/Login/Login.scss";
import logo from "assets/img/logo.png";
import { Card, Form, Checkbox, Input, Button } from "antd";
import axios from "axios";

export default class Login extends React.Component {
  // 表单提交执行的函数
  onFinish = (e) => {
    console.log(e);
    
  };

  // rules里面的校验规则

  ifReadValidor = (rule, value) => {
    if (value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("unread term"));
  };

  render() {
    return (
      <div className="login">
        <Card className="loginwindow">
          <p>
            <img src={logo} alt="logo" />
          </p>
          <Form
            name="basic"
            onFinish={this.onFinish}
            validateTrigger={["onBlur", "onChange"]}
            autoComplete="off"
            initialValues={{ mobile: "18321312222", code: "fdsf", agree: true }}
          >
            <Form.Item
              name="mobile"
              rules={[
                {
                  required: true,

                  message: "Please input your the phone number",
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "Please input correct phone number",
                  // validateTrigger: "onBlur",
                },
              ]}
            >
              <Input placeholder="please input your phone number" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your code",
                },
              ]}
            >
              <Input placeholder="please enter your code" />
            </Form.Item>

            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: this.ifReadValidor,
                  message: "please read terms",
                },
              ]}
            >
              <Checkbox>relevant terms</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}









