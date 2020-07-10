import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { HomeOutlined, UserOutlined, CalendarOutlined, FlagOutlined} from '@ant-design/icons';
import '../../styles/blogDetail.css'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import servicePath from '../../config/apiurl'
import { getPageSendParas } from '../../static/js/jsTool.js'
const LeftComponent = props => {
    const [articleDetail, setArticle] = useState([])
    console.log(getPageSendParas)
    let id = getPageSendParas().get('id');
    useEffect(() => {
        axios(servicePath.getArticleById + `/${id}`).then(res => {
            console.log(res.data.data)
            setArticle(res.data.data[0])
        })     
    }, [])

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
                    <Breadcrumb.Item>{articleDetail.title}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='blog-title'>
                {articleDetail.title}
            </div>
            <div className='list-icon'>
                <span>
                    <CalendarOutlined />
                    {new Date(articleDetail.addTime).toLocaleString().split(' ')[0]}
                </span>
                <span>
                    <FlagOutlined />
                    <span>{articleDetail.typeName}</span>
                </span>
            </div>          
            <div className='detail-content'>
                <ReactMarkdown 
                    source={articleDetail.articleContent}
                    escapeHtml={false}
                />
            </div>  
        </div>
    )
}

export default LeftComponent