import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Breadcrumb, Form, Input, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Channel } from "components/Channel";
/**
 * 发布组件
 * @returns
 */
export class Publish extends React.Component {
  onFinish = (x) => {
    console.log(x);
  };
  render() {
    return (
      <div>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>aricle publish</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 8 }}
            onFinish={this.onFinish}
            initialValues={{ title: "title first" }}
          >
            {/* 1.title  */}
            <Form.Item
              label="title"
              name="title"
              rules={[
                { required: true, message: "Please input your article title" },
              ]}
            >
              <Input />
            </Form.Item>
            {/* 2.channel  */}
            <Form.Item
              name="channel_id"
              label="channel"
              rules={[{ required: true, message: "please select one channel" }]}
            >
              <Channel></Channel>
            </Form.Item>

            {/* 4.富文本 */}
            









            {/* last: submit  */}
            <Form.Item wrapperCol={{ offset: 3, span: 8 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="submit">Save in draft</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
