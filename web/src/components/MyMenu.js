import React from "react";
import { Menu, message } from "antd";
import {
  SettingOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getInfo, logout } from "../apis/login";
import { removeToken } from "../utils/auth";

const { SubMenu } = Menu;
const loginKey = "#/login";
const logoutKey = "#/logout";
const cleanCacheKey = "#/cleanCache";

class MyMenu extends React.Component {
  state = {
    current: "",
    currentUser: {},
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadUserInfo();
  }

  handleClick = (e) => {
    console.log("click ", e);
    const key = e.key;

    if (key === logoutKey) {
      logout().then((resp) => {
        message.success("已注销.");
        removeToken();
        setTimeout(() => {
          window.location.href = loginKey;
        }, 500);
      });
      return;
    } /*  else if (key === cleanCacheKey) {
      cleanCacheExceptLogin().then(resp => {
        message.success("已清空.");

        setTimeout(() => {
          window.location.reload()
        }, 500);
      });
      return;
    } */
    // const w = window.open("about:blank");
    const w = window;
    w.location.href = key;
    this.setState({
      current: e.key,
    });
  };

  loadUserInfo = () => {
    getInfo().then((resp) => {
      console.log(resp);
      this.setState({
        currentUser: resp.data,
      });
    });
  };

  render() {
    // console.log(this.props.match);

    const { currentUser } = this.state;

    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        // className="middle"
      >
        <Menu.Item key="/#/taskInfo" icon={<UnorderedListOutlined />}>
          任务列表
        </Menu.Item>
        <Menu.Item key="/#/userInfo" icon={<UnorderedListOutlined />}>
          用户列表
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <UserOutlined />
              &nbsp;&nbsp;{currentUser.username}
            </span>
          }
          className="floatRight"
          key="user"
        >
          <Menu.Item key={cleanCacheKey}>清空缓冲</Menu.Item>
          <Menu.Item key={logoutKey}>注销</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
export default MyMenu;
