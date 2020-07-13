import React, {useState, useEffect} from 'react'
import {Row, Col} from 'antd'
import '../../styles/list.css'
import Author from '../HomePage/Author.jsx'
import LeftContent from '../HomePage/LeftContent.jsx'
import axios from 'axios'
import servicePath from '../../config/apiurl'
import { getPageSendParas } from '../../static/js/jsTool.js'
function List(props) {
    const [myList, setMyList] = useState([])
    useEffect(() => {
        let typeId = getPageSendParas().get('typeId')
        console.log(typeId)
        axios(`${servicePath.getArticleListByTypeId}/${typeId}`).then(res => {
            setMyList(res.data.data)
            console.log(res.data)
        })
    }, [])
    return (
        <div className='List'>
            <Row className='commMain' justify='center'>
                <Col className='commLeft commLR' xs={24} sm={24} md={16} lg={15} sl={14}>
                    <LeftContent 
                        myList={myList}
                    />
                </Col>
                <Col className='commRight commLR' xs={0} sm={0} md={6} lg={5}>
                    <Author />
                </Col>
            </Row>
        </div>
    )
}


export default List