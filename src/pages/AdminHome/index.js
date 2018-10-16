import React, {Component} from 'react'
import { Row, Col, Input, Button, Table, Select, Pagination } from 'antd'
import {withRouter} from 'react-router-dom';
import {log,post} from '@src/utils/utils'
import Mock from 'mockjs'
import css from './style.css'
import {inject,observer} from "mobx-react";

const Option = Select.Option;
@inject('store')
@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dataSource:[]
    }
    this.getList = this.getList.bind(this)
  }
  componentDidMount() {
    Mock.mock('https://127.0.0.1/adminlist', 'post', opt => {
      return Mock.mock({
        'data|10': [
          {
            id:"@id",
            'name': "@name",
            'admmin_class|1': ["系统管理","领导","业务"],
            'employee_name': "@cname",
            'department_name': '@cword(3)',
            'create_time': "@datetime('yyyy/MM/dd HH:mm')",
          }
        ],
        total: '20'
      })
    })
    this.getList()
  }
  getList() {
    post('https://127.0.0.1/adminlist').then(res => {
      this.setState({
        dataSource: res.data,
        loading: false
      })
    })
  }
  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'name'
      },
      {
        title: '管理员分类',
        dataIndex: 'admmin_class'
      },
      {
        title: '员工姓名',
        dataIndex: 'employee_name'
      },
      {
        title: '部门名称',
        dataIndex: 'department_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time'
      },
      {
        title: '操作',
        className:css.action,
        render: (text,col)=>(<div><a href="#/">编辑</a><a href="/#/" className={css.del}>删除</a></div>)
      }
    ]
    return (
      <div className={'content shadow-1px'}>
        <div className={'content-title'}>客户管理</div>
        <Row type="flex" justify="space-between" style={{lineHeight: '39px',margin:"30px 0 10px"}}>
          <Col>
            <Button type="primary" onClick={()=>{this.props.store.toggleKey('/addUser');this.props.history.push("/index/addUser")}}>新增用户</Button>
          </Col>
          <Col>
            <Row gutter={16} type="flex">
              <Col>
                <Input placeholder="请输入关键词" />
              </Col>
              <Col>
                <Select  defaultValue="all" style={{width:120}} onChange={this.handleChange}>
                  <Option value="all">全部</Option>
                  <Option value="admin">系统管理</Option>
                  <Option value="lead">领导</Option>
                  <Option value="business">业务</Option>
                </Select>
              </Col>
              <Col>
                <Button type="primary">查询</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table
          rowKey="id"
          rowClassName="tableStripe"
          loading={this.state.loading}
          dataSource={this.state.dataSource}
          columns={columns}
          pagination={false}
        />
        <div className="pagination">
          <Pagination
            showQuickJumper
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
            defaultCurrent={2}
            total={500}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
