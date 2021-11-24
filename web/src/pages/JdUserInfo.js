import React, { useContext, useState, useEffect, useRef } from "react";
import { EditableProTable } from "@ant-design/pro-table";
import {
  getJdUserInfo,
  updateJdUserInfo,
  deleteJdUserInfo,
} from "../apis/jdUserInfo.js";
import {Avatar} from 'antd'

export default class TaskInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editableKeys: [],
      columns: [
        {
          title: "pt_pin",
          dataIndex: "pt_pin",
          editable: true,
          width: "10%",
        },
        {
          title: "pt_key",
          dataIndex: "pt_key",
          editable: true,
          render: (_, record) => <code>{record.pt_key}</code>,
        },
        {
          title: "用户",
          editable: false,
          width: "13%",
          render: (text, record, _, action) => [
            <Avatar size={32} src={record?.jd?.headImageUrl} />,
            <span>&nbsp;</span>,
            <span>{record?.jd?.nickname}</span>
          ]
        },
        {
          title: "更新时间",
          dataIndex: "update_at",
          editable: false,
          width: "15%",
        },
        {
          title: "操作",
          valueType: "option",
          width: 200,
          render: (text, record, _, action) => [
            <a
              key="editable"
              onClick={() => {
                console.log(record);
                action?.startEditable?.(record.id);
              }}
            >
              编辑
            </a>,
            <a
              key="delete"
              onClick={async () => {
                let del = await deleteJdUserInfo([record.id]);
                if (del?.code == 200) {
                  this.setState({ data: this.formatData(del.data) });
                }
              }}
            >
              删除
            </a>,
          ],
        },
      ],
    };
  }

  render() {
    let { columns, data, editableKeys } = this.state;

    return (
      <EditableProTable
        rowKey="pt_pin"
        value={data}
        columns={columns}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            // console.log(rowKey, data, row);
            let req = {
              pt_pin: data.pt_pin,
              pt_key: data.pt_key,
            };
            let update = await updateJdUserInfo([req]);
            // console.log(update);
            if (update?.code == "200") {
              this.setState({ data: this.formatData(update.data) });
            }
          },
          onChange: (editableKeys) => {
            this.setState({ editableKeys });
          },
        }}
      ></EditableProTable>
    );
  }

  componentDidMount() {
    getJdUserInfo().then((resp) => {
      console.log(resp);
      let data = resp.data;
      this.setState({ data: this.formatData(data) });
    });
  }

  formatData(data) {
    data.map((x) => {
      x.key = x.pt_pin;
      x.id = x.pt_pin;
      return x;
    });

    return data;
  }
}
