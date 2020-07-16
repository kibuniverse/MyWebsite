import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { DesktopOutlined, PieChartOutlined, FileOutlined, UserOutlined } from '@ant-design/icons'
import AddArticle from './AddArticle.jsx'
import ArticleList from './ArticleList.jsx'
import servicePath from '../config/apiUrl.js'
import AdminMessageSet from './AdminMessageSet.jsx'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex = props => {

    const [collapsed, setCollapesd] = useState(false)
    const [showComponent, setShowComponent] = useState('addArticle')
    const [modificedArticleId, setModificedArticleId] = useState(0)
    const onCollapse = collapsed => {
        setCollapesd(collapsed)
    }

    // 条件渲染组件
    const ComponentRouter = () => {
        switch(showComponent) {
            case 'addArticle': 
                return <AddArticle />
            case 'articleList':
                return <ArticleList 
                        setShowComponent={setShowComponent}
                        setModificedArticleId={setModificedArticleId}
                        />
            case 'modificArticle':
                return <AddArticle id={modificedArticleId} />
            case 'setAdminMessage':
                return <AdminMessageSet />
            default: 
                return <AddArticle />
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        工作台
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<FileOutlined />} title="文章管理">
                        <Menu.Item key="3" onClick={() => {setShowComponent('addArticle')}}>添加文章</Menu.Item>
                        <Menu.Item key="4"  onClick={() => {setShowComponent('articleList')}}>文章列表</Menu.Item>
                        {/* <Menu.Item key="5"></Menu.Item> */}
                    </SubMenu>
                    <Menu.Item key="2" icon={<UserOutlined />} onClick={() => {setShowComponent('setAdminMessage')}}>
                        修改信息
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <ComponentRouter />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>blog system admin page</Footer>
            </Layout>
        </Layout>
    )
}

export default AdminIndex