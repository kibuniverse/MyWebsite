import React from 'react'
import {Row, Col, Menu} from 'antd'
import {HomeOutlined,  HighlightOutlined} from '@ant-design/icons'
import '../../styles/header.css'

const Header = () => {
    function handleClick(e) {
        console.log(e.key);
        window.location.href='http://localhost:8081'
    }
    return (
        <div className='header'>
            <Row justify='center'>
                <Col xs={24} sm={24} md={10} lg={10}>
                    <span className='headerName'>Ethanykz</span>
                    <span className='haederSign'>welcome my website</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6} offset={4}>
                    <Menu mode='horizontal'>
                        <Menu.Item key='home'>
                            <HomeOutlined />
                            主页
                        </Menu.Item>
                        <Menu.Item key='blog'  onClick={(e) => {handleClick(e)}}>
                            <HighlightOutlined />
                            博客
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
    
}

export default Header