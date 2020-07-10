import React, {useState, useEffect} from 'react'
import {Row, Col} from 'antd'
import LeftContent from './LeftContent.jsx'
import RightContent from './RightContent.jsx'
import '../../styles/mainer.css'
import axios from 'axios'
import servicePath from '../../config/apiurl'
const Mainer = () => {
    const [myList, setMyList] = useState([])
    useEffect(() => {
        axios(servicePath.getArticleList).then(res => {
            setMyList(res.data.data)
        })
    }, [])
    return (
        <div className='mainer'>
            <Row className='commMain' type='flex' justify='center'>
                <Col className='commLeft' xs={24} sm={24} md={16} lg={15} sl={14}>
                    <LeftContent myList={myList}/>
                </Col>
                <Col className='commRight' xs={0} sm={0} md={6} lg={5}>
                    <RightContent />
                </Col>
            </Row>
        </div>
    )
}


export default Mainer