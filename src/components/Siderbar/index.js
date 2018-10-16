import React,{Component} from 'react';
import {Col, Icon, Menu} from 'antd';
import {withRouter} from 'react-router-dom';
import {inject,observer} from "mobx-react";
import css from './index.css';
const Template = {
    admin: [
        <Menu.Item key="/home">
            <Icon type="pie-chart" />
            <span>用户管理</span>
        </Menu.Item>,
        <Menu.Item key="/addUser">
            <Icon type="pie-chart" />
            <span>新增用户</span>
        </Menu.Item>,
        <Menu.Item key="/systemConfig">
            <Icon type="pie-chart" />
            <span>系统配置</span>
        </Menu.Item>,
        <Menu.Item key="/crm">
            <Icon type="pie-chart" />
            <span>客户管理</span>
        </Menu.Item>
    ],
    manager: [

    ],
    leader: [

    ],
    salemen: [

    ],
};
@inject('store')
@observer
class Siderbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            Template,
        }
        this.onSelect = this.onSelect.bind(this);
        this.getSelected = this.getSelected.bind(this)
    }
    componentDidMount(){
        this.getSelected(this.props.history.location.pathname)
    }
    getSelected(url) {
        const key = url.split("/")
        this.props.store.toggleKey('/'+key[2]);
    }
    componentWillReceiveProps(nextProps) {
        this.getSelected(nextProps.selectedKeys)
    }
    onSelect ({ item, key, selectedKeys }) {
        this.props.store.toggleKey(key);
        this.props.history.push('/index'+key)
    }
    render(){
        return (
            <div>
                <img src="" alt=""/>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={this.props.store.selectedKey}
                    onSelect={this.onSelect}
                >

                    {this.state.Template[this.props.role]}

                </Menu>

            </div>
        )
    }
}

export default withRouter(Siderbar);