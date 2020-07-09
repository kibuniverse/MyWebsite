import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import List from './components/list/Index.js'

const history = createBrowserHistory()

function AppRouter() {
    return (
        <Router history={history}>
            <ul>
                <li> <Link to="/">首页</Link> </li>
                <li><Link to="/list/">列表</Link> </li>
            </ul>
            <Route path="/list/:typeId" component={List} />
        </Router>
    )
}

export default AppRouter