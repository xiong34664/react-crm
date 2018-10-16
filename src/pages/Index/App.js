import {IndexRouters} from '@src/router/router'
import React, {Component} from 'react'
// import {GetList} from '@src/Service/Api';
import Siderbar from '@src/components/Siderbar/index';
import {log} from '@src/utils/utils';
import {Menu, Icon, Row, Col, Upload,Button} from 'antd';
import Header from '@src/components/Header/index';
import xls from 'xlsx';

import css from './App.css';
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                nickName: '我是管理员'
            },
        };
        localStorage.setItem('role','admin');
        // this.uploadTest = this.uploadTest.bind(this);
    }
    componentDidMount() {
        if (this.props.history.location.pathname === '/') {
            this.props.history.push('/index/home')
        }
    }
    // uploadTest(file,fileList){
    //     let rABS = true;
    //     const f = file;
    //     let reader = new FileReader();
    //     reader.onload = function (e) {
    //         let data = e.target.result;
    //         if (!rABS) data = new Uint8Array(data);
    //         let workbook = xls.read(data, {
    //             type: rABS ? 'binary' : 'array'
    //         });
    //         // 假设我们的数据在第一个标签
    //         let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //         log(workbook,workbook.Sheets['Sheet1']);
    //         // XLSX自带了一个工具把导入的数据转成json
    //         let jsonArr = xls.utils.sheet_to_json(first_worksheet, {header:'default'});
    //         log(jsonArr);
    //     };
    //     if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
    //     return false;
    // }
    render() {
        return (
            <Row style={{minHeight: '100vh'}} type="flex">
                <Col span={4} style={{backgroundColor: '#1756a5'}}>
                    <div style={{height: 48, backgroundColor: '#1d64bc'}} />
                    <Siderbar selectedKeys={this.state.selectedKeys} role={localStorage.getItem('role')} />
                </Col>
                <Col span={20}  style={{height: '100vh', flexDirection: 'column', display: 'flex',overflow:'hidden'}}>
                    <Header userInfo={this.state.userInfo}></Header>
                    <div className={css.content}>
                        <IndexRouters onSelected={()=>log(1)} />
                        <p className={css.copyright}>
                            Copyright © 2018 武汉谱数科技有限公司
                        </p>
                        {/* <Upload
                            accept=".xlsx,.xls"
                            action='//jsonplaceholder.typicode.com/posts/'
                            listType='picture'
                            showUploadList={false}
                            beforeUpload={this.uploadTest}
                        >
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload> */}
                    </div>
                </Col>
            </Row>
        )
    }
}

export default App