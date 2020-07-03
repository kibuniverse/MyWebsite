import React from 'react'
import {Row, Col} from 'antd'
import '../../styles/header.css'
import '../../styles/mainer.css'
import Author from '../HomePage/Author.jsx'
import LeftComponent from './BlogLeftComponent.jsx'

const Mainer = props => {
    return (
        <div className='mainer'>
            <Row className='commMain' type='flex' justify='center'>
                <Col className='commLeft' xs={24} sm={24} md={16} lg={15} sl={14}>
                    <LeftComponent />
                </Col>
                <Col className='commRight' xs={0} sm={0} md={6} lg={5}>
                    <Author />
                </Col>
            </Row>
        </div>
    )
}




export default Mainer