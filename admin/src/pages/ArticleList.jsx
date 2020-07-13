import React, { useState, useEffect } from 'react';
import '../styles/ArticleList.css'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl.js'
const { confirm } = Modal;

const ArticleList = props => {
    const [list, setList] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(res => {
            console.log(res)
            setList(res.data.data)
        })
    }, [])
    return (
        <div>
            <List
                header={
                    <Row className='list-div'>
                        <Col span={8}>
                            标题
                        </Col>
                        <Col span={4}>
                            类别
                        </Col>
                        <Col span={4}>
                            发布时间
                        </Col>
                    </Row>
                }
                bordered
                dataSource = {list}
                renderItem = {item => (
                    <List.Item>
                        <Row className='list-div'>
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {new Date(item.addTime).toLocaleString().split(' ')[0]}
                            </Col>
                            <Col span={4}>
                                <Button type='primary'>修改</Button>
                                <Button >删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            >
            </List>
        </div>
    )
}

export default ArticleList