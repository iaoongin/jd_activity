import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Spin } from "antd";
import MyRoute from "./Router";
// 引入store
import store from "./store";

export default class App extends React.Component {
  state = {
    loading: store.getState().loading,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        loading: store.getState().loading,
      });
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <Spin
        spinning={loading}
        wrapperClassName="mySpin"
        size="large"
        style={{
          height: window.innerHeight,
          lineHeight: window.innerHeight - 100 + "px",
          textAlign: "center",
          maxHeight: "100%",
          position: "fixed",
        }}
      >
        <MyRoute />
      </Spin>
    );
  }
}
