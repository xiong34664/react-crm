import {post} from '../utils/utils';
const Config = {
    // host: 'http://localhost:3000',

    // getList: '/real/wizard',
};

// export function GetList(data){
//     return post(Config.host + Config.getList,data,false);
// }
au = 'admin client'
config = {
    a: {
        url: '',
        name: '',
        title: '',
        icon: '',
        au: '',
    },
    b: {
        url: '',
        name: '',
        title: '',
        icon: '',
        au: '',
    },
    c: {
        url: '',
        name: '',
        title: '',

        icon: '',
        au: '',
    }
}

export function test(data){
    return post(Config)
}