import React from 'react'
import {Row, Col, Breadcrumb} from 'antd'
import { HomeOutlined, UserOutlined, CalendarOutlined, FlagOutlined} from '@ant-design/icons';
import '../../styles/blogDetail.css'
import ReactMarkdown from 'react-markdown'
import promoieMarkdown from '../../md/promise.md'
const LeftComponent = props => {
    return (
        <div>
            <div className='bread-nav'>
                <Breadcrumb>
                    <Breadcrumb.Item href="http://localhost:8081/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                        <UserOutlined />
                        <span>blog</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>手把手带你使用es6语法实现Promise</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='blog-title'>
                手把手带你使用es6语法实现Promise
            </div>
            <div className='list-icon'>
                <span>
                    <CalendarOutlined />
                    2020-7-2
                </span>
                <span>
                    <FlagOutlined />
                    原生js
                </span>
            </div>          
            <div className='detail-content'>
                <ReactMarkdown 
                    source={promoieMarkdown}
                    escapeHtml={false}
                />
            </div>  
        </div>
    )
}


export default LeftComponent