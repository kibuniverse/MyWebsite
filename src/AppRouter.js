import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import List from './components/list/Index.js'


function AppRouter() {
    return (
        <Router>
            <ul>
                <li> <Link to="/">首页</Link> </li>
                <li><Link to="/list/">列表</Link> </li>
            </ul>
            <Route path="/list/:typeId" component={List} />
        </Router>
    )
}

export default AppRouter