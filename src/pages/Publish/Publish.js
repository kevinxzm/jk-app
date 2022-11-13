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
  Modal,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Channel } from "components/Channel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { publishArt } from "api/publish";

// 发布组件（总）
export class Publish extends React.Component {
  state = {
    coverType: 1,
    fileList: [],
    previewVisible: false,
    previewImage: "",
  };
  pubForm = React.createRef();

  // 提交表单
  onSubForm = async (x, draft) => {
    if (x.type !== this.state.fileList.length) {
      message.error("the number of the picture doesn't match selected number ");
      return;
    }

    var images = this.state.fileList.map((val) => {
      return val.url || val.response.data.url;
    });

    var data = { ...x, cover: { type: x.type, images } };

    try {
      var result = await publishArt(data, draft);
      if (result) {
        this.props.history.push("/home/management");
        draft
          ? message.warn("draft upload succesfully")
          : message.success("upload succesfully");
        return;
      }
    } catch (err) {
      return message.error(err.message);
    }
  };

  onDraft = async () => {
    var x = await this.pubForm.current.validateFields();
    this.onSubForm(x, true);
  };

  onFinish = (x) => {
    this.onSubForm(x);
  };

  // 三图变一图只留一张图
  pageChange = (x) => {
    this.setState({
      coverType: x.target.value,
      fileList: this.state.fileList
        .map((val, index) => {
          if (index < x.target.value) {
            return val;
          }
          return undefined;
        })
        .filter((val) => val != undefined),
    });
  };

  // 预览图片
  handlePreview = async (file) => {
    this.setState({
      previewImage: file.url || file.response.data.url,
      previewVisible: true,
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
            ref={this.pubForm}
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
                <>
                  <Upload
                    fileList={this.state.fileList}
                    value={this.state.fileList}
                    listType="picture-card"
                    action={"http://geek.itheima.net/v1_0/upload"}
                    name="image"
                    onChange={(x) => {
                      this.setState({
                        fileList: x.fileList,
                      });
                    }}
                    beforeUpload={(file) => {
                      var result = ["image/jpeg", "image/png"].includes(
                        file.type
                      );
                      if (!result) {
                        message.error("this file is not picture");
                        return Upload.LIST_IGNORE;
                      }
                    }}
                    onPreview={this.handlePreview}
                  >
                    {this.state.fileList.length < this.state.coverType && (
                      <PlusOutlined />
                    )}
                  </Upload>
                </>
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
                <Button onClick={this.onDraft}>Save as draft</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Modal
          title="cover picture"
          open={this.state.previewVisible}
          footer={null}
          onCancel={() => {
            this.setState({ previewVisible: false });
          }}
        >
          <img
            alt="example"
            style={{ width: "100%" }}
            src={this.state.previewImage}
          />
        </Modal>
      </div>
    );
  }
}
