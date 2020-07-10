import React, { useState, useEffect } from 'react'
import {List} from 'antd'
import {CalendarOutlined, SnippetsOutlined} from '@ant-design/icons'
import '../../styles/mainer.css' 


const LeftContent = props => {
    return (
        <>
            <List
                header={<div>最新日志</div>}
                itemLayout='vertical'
                dataSource={props.myList}
                renderItem={item => (
                    <List.Item onClick={() => {window.location.href = `http://localhost:8081/blog.html?id=${item.id}`}}>
                        <div className='list-title'>{item.title}</div>
                        <div className="list-icon">
                            <span>
                                <CalendarOutlined twoToneColor="#52c41a"/> 
                                {new Date(item.addTime).toLocaleString().split(' ')[0]}
                            </span>
                            <span>
                                <SnippetsOutlined />
                                {item.typeName}
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