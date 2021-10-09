import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Tag, Space } from "antd";
import { getJdTaskInfo } from "../apis/jdTaskInfo.js";

const { Column, ColumnGroup } = Table;

export default class TaskInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    let { data } = this.state;
    return (
      <Table dataSource={data}>
        <Column title="name" dataIndex="name" />
        <Column
          title="running"
          dataIndex="running"
          render={(text) => {
            if (!text) return "-";
            return text + "";
          }}
        />
        <Column title="time" dataIndex="time" />
        <Column title="type" dataIndex="type" />
        <ColumnGroup title="job">
          <Column title="target" dataIndex={["job", "target"]} />
          <Column title="type" dataIndex={["job", "type"]} />
        </ColumnGroup>
      </Table>
    );
  }

  componentDidMount() {
    getJdTaskInfo().then((resp) => {
      console.log(resp);
      let data = resp.data.list;
      var idx = 0;
      data.map((x) => {
        x.key = idx;
        idx++;
      });
      this.setState({ data: data });
    });
  }
}
