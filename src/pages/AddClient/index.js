import React,{Component} from 'react';
import AdminAddClient from '../AdminAddClient/index';
import NoMatch from '../404/NoMatch';
class AddClient extends Component {
    constructor(props) {
        super(props);
        this.template = NoMatch;
        switch (localStorage.getItem('role')) {
            case 'admin':
                this.template = AdminAddClient;
                break;
            default: 
                break;
        }
    }

    render() {
        return <this.template />
    }
}
export default AddClient;
