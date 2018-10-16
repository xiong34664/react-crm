import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col, Input, Button, Form, Checkbox, Table, Pagination, Upload } from 'antd'
import {log} from '@src/utils/utils'
import {post} from '@src/utils/utils'
import Mock from 'mockjs'
import xls from 'xlsx';
import {inject,observer} from "mobx-react";

import css from './style.css'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
@inject('store')
@observer
class Crm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchVal: '',
      commonality:false,
      recycle_bin:false
    }
    this.getList = this.getList.bind(this)
    this.uploadTest = this.uploadTest.bind(this);

  }
  componentDidMount() {
    Mock.mock('https://127.0.0.1/selectedStrategy', 'post', opt => {
      return Mock.mock({
        'data|10': [
          {
            'name|1': [
              '武汉洁力华骏达汽车零部件有限公司',
              '潍柴(重庆)汽车有限公司'
            ],
            'site': '@sentence(1, 3)',
            'industry|1': ['汽车制造','IT技术'],
            'affiliation': '@name',
            'add_time': "@datetime('yyyy/MM/dd HH:mm')",
            id: /[A-Z0-9]{18}/
          }
        ],
        total: '20'
      })
    })
    this.getList()
  }
  getList() {
    post('https://127.0.0.1/selectedStrategy').then(res => {
      this.setState({
        dataSource: res.data,
        loading: false
      })
    })
  }
  onChange(e) {
    log(e)
  }
  uploadTest(file,fileList){
    let rABS = true;
    const f = file;
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        let workbook = xls.read(data, {
            type: rABS ? 'binary' : 'array'
        });
        // 假设我们的数据在第一个标签
        let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        log(workbook,workbook.Sheets['Sheet1']);
        // XLSX自带了一个工具把导入的数据转成json
        let jsonArr = xls.utils.sheet_to_json(first_worksheet, {header:'default'});
        log(jsonArr);
    };
    if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
    return false;
  }
  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name'
      },
      {
        title: '地址',
        dataIndex: 'site'
      },
      {
        title: '行业',
        dataIndex: 'industry'
      },
      {
        title: '所属',
        dataIndex: 'affiliation'
      },
      {
        title: '添加时间',
        dataIndex: 'add_time'
      },
      {
        title: '操作',
        render: (item,col)=><a href="#/">转入回收站</a>
      }
    ]
    const plainOptions = ['公共客户', '回收站客户',];
    return (
      <div className={'content shadow-1px'}>
        <div className={'content-title'}>客户管理</div>
        <Row type="flex" justify="space-between" style={{lineHeight: '39px',marginTop:30}}>
          <Col>
            <Row gutter={16} type="flex">
              <Col>
                <FormItem
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  label="用户查询"
                >
                  <Input placeholder="请输入关键字" value={this.state.searchVal} onChange={(e)=>{this.setState({searchVal:e.target.value})}} />
                </FormItem>
              </Col>
              <Col>
                <Button type="primary">查询</Button>
              </Col>
              <Col><CheckboxGroup options={plainOptions} onChange={this.onChange}></CheckboxGroup></Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={16} type="flex">
              <Col>
                <Button type="primary" onClick={()=>{ this.props.store.toggleKey('/crm');this.props.history.push("/index/crm/addClient")}}>添加客户</Button>
              </Col>
              <Col>
                <Upload accept=".xlsx,.xls"
                  action='//jsonplaceholder.typicode.com/posts/' 
                  listType='picture' 
                  showUploadList={false} 
                  beforeUpload={this.uploadTest} >
                  <Button type="primary">批量导入客户</Button>
                </Upload>
              </Col>
              <Col>
                <a download="logo.png" href="/logo.png" onClick={(e)=>{
              
                }}>下载客户资料模板</a>
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

export default withRouter(Crm)
