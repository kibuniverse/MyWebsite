import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { HomeOutlined, UserOutlined, CalendarOutlined, FlagOutlined} from '@ant-design/icons';
import '../../styles/blogDetail.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import axios from 'axios'
import servicePath from '../../config/apiurl'
import { getPageSendParas } from '../../static/js/jsTool.js'
const LeftComponent = props => {
    const renderer = new marked.Renderer()
    marked.setOptions = ({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize:false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
    })
    const [articleDetail, setArticle] = useState([])
    const [html, setHtml] = useState('加载中..., 请稍等')
    let id = getPageSendParas().get('id');
    useEffect(() => {
        axios(servicePath.getArticleById + `/${id}`).then(res => {
            console.log(res.data.data)
            setArticle(res.data.data[0])
            setHtml(marked(res.data.data[0].articleContent))
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
            <div className='detail-content'
                dangerouslySetInnerHTML={{__html:html}}
            >
            </div>  
        </div>
    )
}

export default LeftComponent