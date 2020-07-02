import React from 'react'
import ReactDOM from 'react-dom'
import Mainer from './Mainer.jsx'
import Header from '../HomePage/Header.jsx'


const App = () => (
    <div>
        <Header />
        <Mainer />
    </div>
    
)


ReactDOM.render(<App />, document.getElementById('root'))

