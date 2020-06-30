import React from 'react'
import {Avatar, Divider} from 'antd'
import {GithubOutlined} from '@ant-design/icons'
const Auther = () => {
    return (
        <div className='author-info'>
            <div><Avatar size={80} src='https://my.xiyoumobile.com/f45af8c8bae63f074608610e5cfbabf1.webp' /></div>
            <div className='author-motto'>
                It takes time to get good at coding.
            </div>
            <Divider>github</Divider>
            <GithubOutlined onClick={() => {window.location.href='https://github.com/kibuniverse'}}/>
        </div>
    )
}

export default Auther