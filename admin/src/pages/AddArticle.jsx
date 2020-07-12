import React, { useState } from 'react'
import { Row, Col, Select, Input } from 'antd'
import '../styles/AddArticle.css'
const { Option } = Select
const { TextArea } = Input

const AddArticle = () => {
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
                <Row gutter={4}>
                    {/* 编辑页面 */}
                    <Col span={12}>
                        <TextArea
                            className='markdown-content'
                            placeholder='注意尽量使用markDown格式呦~'
                            rows={35}
                        />
                    </Col>
                    <Col span={12}>
                        <div className='mark-transform'>markdown</div>
                    </Col>
                </Row>
            </Col>
            {/* 右边更多信息 */}
            <Col span={6}>
                more information
                </Col>
        </Row>
    )
}

export default AddArticle