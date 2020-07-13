import React, { useState, useEffect } from 'react'
import { Row, Col, Select, Input, Button, message, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import '../styles/AddArticle.css'
import marked from 'marked'
import axios from 'axios'
import servicePath from '../config/apiUrl.js'
const { Option } = Select
const { TextArea } = Input

const AddArticle = props => {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别
    const [isLoading, setIsLoading] = useState(false)
    const checkPass = false
    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(res => {
            console.log(res.data.data)
            if (res.data.data == "未登录") {
                localStorage.removeItem('openId')
                props.history.push('/')
            } else {
                setTypeInfo(res.data.data)
            }
        })
    }

    useEffect(() => {
        getTypeInfo()
    }, [])

    const blogContentChange = e => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const introduceContentChange = e => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const selectTypeHandler = value => {
        console.log(value)
        setSelectType(value)
    }

    const checkLayout = () => {
        if (!selectedType) {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        }
        message.success('检验通过')
        return true
    }
    const saveArticle = () => {
        setIsLoading(true)
        checkLayout()
        setIsLoading(false)
    }

    const issueArticle = () => {
        if(checkLayout()) {
            console.log('发布文章')
        }
    }
    return (
        <Spin spinning={isLoading} indicator={LoadingOutlined}>
            <Row gutter={5}>
                {/* 左边写博客内容 */}
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input placeholder='在这里写博客标题' size='large' value={articleTitle} onChange={e => { setArticleTitle(e.target.value) }} />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size='large' onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        {/* 编辑页面 */}
                        <Col span={11}>
                            <TextArea
                                value={articleContent}
                                className='markdown-content'
                                placeholder='注意尽量使用markdown格式呦~'
                                rows={35}
                                onChange={blogContentChange}
                                onPressEnter={blogContentChange}
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className='mark-transform'
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>
                {/* 右边更多信息 */}
                <Col span={6}>
                    <Row >
                        <Col span={24}>
                            <TextArea
                                value={introducemd}
                                rows={5}
                                placeholder='文章简介'
                                onChange={introduceContentChange}
                                onPressEnter={introduceContentChange}
                            />
                        </Col>
                        <div
                            className="introduce-view"
                            dangerouslySetInnerHTML={{ __html: introducehtml }}
                        >
                        </div>

                        <Col span={24} className='store-push-article'>
                            <Button size='large' onClick={saveArticle}>暂存文章</Button>
                            <Button size='large' type='primary' onCilck={issueArticle}>发布文章</Button>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Spin>
    )
}

export default AddArticle