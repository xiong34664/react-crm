import React from 'react';
import ReactDOM from 'react-dom';
// import Router from './router/router';
import './css/your-theme-file.less'
import './index.css'
import {Routers} from '@src/router/router';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(<LocaleProvider locale={zh_CN}><Routers/></LocaleProvider>, document.getElementById('root'));
