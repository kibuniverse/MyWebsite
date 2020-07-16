import React, { useState, useEffect } from 'react'
import {Avatar, Divider} from 'antd'
import {GithubOutlined} from '@ant-design/icons'
import 
const Auther = () => {
    useEffect(() => {
        
    }, [])
    return (
        <div className='author-info'>
            <div><Avatar size={80} src='https://my.xiyoumobile.com/f45af8c8bae63f074608610e5cfbabf1.webp' /></div>
            <div className='author-motto'>
                It takes time to get good at coding.
            </div>
            <div>你守护的东西，最终也会守护你</div>
            <Divider>github</Divider>
            <GithubOutlined size='large' onClick={() => {window.location.href='https://github.com/kibuniverse'}}/>
        </div>
    )
}

export default Auther