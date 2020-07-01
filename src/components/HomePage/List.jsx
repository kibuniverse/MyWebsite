import React from 'react'
import {Row, Col} from 'antd'
import '../styles/list.css'

function List(props) {
    return (
        <div className='List'>
            <Row className='commMain' justify='center'>
                <Col className='commLeft commLR' xs={24} sm={24} md={16} lg={15} sl={14}>
                    left
                </Col>
                <Col className='commRight commLR' xs={0} sm={0} md={6} lg={5}>
                    right
                </Col>
            </Row>
        </div>
    )
}


export default List