import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Bundle from './bundle';



// 路由按需加载
const Index = (props) => (
    <Bundle load={() => import(/* webpackChunkName: "Index" */'../pages/Index/App')}>
        {(Index) => <Index {...props}/>}
    </Bundle>
);

const NoMatch = (props)=> (
    <Bundle load={() => import(/* webpackChunkName: "Nomatch" */'../pages/404/NoMatch')}>
        {(NoMatch) => <NoMatch {...props}/>}
    </Bundle>
);

const Test = (props)=> (
    <Bundle load={() => import(/* webpackChunkName: "Test" */'../pages/test/Test')}>
        {(Test) => <Test {...props}/>}
    </Bundle>
);

const routerMap=[
    { path: '/index/:id', component: Index, exact: true },
    { path: '/', component: Index, exact: true },
    { path: '*', component: NoMatch, exact: true },
];
const IndexRouterMap = [
    { path: '/index/a', component: Test, exact: true },
    { path: '/index/b', component: NoMatch, exact: true },
    { path: '*', component: NoMatch, exact: true },
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


