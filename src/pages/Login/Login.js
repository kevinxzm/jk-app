import React from "react";
import style from "pages/Login/Login.module.scss";
import logo from "assets/img/logo.png";
import { Card, Form, Checkbox, Input, Button, message } from "antd";
import { loginIn } from "api/loginApi.js";
import { setToken } from "utils/token.js";

import { createBrowserHistory } from "history";

var history = createBrowserHistory();

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  // 2.表单提交执行的函数
  onFinish = async (e) => {
    // 2.1 显示loading按钮
    this.setState({
      btnloading: true,
    });
    // 2.2 发送数据
    try {
      var token = await loginIn(e.mobile, e.code);
      setToken(token.data.token);

      // 2.2.1 AuthRoute使用state传过来参数
      var flag = this.props.history.location.state;
      if (flag) {
        this.props.history.push(flag);
      } else {
        this.props.history.push("/home");
      }
      message.success("log in successfully", 1);
    } catch (error) {
      message.error("wrong code", 1);
      this.setState({
        btnloading: false,
      });
    }
  };

  // rules里面的自定义校验规则
  ifReadValidor = (rule, value) => {
    if (value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("unread term"));
  };

  render() {
    return (
      <div className={style.login}>
        <Card className="loginwindow">
          <p>
            <img src={logo} alt="logo" />
          </p>
          <Form
            name="basic"
            onFinish={this.onFinish}
            validateTrigger={["onBlur", "onChange"]}
            autoComplete="off"
            initialValues={{
              mobile: "13911111111",
              code: "246810",
              agree: true,
            }}
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
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.btnloading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
