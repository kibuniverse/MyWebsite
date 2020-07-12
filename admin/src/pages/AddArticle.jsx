import React, { useState } from 'react'
import { Row, Col, Select, Input, Button } from 'antd'
import '../styles/AddArticle.css'
import marked from 'marked'

const { Option } = Select
const { TextArea } = Input

const AddArticle = () => {

    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别

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

    return (
        <Row gutter={5}>
            {/* 左边写博客内容 */}
            <Col span={18}>
                <Row gutter={10}>
                    <Col span={20}>
                        <Input placeholder='在这里写博客标题' size='large' />
                    </Col>
                    <Col span={4}>
                        <Select defaultValue='1' size='large'>
                            <Option value='1'>技术博客</Option>
                            <Option value='2'>无聊想法</Option>
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
                            dangerouslySetInnerHTML={{__html: markdownContent}}
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
                        dangerouslySetInnerHTML={{__html: introducehtml}}
                    >
                    </div>
                    <Col span={24} className='store-push-article'>
                        <Button>暂存文章</Button>
                        <Button type='primary'>发布文章</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AddArticle