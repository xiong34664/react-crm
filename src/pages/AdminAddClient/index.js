import React,{Component} from 'react';
import { Row, Col, Form, Input, Select, Checkbox, Button, Table, Modal, DatePicker, Breadcrumb   } from 'antd';
import {withRouter} from 'react-router-dom';
import css from './index.css';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class AddClient extends Component{
    constructor(props){
        super(props);
        this.state = {
            creator: 'admin',
            createTime: new Date().toLocaleString(),
            form: {
                clientName: '',
                department: 'market',
                address: '',
                creditStatus: 'normal',
                approvalStatus: 'approved',
                testItems: [],
                industry: 'it',
                clientSource: '',
                telephone: '',
                fax: 'normal',
                product: '',
                companyProperty: '',
                clientWorth: 'normal',
                numberOfEmployee: 'small',
                demand: '',
            },
            formStatus: {
                clientName: {
                    status: null,
                    tip: '',
                },
                address: {
                    status: null,
                    tip: '',
                },
                testItems: {
                    status: null,
                    tip: '',
                },
                telephone: {
                    status: null,
                    tip: '',
                },
                product: {
                    status: null,
                    tip: '',
                },
                companyProperty: {
                    status: null,
                    tip: '',
                },
                demand: {
                    status: null,
                    tip: '',
                },
            },
            contacts: [
                {
                    key: 0,
                    name: '路路',
                    position: '经理',
                    status: '休假',
                    department: '研发',
                    phone: '027-1111111',
                    mobile: '18191019292',
                    birth: '88-3-30',
                    remark: 'no remarks',

                },
                {
                    key: 1,
                    name: '路路',
                    position: '经理',
                    status: '休假',
                    department: '研发',
                    phone: '027-1111111',
                    mobile: '18191019292',
                    birth: '88-3-30',
                    remark: 'no remarks',

                },
                {
                    key: 2,
                    name: '路路',
                    position: '经理',
                    status: '休假',
                    department: '研发',
                    phone: '027-1111111',
                    mobile: '18191019292',
                    birth: '88-3-30',
                    remark: 'no remarks',

                },
            ],
            visible: false,
            contactsForm: {
                name: '',
                gender: 'male',
                position: '',
                status: 'on',
                department: '',
                phone: '',
                mobile: '',
                birth: null,
                remark: '',
                fax: '',
                qq: '',
            },
            contactsFormStatus: {
                name: {
                    status: null,
                    tip: '',
                }
            }
        };
        this.flag = null;
        this.contactsColumns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '职位',
                dataIndex: 'position',
                key: 'position',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '部门',
                dataIndex: 'department',
                key: 'department',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '手机',
                dataIndex: 'mobile',
                key: 'moboild',
            },
            {
                title: '生日',
                dataIndex: 'birth',
                key: 'birth',
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
            },
            {
                title: '操作',
                key: 'operation',
                render: (text,col,index)=>{
                    return (
                        <div>
                            <a href="#">回收</a>
                            <a href="#">删除</a>
                        </div>
                    )
                }
            },

        ];
        this.inputField = this.inputField.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleDialogCancel = this.handleDialogCancel.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.validateContactsInput = this.validateContactsInput.bind(this);
        this.inputContactsField = this.inputContactsField.bind(this);
        this.saveContact = this.saveContact.bind(this);
    }
    componentDidMount(){
        this.flag = setInterval(()=>{
            this.setState({
                createTime: new Date().toLocaleString()
            })
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.flag);
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
    inputContactsField(value,name,cb){
        let form = this.state.contactsForm;
        form[name] = value;
        this.setState({ form: form},()=>{
            if(cb !== undefined){
                cb();
            }
        })
    }
    //验证方法
    validateInput(name){
        let form = this.state.form;
        let status = this.state.formStatus;
        if(form[name] !== undefined && (form[name] === '' || form[name].length === 0)){
            status[name].status = 'error';
            status[name].tip = '输入值不得为空!';
            this.setState({ formStatus: status });
            return;
        }
        //客户名验证
        if(name === 'clientName'){
            if(form[name].length < 2 || form[name].length > 16){
                status[name].status = 'error';
                status[name].tip = '客户名称必须在2至16个字符之间!';
            }else{
                status[name].status = 'success';
                status[name].tip = '';
            }
        }

        if(name === 'address'){
            if(form[name].length > 0){
                status[name].status = 'success';
                status[name].tip = '';
            }
        }

        if(name === 'testItems'){
            if(form[name].length > 0){
                status[name].status = 'success';
                status[name].tip = '';
            }
        }

        if(name === 'telephone'){
            if(/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(form[name])){
                status[name].status = 'success';
                status[name].tip = '';
            }
            else if(/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/.test(form[name])){
                status[name].status = 'success';
                status[name].tip = '';
            }
            else{
                status[name].status = 'error';
                status[name].tip = '请输入正确的电话号码';
            }
        }

        if(name === 'product'){
            status[name].status = 'success';
            status[name].tip = '';
        }

        if(name === 'companyProperty'){
            status[name].status = 'success';
            status[name].tip = '';
        }

        if(name === 'demand') {
            status[name].status = 'success';
            status[name].tip = '';
        }

        this.setState({ formStatus: status });
    }

    validateContactsInput(name){
        let form = this.state.contactsForm;
        let status = this.state.contactsFormStatus;
        if(form[name] !== undefined && (form[name] === '' || form[name].length === 0)){
            status[name].status = 'error';
            status[name].tip = '输入值不得为空!';
            this.setState({ contactsFormStatus: status });
            return;
        }
    }
    handleDialogCancel(){
        this.setState({ visible: false });
    }
    handleDialogOpen(){
        this.setState({ visible: true });
    }
    //保存联系人
    saveContact(){
        let flag = false;
        for(let key in this.state.contactsFormStatus){
            this.validateContactsInput(key);
            if(this.state.contactsFormStatus[key].status === 'error'){
                flag = true;
                break;
            }
        }
        if(!flag){
        //    全部通过验证
            let contact = JSON.parse(JSON.stringify(this.state.contactsForm));
            contact.key = this.state.contacts.length;

            contact.birth = contact.birth === null ? '' : contact.birth.substring(0,10);
            let contacts = this.state.contacts;
            contacts.push(contact);
            this.setState({ contacts: contacts },()=>{
                this.handleDialogCancel();
            });
        }
    }
    render(){
        return (
            <div>
                <Modal
                    title="新增联系人"
                    visible={this.state.visible}
                    footer={null}
                    width={800}
                    onCancel={this.handleDialogCancel}
                >
                    <Form
                        layout={"vertical"}
                    >
                        <Row gutter={30}>
                            <Col span={12}>
                                <FormItem
                                    label="联系人"
                                    validateStatus={this.state.contactsFormStatus.name.status}
                                    help={this.state.contactsFormStatus.name.tip}
                                    hasFeedback
                                    required
                                >
                                    <Input type="text" value={this.state.contactsForm.name} onBlur={()=>{this.validateContactsInput('name')}} onChange={(e)=>{ this.inputContactsField(e.target.value,'name') }} />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="性别"
                                >
                                    <Select  value={this.state.contactsForm.gender}  onChange={(value)=>{ this.inputContactsField(value,'gender') }}>
                                        <Option value='male'>男</Option>
                                        <Option value='female'>女</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={12}>
                                <FormItem
                                    label="职务"
                                >
                                    <Input type="text" value={this.state.contactsForm.position} onChange={(e)=>{ this.inputContactsField(e.target.value,'position') }} />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="状态"
                                >
                                    <Select  value={this.state.contactsForm.status}  onChange={(value)=>{ this.inputContactsField(value,'status') }}>
                                        <Option value='on'>在职</Option>
                                        <Option value='off'>离职</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={12}>
                                <FormItem
                                    label="部门"
                                >
                                    <Input type="text" value={this.state.contactsForm.department} onChange={(e)=>{ this.inputContactsField(e.target.value,'department') }} />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="电话"
                                >
                                    <Input type="text" value={this.state.contactsForm.phone} onChange={(e)=>{ this.inputContactsField(e.target.value,'phone') }} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={12}>
                                <FormItem
                                    label="传真号"
                                >
                                    <Input type="text" value={this.state.contactsForm.fax} onChange={(e)=>{ this.inputContactsField(e.target.value,'fax') }} />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="手机号"
                                >
                                    <Input type="text" value={this.state.contactsForm.mobile} onChange={(e)=>{ this.inputContactsField(e.target.value,'mobile') }} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={12}>
                                <FormItem
                                    label="生日"
                                >
                                    <DatePicker style={{ width: '100%' }} value={this.state.contactsForm.birth} onChange={(date,datestr)=>{ this.inputContactsField(date,'birth') }}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="QQ"
                                >
                                    <Input type="text" value={this.state.contactsForm.qq} onChange={(e)=>{ this.inputContactsField(e.target.value,'qq') }} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="备注"
                                >
                                    <Input.TextArea  value={this.state.contactsForm.remark} onChange={(e)=>{ this.inputContactsField(e.target.value,'remark') }} />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <div>
                        <Button onClick={this.saveContact} type="primary" style={{ marginRight: '20px'}}>保存</Button>
                        <Button onClick={this.handleDialogCancel} type="default">取消</Button>
                    </div>
                </Modal>
                <Breadcrumb style={{ marginBottom: '20px' }}>
                    <Breadcrumb.Item><a href="#" onClick={(e)=>{e.preventDefault(); this.props.history.push('/index/crm'); }}>客户管理</a></Breadcrumb.Item>
                    <Breadcrumb.Item>添加客户</Breadcrumb.Item>
                </Breadcrumb>
                <div className="block shadow-1px">
                    <div className="block-title">
                        基本信息
                        <span className={css['block-title-ps']}>注：带 "<span style={{ color: '#1756a5',fontSize: '14px' }}>*</span>" 为必填项</span>
                    </div>
                    <div style={{ padding: '30px' }}>
                        <Form layout="vertical">
                            <Row>
                                <Col span={10}>
                                    <FormItem
                                        label="客户名"
                                        validateStatus={this.state.formStatus.clientName.status}
                                        help={this.state.formStatus.clientName.tip}
                                        hasFeedback
                                        required
                                    >
                                        <Input type="text" onBlur={()=> {this.validateInput('clientName')}} onChange={(e)=>{this.inputField(e.target.value,'clientName')}} value={this.state.form.clientName}/>
                                    </FormItem>
                                </Col>
                                <Col offset={2} span={10}>
                                    <FormItem
                                        label="部门"
                                        required
                                    >
                                        <Select onChange={(value)=>{this.inputField(value,'department')}} value={this.state.form.department}>
                                            <Option value="market">市场部</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <FormItem
                                        label="地址"
                                        validateStatus={this.state.formStatus.address.status}
                                        help={this.state.formStatus.address.tip}
                                        hasFeedback
                                        required
                                    >
                                        <Input type="text" onBlur={()=> {this.validateInput('address')}} onChange={(e)=>{this.inputField(e.target.value,'address')}} value={this.state.form.address}/>
                                    </FormItem>
                                </Col>
                                <Col offset={2} span={10}>
                                    <FormItem
                                        label="信用状态"
                                    >
                                        <Select onChange={(value)=>{this.inputField(value,'creditStatus')}} value={this.state.form.creditStatus}>
                                            <Option value="normal">正常</Option>
                                            <Option value="discredit">失信</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <FormItem
                                        label="认可状态"
                                        required
                                    >
                                        <Select onChange={(value)=>{this.inputField(value,'approvalStatus')}} value={this.state.form.approvalStatus}>
                                            <Option value="approved">认可</Option>
                                            <Option value="unrecognized">未认可</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col offset={2} span={10}>
                                    <FormItem
                                        label="检测项目"
                                        validateStatus={this.state.formStatus.testItems.status}
                                        help={this.state.formStatus.testItems.tip}
                                        required
                                    >
                                        <CheckboxGroup options={[{label:'计量',value:'measurement'},{label:'电子',value:'electronics'},{label:'理化',value:'physicochemical'},{label:'可靠性',value:'reliability'},{label:'其他',value:'others'}]} value={this.state.form.testItems} onChange={(value)=>{this.inputField(value,'testItems',()=>{this.validateInput('testItems')})}} />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <FormItem
                                        label="行业"
                                        required
                                    >
                                        <Select onChange={(value)=>{this.inputField(value,'industry')}} value={this.state.form.industry}>
                                            <Option value="it">IT</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col offset={2} span={10}>
                                    <FormItem
                                        label="客户来源"
                                    >
                                        <Input onChange={(e)=>{this.inputField(e.target.value,'clientSource')}} value={this.state.form.clientSource}>
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <FormItem
                                        label="电话"
                                        validateStatus={this.state.formStatus.telephone.status}
                                        help={this.state.formStatus.telephone.tip}
                                        hasFeedback
                                        required
                                    >
                                        <Input onBlur={()=>{this.validateInput('telephone')}} onChange={(e)=>{this.inputField(e.target.value,'telephone')}} value={this.state.form.telephone}>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col offset={2} span={10}>
                                    <FormItem
                                        label="传真"
                                    >
                                        <Select onChange={(value)=>{this.inputField(value,'fax')}} value={this.state.form.fax}>
                                            <Option value="normal">正常</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <FormItem
                                        label="公司产品"
                                        validateStatus={this.state.formStatus.product.status}
                                        help={this.state.formStatus.product.tip}
                                        hasFeedback
                                        required
                                    >
                                        <Input onBlur={()=>{this.validateInput('product')}} onChange={(e)=>{this.inputField(e.target.value,'product')}} value={this.state.form.product}>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col offset={2} span={10}>
                                    <FormItem
                                        label="公司性质"
                                        validateStatus={this.state.formStatus.companyProperty.status}
                                        help={this.state.formStatus.companyProperty.tip}
                                        hasFeedback
                                        required
                                    >
                                        <Input onBlur={()=>{this.validateInput('companyProperty')}} onChange={(e)=>{this.inputField(e.target.value,'companyProperty')}} value={this.state.form.companyProperty}>
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <FormItem
                                        label="客户价值"
                                        required
                                    >
                                        <Select onChange={(value)=>{this.inputField(value,'clientWorth')}} value={this.state.form.clientWorth}>
                                            <Option value="normal">一般客户</Option>
                                            <Option value="rare">稀有客户</Option>
                                            <Option value="epic">史诗客户</Option>
                                            <Option value="legend">传说客户</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col offset={2} span={10}>
                                    <FormItem
                                        label="员工人数"
                                        required
                                    >
                                        <Select onChange={(value)=>{this.inputField(value,'numberOfEmployee')}} value={this.state.form.numberOfEmployee}>
                                            <Option value="small">0-20</Option>
                                            <Option value="normal">20-50</Option>
                                            <Option value="large">50-100</Option>
                                            <Option value="huge">100以上</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <FormItem
                                        label="服务需求"
                                        validateStatus={this.state.formStatus.demand.status}
                                        help={this.state.formStatus.demand.tip}
                                        hasFeedback
                                        required
                                    >
                                        <Input onBlur={()=>{this.validateInput('demand')}} onChange={(e)=>{this.inputField(e.target.value,'demand')}} value={this.state.form.demand}>
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <FormItem
                                        label="创建人"
                                    >
                                        <Input disabled value={this.state.creator}>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col offset={2} span={10}>
                                    <FormItem
                                        label="创建时间"
                                    >
                                        <Input disabled value={this.state.createTime}>
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <Button style={{ marginRight: '20px' }} type="primary">确定保存</Button>
                        <Button onClick={this.handleDialogOpen} type="primary">新建联系人</Button>
                    </div>
                </div>
                <div className="block shadow-1px">
                    <div className="block-title">
                        联系人信息
                    </div>
                    <div style={{ padding: '30px' }}>
                        <Table
                            pagination={false}
                            columns={this.contactsColumns}
                            dataSource={this.state.contacts}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddClient);