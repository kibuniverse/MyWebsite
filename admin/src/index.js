import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Login from './components/Login.jsx'


const App = () => (
  <div>
    <Login />
  </div>
)
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

