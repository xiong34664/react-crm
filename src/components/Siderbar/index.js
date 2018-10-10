import React,{Component} from 'react';
import {Icon, Menu} from 'antd';
import css from './index.css';
const Template = {
    admin: (
        <Menu>
            <Menu.Item key="3">
                <Icon type="pie-chart" />
                <span>Option 3</span>
            </Menu.Item>
            <Menu.Item key="4">
                <Icon type="pie-chart" />
                <span>Option 4</span>
            </Menu.Item>
        </Menu>
    ),
    manager: '',
    leader: '',
    salemen: '',
}

class Siderbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            Template
        }
    }
    render(){
        return (
            <div>
                <img src="" alt=""/>
                this.state.Template[this.props.role]
            </div>
        )
    }
}

export default Siderbar;