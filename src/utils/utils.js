import axios from 'axios'

function stringifyURL(params,postFlag){
    var paramUrl = '';
    for (var key in params) {
        if (!postFlag && paramUrl === '') {
            paramUrl += '?' + key + '=' + encodeURIComponent(params[key]);
        }
        else {
            paramUrl += '&' + key + '=' + encodeURIComponent(params[key]);
        }
    }
    //console.log(paramUrl);
    return paramUrl;
}

export function post(url,data,isJson = false) {
    return new Promise((resolve, reject) => {
        data = isJson ? data : stringifyURL(data, true);
        let header = isJson ? {'Content-type': 'application/json'} : {'Content-Type': 'application/x-www-form-urlencoded'};
        axios.post(url, data, {
                headers: header
            }
        ).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
export let log = console.log.bind(console);