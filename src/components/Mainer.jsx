import React from 'react'
import {Row, Col} from 'antd'
import LeftContent from './LeftContent.jsx'
import RightContent from './RightContent.jsx'
import '../styles/mainer.css'

function Mainer(props) {
    return (
        <div className='mainer'>
            <Row className='commMain' justify='center'>
                <Col className='commLeft commLR' xs={24} sm={24} md={16} lg={15} sl={14}>
                    <LeftContent />
                </Col>
                <Col className='commRight commLR' xs={0} sm={0} md={6} lg={5}>
                    <RightContent />
                </Col>
            </Row>
        </div>
    )
}


export default Mainer