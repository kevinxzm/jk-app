import React from "react";
import style from "pages/Publish/Publish.module.scss";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Breadcrumb,
  Form,
  Input,
  Space,
  Upload,
  Radio,
} from "antd";
import {
  DownOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Channel } from "components/Channel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
/**
 * 发布组件
 * @returns
 */
export class Publish extends React.Component {
  state = {
    coverType: 1,
    fileList: [
      {
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        url: "http://geek.itheima.net/uploads/1668162791035.jpg",
      },
    ],
  };
  onFinish = (x) => {
    console.log(x);
  };

  pageChange = (x) => {
    this.setState({
      coverType: x.target.value,
    });
  };

  render() {
    return (
      <div className={style.publish}>
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
            initialValues={{ title: "title first", type: 1, content: "" }}
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

            {/* 3.cover number  */}

            <Form.Item label="cover" name={"type"}>
              <Radio.Group onChange={this.pageChange}>
                <Radio value={1}>one cover</Radio>
                <Radio value={3}>three cover</Radio>
                <Radio value={0}>no cover</Radio>
              </Radio.Group>
            </Form.Item>

            {/* 4. cover  */}

            <Form.Item label="picture">
              {this.state.coverType !== 0 && (
                <Upload
                  fileList={this.state.fileList}
                  listType="picture-card"
                  action={"http://geek.itheima.net/v1_0/upload"}
                  name="image"
                  onChange={(x) => {
                    console.log(x);

                    this.setState({
                      fileList: x.fileList,
                    });
                  }}
                >
                  <PlusOutlined />
                </Upload>
              )}
            </Form.Item>

            {/* 5.富文本 */}
            <Form.Item
              label={"content"}
              name="content"
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: "Please input your article content",
                },
              ]}
            >
              <ReactQuill
                theme="snow"
                value={this.value}
                placeholder="please enter content"
              />
            </Form.Item>

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
