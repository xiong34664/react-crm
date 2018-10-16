import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/es6/map';
import 'core-js/es6/set';
import "babel-polyfill"
// import Router from './router/router';
import './css/your-theme-file.less'
import './index.css'
import {Routers} from '@src/router/router';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(<LocaleProvider locale={zh_CN}><Routers /></LocaleProvider>, document.getElementById('root'));
