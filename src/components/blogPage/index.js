import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Mainer from './Mainer.jsx'
import Header from '../HomePage/Header.jsx'
import '../../static/styles/base.css'

const App = () => (
    <div>
        <Header />
        <Mainer />
    </div>
    
)

ReactDOM.render(<App />, document.getElementById('root'))

