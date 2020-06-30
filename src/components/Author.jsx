import React from 'react'
import {Avatar, Divider} from 'antd'
import {GithubOutlined} from '@ant-design/icons'
const Auther = () => {
    return (
        <div class='author-info'>
            <div><Avatar size={80} src='https://bkimg.cdn.bcebos.com/pic/f636afc379310a553f378884bc4543a9822610aa?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UyNzI=,xp_5,yp_5' /></div>
            <div className='author-motto'>
                It takes time to get good at coding.
            </div>
            <Divider>github</Divider>
            <GithubOutlined onClick={() => {window.location.href='https://github.com/kibuniverse'}}/>
        </div>
    )
}

export default Auther