import React, { useState, useEffect } from 'react'
import { Button, Avatar, Spin, Card, Upload, message, LoadingOutlined, PlusOutlined } from 'antd'
import servicePath from '../config/apiUrl.js'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import '../styles/AdminMessageSetting.css'
import UploadAvatar from '../components/UploadHeaderPortrait.jsx'
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
        }, {
            key: 'tab3',
            tab: '修改密码'
        }
    ]

    const ChangeUserHeaderProtrait = () => {
        return (
            <div className='message-setting'>
                <Avatar src={userHeadPortrait} icons={<UserOutlined />} size={100} className='user-avatar-show' />
                <div>
                    <UploadAvatar />
                </div>
                
            </div>
        )
    }

    const ChangeUserMotto = () => {
        return (
            <div>
                <div className='user-motto'>
                    {userMotto}
                </div>
                <Input 
                    type='text'
                    maxLength={20}
                >请输入座右铭</Input>
            </div>
        )
    }

    const ChangePassword = () => {
        return (
            <div>
                
            </div>
        )
    }
    const contentList = {
        tab1: <ChangeUserHeaderProtrait />,
        tab2: <ChangeUserMotto />,
        tab3: <ChangePassword />
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