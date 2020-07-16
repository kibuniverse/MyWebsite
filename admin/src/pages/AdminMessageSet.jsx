import React, { useState, useEffect } from 'react'
import { Button, Avatar, Spin, Card } from 'antd'
import servicePath from '../config/apiUrl.js'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'

const AdminMessageSet = () => {
    const [userHeadPortrait, setUserHeadProtrait] = useState('')
    const [userMotto, setUserMotto] = useState('加载中, 请稍等')
    const [isLoading, setIsLoading] = useState(true)
    const [key, setKey] = useState('tab1')
    useEffect(() => {
        axios({
            method: 'get',
            url: servicePath.getUserInfo,
            withCredentials: true
        }).then(res => {
            console.log(res)
            setIsLoading(false)
            setUserHeadProtrait(res.data.data[0].headProtrait)
            setUserMotto(res.data.data[0].motto)
        })
    }, [])    
    


    let tabList = [
        {
            key: 'tab1',
            tab: '修改头像'
        }, {
            key: 'tab2',
            tab: '修改签名'
        }
    ]

    const ChangeUserHeaderProtrait = () => {
        return (
            <Spin spinning={false}>
                <Avatar src={userHeadPortrait} icon={<UserOutlined />} size='large'></Avatar>
            </Spin>
        )
    }

    const ChangeUserMotto = () => {
        return (
            <div>
                修改座右铭组件
            </div>
        )
    }

    const contentList = {
        tab1: <ChangeUserHeaderProtrait />,
        tab2: <ChangeUserMotto />
    }

    return (
        <Spin spinning={isLoading}>
            <Card
                style={{ width: '100%' }}
                title='信息设置'
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                    setKey(key)
                }}
                hoverable
            >
                {contentList[key]}
            </Card>
        </Spin>
    )
}


export default AdminMessageSet