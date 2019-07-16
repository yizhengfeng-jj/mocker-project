import React from "react";
import ReactDOM from "react-dom";
import { Form, Button, Input, message, Table } from "antd";
import Axios from "axios";
import './index.less';

const FormItem = Form.Item;

class AppForm extends React.Component {
  state = {
    dataSource: [],
    index: 0 // 点击的index
  };

  add = () => {
    const { getFieldsValue } = this.props.form;
    const { name, age } = getFieldsValue();
    Axios.post("/api/create", { name, age }).then(res => {
      this.setField("name", "");
      this.setField("age", "");
      message.info("添加成功");
    });
  };

  setField = (type, value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      [type]: value
    });
  };

  viewSimple = index => {
    Axios.get(`/api/list/${index}`).then(res => {
        console.log(res)
      const { name, age } = res.data && res.data[0] || {};

      this.setField("name", name);
      this.setField("age", age);
      this.setState({ index });
    });
  };

  editor = () => {
    const { getFieldsValue } = this.props.form;
    const { name, age } = getFieldsValue();
    const { index } = this.state;

    Axios.post(`/api/editor/${index}`, { name, age }).then(res => {
      this.setField("name", "");
      this.setField("age", "");
      message.info("修改成功");
    });
  };

  delete = () => {
    const { index } = this.state;

    Axios.delete(`/api/delete/${index}`).then(res => {
      this.setState(() => ({
        dataSource: res.data.map(item => ({ ...item, key: item.id }))
      }));
    });
  };

  getList = () => {
    Axios.get("/api/list").then(res => {
      this.setState(() => ({
        dataSource: res.data.map((item, index) => ({ ...item, key: index + item.name }))
      }));
    });
  };

  render() {
    const columns = [
      {
        id: 1,
        title: "姓名",
        key: "name",
        dataIndex: "name"
      },
      {
        id: 2,
        title: "年龄",
        key: "age",
        dataIndex: "age"
      },
      {
        id: 3,
        title: "操作",
        key: "operator",
        dataIndex: "operator",
        render: (text, record, index) => (
          <span className="operator">
            <span onClick={() => this.viewSimple(index)}>查看</span>

            <span onClick={() => this.delete(index)}>删除</span>
          </span>
        )
      }
    ];
    const { getFieldDecorator } = this.props.form;
    const { name, age } = this.state;

    return (
      <div className="app">
        <Form layout="inline">
          <FormItem label="名称">
            {getFieldDecorator("name", {
              rules: []
            })(<Input />)}
          </FormItem>
          <FormItem label="年龄">
            {getFieldDecorator("age", {
              rules: []
            })(<Input />)}
          </FormItem>
        </Form>
        <div className="btn-group">
          <Button onClick={this.add}>增加</Button>
          <Button onClick={this.editor}>修改</Button>
          <Button onClick={this.getList}>获取列表</Button>
        </div>
        <Table columns={columns} dataSource={this.state.dataSource} />
      </div>
    );
  }
}

const App = Form.create()(AppForm);
ReactDOM.render(<App />, document.getElementById("root"));
