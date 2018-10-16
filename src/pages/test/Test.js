import React, {Component} from 'react'
import {Row, Col, Table, Pagination, Transfer,Checkbox,Popover} from 'antd'
import {log} from '@src/utils/utils'
import {post} from '@src/utils/utils'
import Mock from 'mockjs'
import css from './style.css'

const CheckboxGroup = Checkbox.Group
class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      dataSource: [],
      loading: true,
      mockData: [],
      targetKeys: [],
      checkedList:[],
      selectedCount: 0
    }
		this.getList = this.getList.bind(this)
		this.getMock = this.getMock.bind(this)
  }
  componentDidMount() {
    Mock.mock('https://127.0.0.1/selectedStrategy', 'post', opt => {
      return Mock.mock({
        // 'data|10': [
        //   {
        //     track_time: '@datetime(T)',
        //     'company_name|1': [
        //       '武汉洁力华骏达汽车零部件有限公司',
        //       '潍柴(重庆)汽车有限公司'
        //     ],
        //     linkman: '@name',
        //     record: '@sentence(3, 5)',
        //     "id|1-100": 100
        //   }
        // ],
        'data|10': [
          {
            "name": "@cparagraph(1, 3)",
            "company_name|1-100": 100,
            "linkman|1-100": 100,
            "record|1-100": 100,
            "id|1-100": 100
          }
        ],
      })
		})
		Mock.mock('https://127.0.0.1/getMock', 'post', opt => {
      return Mock.mock({
        'data|1-10': [
          {
						id: /[A-Z0-9]{18}/,
						title: `@name`,
          }
        ],
      })
    })
		this.getList()
		this.getMock()
    if (this.props.history.location.pathname === '/') {
      this.props.history.push('/index/a')
    }
  }
  getList() {
    post('https://127.0.0.1/selectedStrategy').then(res => {
      const mockData = {}
      for(const i  in res.data[0]) {
        if(i === "name") {
          mockData[i] = "合计"
          continue
        }
        let num = 0
        res.data.forEach((item)=>{
          num+= item[i]
        })
        mockData[i] = num
      }
      log(mockData)

      this.setState({
        dataSource: [...res.data,mockData],
        loading: false
      })
    })
  }
  onChange(pageNumber) {
    log(pageNumber)
  }
  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize)
  }
  onSelect(openKeys) {
    log(openKeys)
  }
  onClick({item, key, keyPath}) {
    log(item)
	}
	getMock() {
    post('https://127.0.0.1/getMock').then(res => {
      this.setState({
        mockData: res.data,
			})
			log(res)
    })
  }
  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys)
    this.setState({targetKeys})
  }
  onCheckbox(checkedList){
    this.setState({
      checkedList,
      selectedCount: checkedList.length
    });
  }
  render() {
    this.plainOptions = ['重庆数码车身模具有限公司', '北京奥拉立夫汽车安全系统有限公司']
    const columns = [
      {
        title: '跟踪时间',
        dataIndex: 'name',
        className:css.hidden200,
        render:(text)=><Popover style={{maxWidth:200,display:'block'}} placement="bottomLeft" content={text} trigger="hover">{text}</Popover>
      },
      {
        title: '公司名称',
        dataIndex: 'company_name',
      },
      {
        title: '联系人',
        dataIndex: 'linkman'
      },
      {
        title: '进展记录',
        dataIndex: 'record'
      },
      {
        title: '编号',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: '合计',
        render: (text,col)=>{
          let total = 0
          for(const i in col){
            if(i === "name") continue
            total +=  col[i]
          }
          return <span>{total}</span>}
      }
    ]
    return (
      <div>
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
        <div
          style={{background: '#fff', marginTop: 20, padding: '15px 30px'}}
          className="shadow-1px"
        >
          <div style={{lineHeight: '60px'}}>最近客户跟踪记录</div>
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
          <p>已选中{this.state.selectedCount} <a href="/#" onClick={(e)=>{e.preventDefault();this.setState({checkedList:[],selectedCount:0})}}>清空</a></p>
          <CheckboxGroup className={css.checkboxList}  options={this.plainOptions} value={this.state.checkedList} onChange={this.onCheckbox.bind(this)}></CheckboxGroup>
					<Transfer
						titles={["未添加业务员","已管理业务员"]}
						rowKey={record => record.id}
            dataSource={this.state.mockData}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </div>
      </div>
    )
  }
}
export default Test
