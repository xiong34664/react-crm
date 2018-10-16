import React, {Component} from 'react'
import { Icon, Input, Button, message} from 'antd'
import {withRouter} from 'react-router-dom';
import {DraggableArea} from 'react-draggable-tags';
import {post} from '@src/utils/utils'
import Mock from 'mockjs'
import css from './style.css'

class SystemConfig extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: [
        { name: '信用状态', option: [{id:1,name:'正常'},{id:2,name:'失信'}],
          isEdit: false, value: '', success: true
        },
        { name: '认可状态', option: [{id:1,name:'认可'},{id:2,name:'不认可'}],
          isEdit: false, value: '', success: true
        },
        { name: '行业', option: [{id:1,name:'汽车制造'},{id:2,name:'IT技术'}],
          isEdit: false, value: '', success: true
				},
        { name: '公司性质', option: [{id:1,name:'私营企业'},{id:2,name:'国营企业'}],
          isEdit: false, value: '', success: true
				}
      ]
    }
    this.changeEdit = this.changeEdit.bind(this)
    this.addOption = this.addOption.bind(this)
		this.sortOption = this.sortOption.bind(this)
  }
  componentDidMount() {
    Mock.mock('https://127.0.0.1/selectedStrategy', 'post', opt => {
      return Mock.mock({
        'data|10': [
          {
            track_time: '@datetime(yyyy/MM/dd HH:mm)',
            'company_name|1': [
              '武汉洁力华骏达汽车零部件有限公司',
              '潍柴(重庆)汽车有限公司'
            ],
            linkman: '@name',
            record: '@sentence(3, 5)',
            id: /[A-Z0-9]{18}/
          }
        ],
        total: '20'
      })
    })
  }
  getList() {
    post('https://127.0.0.1/selectedStrategy').then(res => {
      this.setState({
        dataSource: res.data,
        loading: false
      })
    })
  }
  changeEdit(index) {
    const {config} = this.state
    config[index].isEdit = true
    this.setState({
      config
    })
  }
  addOption(index, item) {
    const {config} = this.state
    if (config[index].option.filter((i)=>i.name===item.name).length || !item.name) {
      const msg = item.name ? '已存在该选项' : '内容不能为空'
      config[index].success = false
      this.setState({
        config
      })
      message.error(msg, () => {
        config[index].success = true
        this.setState({
          config
        })
      })
      return false

    } else {
      config[index].success = true
      config[index].option.push(item)
      config[index].value = ''
      config[index].isEdit = false
      this.setState({
        config
      })
      return true
    }

  }
	sortOption(index, option) {
    const {config} = this.state
    config[index].option = option
    this.setState({
      config
    })
  }
  render() {
    return (
      <div className="content shadow-1px">
        <div className="content-title">系统配置相关选项值</div>
        <div style={{paddingLeft: 40,marginTop: 30}}>
          {this.state.config.map((item, index) => (
            <ConfigItem
              onClick={this.changeEdit}
							onSubmit={this.addOption}
							onSort={this.sortOption}
              key={index}
              {...item}
              index={index}
            />
          ))}
        </div>
        <Button type="primary" style={{marginLeft: 40}}>
          保存
        </Button>
      </div>
    )
  }
}

class ConfigItem extends Component {
	constructor(props) {
		super(props);
		this.handleClickAdd = this.handleClickAdd.bind(this)
	}
	handleClickAdd(e) {
		const item = {id:Date.now(),name:e.target.value}
    const flag = this.props.onSubmit(this.props.index, item)
    if(flag)
      this.addTag(item);
  }
  render() {
    return (
      <div className={css['config-box']}>
        <div className={css['config-title']}>
          <span>{this.props.name}</span>
          <a
            href="/#"
            onClick={e => {
              e.preventDefault()
              this.props.onClick(this.props.index)
            }}
          >
            添加
          </a>
        </div>
        <div
          className={css['config-body']} 
				>
				<DraggableArea
					isList
					initialTags={this.props.option}
					render={({tag,deleteThis}) => (
						<div className={css['config-item']}>
							{tag.name}
							<Icon
							type="close-circle"
							theme="outlined"
							onClick={deleteThis}
						/>
						</div>
						
					)}
					onChange={(tags) => this.props.onSort(this.props.index,tags)}
					getAddTagFunc={addTag => this.addTag = addTag}
				/>
          {this.props.isEdit && (
            <div
              className={[
                css['config-input'],
                this.props.success || css.error
              ].join(' ')}
            >
              <Input
                autoFocus
                defaultValue={this.props.value}
                placeholder="请添加选项"
                onPressEnter={this.handleClickAdd}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(SystemConfig)
