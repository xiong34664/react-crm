import {observable,action} from 'mobx';
const appState = observable({
    selectedKey: ['/home']
});
appState.toggleKey = action((key)=>{
    appState.selectedKey = [key]
});

export default appState;