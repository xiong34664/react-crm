import React,{ Component } from 'react';
import {Avatar, Dropdown, Menu, Icon} from 'antd';
import css from './index.css';
import {withRouter,Link} from 'react-router-dom';

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString(),
        }
        this.flag = null;
        this.menu = (
            <Menu>
                <Menu.Item>
                    <Link to='/index/userInfo'>用户资料</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/index/changePassword'>修改密码</Link>
                </Menu.Item>
                <Menu.Item>
                    <a href="#" onClick={(e)=>{ e.preventDefault();localStorage.removeItem('role');this.props.history.push('/login')}}>退出系统</a>
                </Menu.Item>
            </Menu>
        );
    }
    componentDidMount(){
        if(this.props.history.location.pathname !== '/'){
            this.newTime();
        }
    }
    newTime(){
        this.flag = setInterval(()=>{
            this.setState({ time: new Date().toLocaleString()})
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.flag);
    }
    render(){
        return (
            <div className={css.container + ' shadow-1px'}>
                { this.state.time }
                <Dropdown overlay={this.menu} trigger={['hover']}>
                    <div style={{ cursor: 'pointer', float: 'right'}}><Avatar size="small" src={this.props.userInfo.avatar}/> <span style={{ display: 'inline-block',verticalAlign: 'sub'  }}>{this.props.userInfo.nickName}</span></div>
                </Dropdown>
            </div>
        )
    }
}

export default withRouter(Header);