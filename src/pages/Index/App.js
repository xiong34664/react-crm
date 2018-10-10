import {IndexRouters} from '@src/router/router'
import React, {Component} from 'react'
// import {GetList} from '@src/Service/Api';
import {Layout, Menu, Icon, Row, Col, Table, Pagination} from 'antd'
import {log} from '@src/utils/utils'
import {post} from '@src/utils/utils'
import Mock from 'mockjs'

import Header from '@src/components/Header/index';
import css from './App.css';

const {Content} = Layout

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      dataSource: [],
      loading: true,
      pagination: {},
      current: 0,
      userInfo: {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        nickName: '我是业务员'
      }
    }
    this.getList = this.getList.bind(this)
  }
  componentDidMount() {
    Mock.mock('https://127.0.0.1/selectedStrategy', 'post', opt => {
      return Mock.mock({
        'data|10': [
          {
            'track_time': '@datetime(yyyy/MM/dd HH:mm)',
            'company_name|1': ['武汉洁力华骏达汽车零部件有限公司', '潍柴(重庆)汽车有限公司'],
            'linkman': '@name',
            'record': '@sentence(3, 5)',
            'id': /[A-Z0-9]{18}/
          }
        ],
        total :'20',
      })
    })
    this.getList()
    if (this.props.history.location.pathname === '/') {
      this.props.history.push('/index/a')
    }
  }
  getList() {
    post("https://127.0.0.1/selectedStrategy").then(res=>{
      this.setState({
        dataSource:res.data,
        loading: false,
        pagination: {total :res.total,current:this.state.current+1 }
      })
    })
  }
  onChange(pageNumber) {
    log(pageNumber)
  }
  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  render() {
    const columns = [
      {
        title: '跟踪时间',
        dataIndex: 'track_time',
      },
      {
        title: '公司名称',
        dataIndex: 'company_name',
      },
      {
        title: '联系人',
        dataIndex: 'linkman',
      },
      {
        title: '进展记录',
        dataIndex: 'record',
      }
    ]
      return (
        <Row style={{minHeight: '100vh'}} type="flex">
          <Col span={4} style={{backgroundColor: '#1756a5'}}>
            <div style={{height: 64, backgroundColor: '#1d64bc'}} />
                <Menu
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="pie-chart" />
                        <span>Option 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="pie-chart" />
                        <span>Option 3</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="pie-chart" />
                        <span>Option 4</span>
                    </Menu.Item>
                </Menu>
            </Col>
          <Col span={20}  style={{height: '100vh', flexDirection: 'column', display: 'flex'}}>
              <Header userInfo={this.state.userInfo}></Header>
              <Content className={css.content}>
                <Row gutter={16}>
                  <Col span={4}>
                    <div className="card">
                      <div className="card-title">本周新增客户</div>
                      <div className="card-body">6</div>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className="card">
                      <div className="card-title">本周新增客户</div>
                      <div className="card-body">6</div>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className="card">
                      <div className="card-title">本周新增客户</div>
                      <div className="card-body">6</div>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className="card">
                      <div className="card-title">本周新增客户</div>
                      <div className="card-body">6</div>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className="card">
                      <div className="card-title">本周新增客户</div>
                      <div className="card-body">6</div>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div className="card">
                      <div className="card-title">本周新增客户</div>
                      <div className="card-body">6</div>
                    </div>
                  </Col>
                </Row>
                <div style={{background:'#fff',marginTop:20,padding:"15px 30px"}} className="shadow-1px">
                  <div style={{lineHeight:"60px"}}>最近客户跟踪记录</div>
                  <Table 
                    rowKey="id" 
                    rowClassName= "tableStripe"
                    loading={this.state.loading} 
                    dataSource={this.state.dataSource} 
                    columns={columns} 
                    pagination={false}/>
                    <div className="pagination">
                      <Pagination showQuickJumper showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={2} total={500} onChange={this.onChange} />
                    </div>
                    
                </div>
                <IndexRouters />
                <p className={css.copyright}>
                  Copyright © 2018 武汉谱数科技有限公司
                </p>
              </Content>
          </Col>
        </Row>
      )
  }
}

export default App
