import React, { useState, useEffect } from 'react';
import '../styles/ArticleList.css'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl.js'
const { confirm } = Modal;

const ArticleList = props => {
    const [list, setList] = useState([])
    useEffect(() => {
        updateList()
        console.log(props)
    }, [])
    const updateList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true
        }).then(res => {
            setList(res.data.data)
        })
    }
    const deleteArticle = id => {
        confirm({
            title: '确定要删除这篇文章吗?',
            content: '想好了再点确定呦',
            onOk() {
                axios({
                    method: 'get',
                    url: servicePath.deleteArticle +'/'+id,
                    withCredentials: true
                }).then(res => {
                    console.log(res.data)
                    updateList()
                })
            }
        })
    }
    return (
        <div>
            <List
                header={
                    <Row className='list-div'>
                        <Col span={4}>
                            标题
                        </Col>
                        <Col span={4}>
                            类别
                        </Col>
                        <Col span={4}>
                            发布时间
                        </Col>
                        <Col span={5}>
                            简介
                        </Col>
                    </Row>
                }
                bordered
                dataSource = {list}
                renderItem = {item => (
                    <List.Item>
                        <Row className='list-div'>
                            <Col span={4}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {new Date(item.addTime).toLocaleString().split(' ')[0]}
                            </Col>
                            <Col span={5}>
                                {item.introduce}
                            </Col>
                            <Col span={4} className='change-delete-box'>
                                <Button 
                                    type='primary' 
                                    onClick={() => {
                                        props.setModificedArticleId(item.id);
                                        props.setShowComponent('modificArticle');
                                    }}>
                                修改
                                </Button>
                                <Button onClick={() => {deleteArticle(item.id)}}>删除</Button>
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