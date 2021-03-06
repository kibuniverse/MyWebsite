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
    const [introduce, setIntroduce] = useState()            //简介的markdown内容
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别
    const [isLoading, setIsLoading] = useState(false)

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
    const getArticleById = id => {
        axios({
            method: 'get',
            url: servicePath.getArticleById + '/' + id,
            header: { 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then(res => {
            console.log(res.data.data[0])
            let article = res.data.data[0]
            setArticleTitle(article.title)
            setIntroduce(article.introduce)
            setArticleContent(article.articleContent)
            let html = marked(article.articleContent)
            setMarkdownContent(html)
        })
    }
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(res => {
            if (res.data.data === "未登录") {
                localStorage.removeItem('openId')
                props.history.push('/')
            } else {
                setTypeInfo(res.data.data)
            }
        })
    }
    
    useEffect(() => {
        getTypeInfo()
        console.log(props.id)
        if(props.id) {
            setArticleId(props.id)
            getArticleById(props.id)
        }
    }, [])

    const blogContentChange = e => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        console.log(html)
        setMarkdownContent(html)
    }

    const introduceContentChange = e => {
        setIntroduce(e.target.value)
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
        } else if (!introduce) {
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
            setIsLoading(true)
            let articleInfo = {
                typeId: selectedType,
                title: articleTitle,
                addTime: new Date().getTime(),
                introduce: introduce,
                articleContent: articleContent
            }
            let url = servicePath.addArticle
            //  如果 articleId 不为零, 则使用更新文章接口, 并在参数中增加文章id
            if(articleId != 0) {
                url = servicePath.updateArticle
                articleInfo.id = articleId
            }

            axios({
                method: 'post',
                url: url,
                data: articleInfo,
                header:{ 'Access-Control-Allow-Origin':'*' },
                withCredentials: true
            }).then(res => {
                console.log(res)
                setArticleId(res.data.insertId)
                setIsLoading(false)
            })
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
                                value={introduce}
                                rows={5}
                                placeholder='文章简介'
                                onChange={introduceContentChange}
                                onPressEnter={introduceContentChange}
                            />
                        </Col>
                        <Col span={24} className='store-push-article'>
                            <Button size='large' onClick={saveArticle}>保存</Button>
                            <Button size='large' type='primary' onClick={issueArticle}>发布文章</Button>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Spin>
    )
}

export default AddArticle