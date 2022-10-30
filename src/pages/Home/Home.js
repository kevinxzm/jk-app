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
import { Breadcrumb, Layout, Menu, Popconfirm } from "antd";
import { removeToken, ifToken } from "utils/token";

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
  };
  getCurrentItem = () => {
    const index = Object.values(this.state.data).findIndex(
      (value) => value == window.location.pathname
    );
    return Object.keys(this.state.data)[index];
  };
  // 复杂写法
  // if (window.location.pathname == "/home") {
  //   return ["a"];
  // } else if (window.location.pathname == "/home/management") {
  //   return ["b"];
  // } else if (window.location.pathname == "/home/publish") {
  //   return ["c"];
  // }
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
                <LogoutOutlined /> {"\u00A0"}退出
              </Popconfirm>
            </span>

            <span className="user">用户</span>
          </Header>
          {/* 2.layout */}
          <Layout>
            {/* 2.1 layout-sider */}
            <Sider width={200} className="site-layout-background">
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
                  // console.log(this.props.props.history);

                  const index = Object.keys(this.state.data).findIndex(
                    (val) => val == x.key
                  );
                  const path = Object.values(this.state.data)[index];
                  this.props.history.push(path);
                  // 复杂写法
                  // if (x.key == "a") {
                  //   this.props.history.push("/home");
                  // } else if (x.key == "b") {
                  //   this.props.history.push("/home/management");
                  // } else if (x.key == "c") {
                  //   this.props.history.push("/home/publish");
                  // }
                }}
              />
            </Sider>
            {/* 2.2 layout-content */}
            <Layout
              style={{
                padding: "24px",
              }}
            >
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
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
}

class DataOverview extends React.Component {
  render() {
    return <div>data Overview</div>;
  }
}

class Management extends React.Component {
  render() {
    return (
      <div>
        article management
      </div>
    );
  }
}

class Publish extends React.Component {
  render() {
    return (
      <div>
        article publish
      </div>
    );
  }
}

















