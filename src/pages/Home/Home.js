import React from "react";
import style from "pages/Home/Home.module.scss";
//antd 大列表的导入
import {
  LogoutOutlined,
  EditOutlined,
  PieChartOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import { Switch, Route } from "react-router-dom";
import { Layout, Menu, Popconfirm, Input, AutoComplete } from "antd";
import { removeToken } from "utils/token";
import { getPerInfor } from "api/loginApi.js";

import axios from "axios";

// 三个主组件
import { Publish } from "pages/Publish/Publish";
import { DataOverview } from "pages/DataOverview/DataOverview";
import { Management } from "pages/Management/management";

const { Header, Content, Sider } = Layout;
const items2 = [
  {
    label: "data overview ",
    key: "a",
    icon: React.createElement(PieChartOutlined),
  },
  {
    label: "article management",
    key: "b",
    icon: React.createElement(EditOutlined),
  },
  {
    label: "article publish",
    key: "c",
    icon: React.createElement(FontColorsOutlined),
  },
];

export default class Home extends React.Component {
  state = {
    data: {
      a: "/home",
      b: "/home/management",
      c: "/home/publish",
    },
    userName: "user",
  };
  getCurrentItem = () => {
    const index = Object.values(this.state.data).findIndex(
      (value) => value == window.location.pathname
    );
    return Object.keys(this.state.data)[index];
  };

  render() {
    return (
      <div className={style.home}>
        <Layout>
          {/* 1.Header */}
          <Header className="header">
            <div className="logo"></div>
            <span className="loginOut">
              <Popconfirm
                placement="bottomRight"
                title={"are you sure to log out?"}
                onConfirm={() => {
                  removeToken();
                  this.props.history.push("/login");
                }}
                okText="Yes"
                cancelText="No"
              >
                <LogoutOutlined /> {"\u00A0"}log out
              </Popconfirm>
            </span>

            <span className="user">{this.state.userName}</span>
          </Header>
          {/* 2.layout */}
          <Layout>
            {/* 2.1 layout-sider */}
            <Sider width={200} height={'100vh'} className="site-layout-background">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={this.getCurrentItem()}
                defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                  borderRight: 0,

                }}
                items={items2}
                onClick={(x) => {
                  const index = Object.keys(this.state.data).findIndex(
                    (val) => val == x.key
                  );
                  const path = Object.values(this.state.data)[index];
                  this.props.history.push(path);
                }}
              />
            </Sider>
            {/* 2.2 layout-content */}
            <Layout
              style={{
                padding: "0px",
                height:'100%',
                overflow:'auto',
              }}
            >
              <Content
                className="site-layout-background"
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                <Switch>
                  <Route exact path="/home" component={DataOverview}></Route>
                  <Route path="/home/management" component={Management}></Route>
                  <Route path="/home/publish" component={Publish}></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }

  async componentDidMount() {
    var x = await getPerInfor();
    this.setState({
      userName: x.data.mobile,
    });
  }
}
