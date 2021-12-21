import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Tag, Space, Button, message } from "antd";
import { getJdTaskInfo, exec } from "../apis/jdTaskInfo.js";

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
        <Column
          title="操作"
          render={(text, record, _, action) => (
            <Button
              onClick={() => {
                let job = record.job;
                exec(job).then((resp) => {
                  console.log(resp);
                  message.info(resp.msg);
                });
              }}
            >
              执行
            </Button>
          )}
        ></Column>
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
        return x;
      });
      this.setState({ data: data });
    });
  }
}
