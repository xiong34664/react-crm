import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Bundle from './bundle';
import AppState from '@src/Mobx/AppState';
import {Provider} from 'mobx-react'



// 路由按需加载
const Index = (props) => (
    <Bundle load={() => import(/* webpackChunkName: "Index" */'../pages/Index/App')}>
        {(Index) => <Provider  store={AppState}><Index {...props}/></Provider>}
    </Bundle>
);

const NoMatch = (props)=> (
    <Bundle load={() => import(/* webpackChunkName: "Nomatch" */'../pages/404/NoMatch')}>
        {(NoMatch) => <NoMatch {...props}/>}
    </Bundle>
);
const Home = (props) => (
    <Bundle load={() => import(/* webpackChunkName: "Home" */'../pages/Home')}>
        {(Home) => <Home {...props}/>}
    </Bundle>
);
const AddUser = (props) => (
    <Bundle load={() => import(/* webpackChunkName: "AddUser" */'../pages/AdminAddUser/index')}>
        {(AddUser) => <AddUser {...props}/>}
    </Bundle>
);
const SystemConfig = (props)=> (
    <Bundle load={() => import(/* webpackChunkName: "Test" */'../pages/AdminSystemConfig/index')}>
        {(SystemConfig) => <SystemConfig {...props}/>}
    </Bundle>
);
const Crm = (props)=> (
    <Bundle load={() => import(/* webpackChunkName: "Test" */'../pages/Crm')}>
        {(Crm) => <Crm {...props}/>}
    </Bundle>
);
const AddClient = (props) => (
    <Bundle load={()=> import(/* webpackChunkName: "AddUser" */'../pages/AddClient/index')}>
        {(AddClient) => <AddClient {...props} />}
    </Bundle>
);

const routerMap=[
    { path: '/index/', component: Index, },
    { path: '/', component: Index, exact: true},
    { path: '*', component: NoMatch, exact: true },
];

const IndexRouterMap = [
    { path: '/index/systemConfig', component: SystemConfig, exact: true },
    { path: '/index/home', component: Home, exact: true },
    { path: '/index/addUser', component: AddUser, exact: true },
    { path: '/index/crm', component: Crm, exact: true },
    { path: '/index/crm/addClient', component: AddClient, exact: true },
    { path: '/index/*', component: NoMatch, exact: true },
];


export const IndexRouters = () => (
    <Router>
        <Switch>
            {IndexRouterMap.map((router)=>
                <Route key={router.path} exact={router.exact} path={router.path} component={router.component}/>
            )}
        </Switch>
    </Router>
);
export const Routers = () => (
    <Router>
        <Switch>
            {routerMap.map((router)=>
                <Route key={router.path} exact={router.exact} path={router.path} component={router.component}/>
            )}
        </Switch>
    </Router>
);


