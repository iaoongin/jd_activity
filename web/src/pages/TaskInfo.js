import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Tag, Space } from 'antd';

const { Column, ColumnGroup } = Table;


const data = [
  {
    key: '1',
    pt_pin: 'John',
    pt_key: 'Brown',
  },
  {
    key: '2',
    pt_pin: 'Jim',
    pt_key: 'Green',
  },
  {
    key: '3',
    pt_pin: 'Joe',
    pt_key: 'Black',
  },
];

export default class TaskInfo extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {

      return (
        <Table dataSource={data}>
       {/*  <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup> */}
        <Column title="pt_pin" dataIndex="pt_pin" key="pt_pin" />
        <Column title="pt_key" dataIndex="pt_key" key="pt_key" />
        <Column title="昵称" dataIndex="nickname" key="nickname" render={
          text => {
            if(!text) return '-'
            return text
          }

        }/>
        {/* <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        /> */}
        {/* <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        /> */}
      </Table>
      )
    }

}