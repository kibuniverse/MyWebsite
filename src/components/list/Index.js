import React from 'react'
import ReactDOM from 'react-dom'
import List from './List.jsx'
import Header from '../HomePage/Header.jsx'
import 'antd/dist/antd.css'
import '../../styles/mainer.css'
import '../../static/styles/base.css'
function App() {
    return (
        <div>
            <Header />
            <List />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))