import React, { useState, useEffect } from 'react'
import {List} from 'antd'
import {CalendarOutlined} from '@ant-design/icons'
import '../../styles/mainer.css' 
import axios from 'axios'


const LeftContent = (list) => {
    const [myList, setMyList] = useState([])
    useEffect(() => {
        axios('http://127.0.0.1:7001/default/getArticleList').then(res => {
            setMyList(res.data.data)
        })     
    }, [])
    return (
        <>
            <List
                header={<div>最新日志</div>}
                itemLayout='vertical'
                dataSource={myList}
                renderItem={item => (
                    <List.Item>
                        <div className='list-title'>{item.title}</div>
                        <div className="list-icon">
                            <span>
                                <CalendarOutlined twoToneColor="#52c41a"/> 
                                {item.addTime}
                            </span>
                        </div>
                        <div className="list-introduce">{item.introduce}</div>  
                    </List.Item>
                )}
            />
        </>
    )  
}



export default LeftContent