import React from 'react';
import {Avatar,Icon} from 'antd';
import css from './index.css';
const Header = (props) => {
    return (
        <div className={css.container + ' shadow-1px'}>
            <Icon type="clock-circle" theme="outlined" style={{marginRight:8}}/>   {new Date().toLocaleString()}
            <div style={{ cursor: 'pointer', float: 'right'}}><Avatar size="small" src={props.userInfo.avatar}/> <span style={{ display: 'inline-block',verticalAlign: 'sub'  }}>{props.userInfo.nickName}</span></div>
        </div>
    )
};

export default Header;