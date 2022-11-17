import React from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  Select,
  DatePicker,
  Table,
  Tag,
  Modal,
  message,
} from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  PieChartOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { getChannel } from "api/managementApi";
import { getArtList } from "api/articleList";
import style from "pages/Management/Management.module.scss";
import errorPic from "assets/img/error.png";
import { deleteArt } from "api/deleteArt.js";

const { confirm } = Modal;

export class Management extends React.Component {
  // state1: table数据
  columns = [
    {
      title: "cover picture",
      dataIndex: "coverPic",
      key: "name",
      render: (x) => {
        if (x) {
          return <img src={x}></img>;
        }
        return <img src={errorPic}></img>;
      },
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "address",
      render: (x) => {
        var obj = this.status.find((val) => x === val.id);
        return <Tag color={obj.color}>{obj.title}</Tag>;
      },
    },
    {
      title: "publish time",
      key: "pubTime",
      dataIndex: "pubTime",
    },
    {
      title: "page views",
      key: "action",
      dataIndex: "views",
    },
    {
      title: "comments",
      key: "action",
      dataIndex: "comments",
    },
    {
      title: "liked",
      key: "action",
      dataIndex: "likes",
    },
    {
      title: "setting",
      key: "action",
      dataIndex: "delete",
      render: (id) => {
        return (
          <div className="setting">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                // var { results } = this.articleList.data;
                // var obj = results.find((val) => (val.id = id));
                // this.props.history.push(`/home/publish/${JSON.stringify(obj)}`);

                this.props.history.push(`/home/publish/${id}`);

              }}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                this.showConfirm(id);
              }}
            />
          </div>
        );
      },
    },
  ];
  status = [
    { id: -1, title: "all", color: "green" },
    { id: 0, title: "draft", color: "purple" },
    { id: 1, title: "unchecked", color: "red" },
    { id: 2, title: "pass", color: "gold" },
    { id: 3, title: "fail", color: "red" },
  ];
  // state2: pagination数据
  page = {
    position: ["bottomCenter"],
    total: undefined,
    current: 1,
    pageSize: 10,
    page: 1,
    per_page: 10,
    onChange: (pageNum, pageSize) => {
      this.page.page = pageNum;
      this.page.per_page = pageSize;
      this.getArtList(this.page);
    },
  };

  state = {
    channel: [],
    result: 0,
    tableData: [],
  };
  // fn1: 提交表单
  finishForm = (result) => {
    this.page.status = result.status === "-1" ? null : result.status;
    this.page.channel_id = result.channel_id;
    if (result.date) {
      this.page.begin_pubdate = result.date[0]
        .startOf("day")
        .format("YYYY-MM-DD hh:mm:ss");
      this.page.end_pubdate = result.date[1]
        .endOf("day")
        .format("YYYY-MM-DD hh:mm:ss");
    } else {
      this.page.begin_pubdate = undefined;
      this.page.end_pubdate = undefined;
    }
    this.getArtList(this.page);
  };

  // fn2: 删除文章按钮
  showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete this article?",
      icon: <ExclamationCircleOutlined />,
      content: "please do not unless you really want to",
      onOk: async () => {
        var res = await deleteArt(id);
        if (res.message === "OK") {
          this.getArtList(this.page);
          message.success("delete successfully", 2);
        } else {
          message.error("can not delete this article");
        }
      },
    });
  };

  render() {
    return (
      <div className={style.management}>
        {/* 1. 表单区域*/}
        {/* 1.1 title区 */}
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">
                  <PieChartOutlined></PieChartOutlined> DataOverview
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <UserOutlined /> article management
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          {/* 1.2 表单 */}
          <Form
            onFinish={this.finishForm}
            initialValues={{
              status: "-1",
            }}
          >
            {/* 1.2.1 status  */}
            <Form.Item label="status" name="status">
              <Radio.Group>
                <Radio value="-1"> all </Radio>
                <Radio value="0"> draft </Radio>
                <Radio value="1"> unchecked </Radio>
                <Radio value="2"> pass </Radio>
                <Radio value="3"> fail </Radio>
              </Radio.Group>
            </Form.Item>
            {/* 1.2.2 channel  */}
            <Form.Item name="channel_id" label="channel">
              <Select
                placeholder="please select one channel below"
                style={{
                  width: 250,
                }}
                options={this.state.channel.map((x) => ({
                  value: x.id,
                  label: x.name,
                }))}
              />
            </Form.Item>
            {/* 1.2.3 date  */}
            <Form.Item name="date" label="date">
              <DatePicker.RangePicker />
            </Form.Item>

            {/* 1.2.4 submit  */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* 2. 表格区域 */}
        <Card title={`there are ${this.state.result} results in the search`}>
          <Table
            columns={this.columns}
            dataSource={this.state.tableData}
            pagination={this.page}
          />
        </Card>
      </div>
    );
  }
  componentDidMount = async () => {
    this.getChannel();
    this.getArtList(this.page);
  };

  getChannel = async () => {
    var result = await getChannel();
    this.setState({
      channel: result.data.channels,
    });
  };

  getArtList = async (page) => {
    var params = {
      status: page.status,
      channel_id: page.channel_id,
      begin_pubdate: page.begin_pubdate,
      end_pubdate: page.end_pubdate,
      page: page.page,
      per_page: page.per_page,
    };
    const x = await getArtList(params);
    this.articleList = x;
  
    

    // 渲染pagination分页
    this.page.total = x.data.total_count;
    this.page.current = x.data.page;
    this.page.pageSize = x.data.per_page;

    // 渲染table
    this.setState({
      result: x.data.total_count,
      tableData: x.data.results.map((res) => {
        return {
          coverPic: res.cover.images[0],
          key: res.id,
          title: res.title,
          status: res.status,
          pubTime: res.pubdate,
          views: res.read_count,
          likes: res.like_count,
          comments: res.comment_count,
          delete: res.id,
        };
      }),
    });
  };
}
