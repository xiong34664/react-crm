import React,{Component} from 'react';
import { Input, Button, Select, Transfer, Row, Col, Form } from 'antd';
import {log} from '@src/utils/utils'
import css from './index.css';
const FormItem = Form.Item;

const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `zzzz${i + 1}`,
        description: `description of content${i + 1}`,
    });
}

class AddUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                departmentName: '',
                password: '',
                adminType: 'salemen',
                employeeName: '',
            },
            formStatus: {
                username: {
                    status: null,
                    tip: '',
                },
                departmentName:{
                    status: null,
                    tip: '',
                },
                password:{
                    status: null,
                    tip: '',
                },
                adminType: {
                    status: 'success',
                    tip: '',
                },
                employeeName: {
                    status: null,
                    tip: '',
                }
            },
            isManager: false,
            mySalemen: [],
            selectedSalemen: [],
        };
        this.validateInput = this.validateInput.bind(this);
        this.handleSalemenChange = this.handleSalemenChange.bind(this);
        this.handleSelectSalemen = this.handleSelectSalemen.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }
    componentDidMount() {
        // this.props.onSelected()
    }
    //改变业务员分组
    handleSalemenChange = (movedSalemen, direction, moveKeys) => {
        this.setState({mySalemen: movedSalemen});
    }
    //选择业务员
    handleSelectSalemen = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({selectedSalemen: [...sourceSelectedKeys, ...targetSelectedKeys]});
    }
        //验证方法
    validateInput(name){
        let form = this.state.form;
        let status = this.state.formStatus;
        if(form[name] !== undefined && form[name] === ''){
            status[name].status = 'error';
            status[name].tip = '输入值不得为空!';
            this.setState({ formStatus: status });
            return;
        }
        //用户名验证
        if(name === 'username'){
            if(form[name].length < 2 || form[name].length > 16){
                status[name].status = 'error';
                status[name].tip = '用户名必须在2至16个字符之间!';
            }else{
                status[name].status = 'success';
                status[name].tip = '';
            }
        }
        //部门名称验证
        if(name === 'departmentName'){
            if(form[name].length < 2 || form[name].length > 16){
                status[name].status = 'error';
                status[name].tip = '部门名称必须在2至16个字符之间!';
            }else{
                status[name].status = 'success';
                status[name].tip = '';
            }
        }
        //密码验证
        if(name === 'password'){
            if(form[name].length < 6 || form[name].length > 16){
                status[name].status = 'error';
                status[name].tip = '密码必须在6至16个字符之间!';
            }
            else if(/^[0-9]+$/.test(form[name]) || /^[a-z]+$/.test(form[name]) || /^[A-Z]+$/.test(form[name])){
                status[name].status = 'error';
                status[name].tip = '密码不得由纯数字或字母组成，建议采取组合的方式提高密码强度!';
            }
            else{
                status[name].status = 'success';
                status[name].tip = '';
            }
        }
        //管理员分类验证
        if(name === 'adminType'){
            status[name].status = 'success';
            status[name].tip = '';
        }
        //员工姓名验证
        if(name === 'employeeName'){
            if(form[name].length < 2 || form[name].length > 16){
                status[name].status = 'error';
                status[name].tip = '员工姓名必须在2至16个字符之间!';
            }else{
                status[name].status = 'success';
                status[name].tip = '';
            }
        }
        this.setState({ formStatus: status });
    }
    //输入字段
    inputField(value,name,cb){
        let form = this.state.form;
        form[name] = value;
        this.setState({ form: form},()=>{
            if(cb !== undefined){
                cb();
            }
        })
    }

    renderItem = (item) => {
        const customLabel = (
            <span className="custom-item">
                {item.title}
             </span>
        );

        return {
            label: customLabel, // for displayed item
            value: item.title, // for title and filter matching
        };
    }

    render(){
        return (
            <div className="content shadow-1px">
                <div className="content-title">
                    管理用户基本信息
                    <span className={css['block-title-ps']}>注：带 "<span style={{ color: '#1756a5',fontSize: '14px' }}>*</span>" 为必填项</span>
                </div>
                <div style={{padding: '30px'}}>
                    <Form layout="vertical">
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    label="用户名"
                                    validateStatus={this.state.formStatus.username.status}
                                    help={this.state.formStatus.username.tip}
                                    hasFeedback
                                    required
                                >
                                    <Input type="text" onBlur={()=> {this.validateInput('username')}} onChange={(e)=>{this.inputField(e.target.value,'username')}} value={this.state.form.username}/>
                                </FormItem>
                            </Col>
                            <Col offset={4} span={8}>
                                <FormItem
                                    label="部门名称"
                                    validateStatus={this.state.formStatus.departmentName.status}
                                    help={this.state.formStatus.departmentName.tip}
                                    hasFeedback
                                    required
                                >
                                    <Input type="text" onBlur={()=> {this.validateInput('departmentName')}} onChange={(e)=>{this.inputField(e.target.value,'departmentName')}} value={this.state.form.departmentName}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    label="密码"
                                    validateStatus={this.state.formStatus.password.status}
                                    help={this.state.formStatus.password.tip}
                                    hasFeedback
                                    required
                                >
                                    <Input type="password" onBlur={()=> {this.validateInput('password')}} onChange={(e)=>{this.inputField(e.target.value,'password')}} value={this.state.form.password}/>
                                </FormItem>
                            </Col>
                            <Col offset={4} span={8}>
                                <FormItem
                                    label="管理员分类"
                                    validateStatus={this.state.formStatus.adminType.status}
                                    help={this.state.formStatus.adminType.tip}
                                    hasFeedback
                                    required
                                >
                                    <Select  onChange={(value)=>{this.inputField(value,'adminType',()=>{this.validateInput('adminType'); this.setState({ isManager: value === 'manager' })})}}  value={this.state.form.adminType}>
                                        <Select.Option value="salemen">业务员</Select.Option>
                                        <Select.Option value="manager">分管领导</Select.Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    label="员工姓名"
                                    validateStatus={this.state.formStatus.employeeName.status}
                                    help={this.state.formStatus.employeeName.tip}
                                    hasFeedback
                                    required
                                >
                                    <Input type="text" onBlur={()=> {this.validateInput('employeeName')}} onChange={(e)=>{this.inputField(e.target.value,'employeeName')}} value={this.state.form.employeeName}/>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    { !this.state.isManager ? <Button type="primary" >更新基本信息</Button> : ''}
                </div>

                { this.state.isManager ?
                    <div>
                        <div className={css['block-title']}>
                            添加管理的业务员
                        </div>
                        <div style={{ padding: '30px' }}>
                            <div style={{ marginLeft: '-30px' }}>
                                <Transfer
                                    dataSource={mockData}
                                    selectedKeys={this.state.selectedSalemen}
                                    targetKeys={this.state.mySalemen}
                                    onChange={this.handleSalemenChange}
                                    onSelectChange={this.handleSelectSalemen}
                                    render={this.renderItem}
                                    listStyle={{ width: '240px', height: '340px',margin: '0 30px' }}
                                    titles={['未分配的业务员','已管理的业务员']}
                                />
                            </div>
                            <Button style={{ marginTop: '40px' }} type="primary">保存</Button>
                        </div>
                    </div>
                    : '' }

            </div>
        )
    }
}

export default AddUser;