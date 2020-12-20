import React, { Component } from 'react'
import { NavBar } from 'antd-mobile';
import axios from 'axios'
import './index.scss'
function formatCityListData(List) {
    let cityObj = {}
    for (let i = 0; i < List.length; i++) {
        let item = List[i]
        let key = item.short.substr(0, 1)
        if (cityObj[key]) {
            cityObj[key].push(item)
        } else {
            cityObj[key] = [item]
        }
    }
    // 渠道cityObj  所有属性名(key) 然后排序  排序按照字母大小排序
    let cityIndex = Object.keys(cityObj).sort()
    return {
        cityObj, cityIndex
    }
}
export default class index extends Component {

    async getCityListData() {

        const res = await axios.get('http://157.122.54.189:9060/area/city?level=1')
        // console.log(res.data.body);
        //将请求的数据 改造成可以渲染的结构
        const { cityIndex, cityObj } = formatCityListData(res.data.body);

        console.log(cityIndex, cityObj);
    }
    componentDidMount() {
        this.getCityListData()
    }
    render() {
        return (
            <div className='citylist-wraper'>
                <NavBar
                    mode="light"
                    icon={<i className='iconfont icon-back'></i>}
                    onLeftClick={() => this.props.history.go(-1)}
                >城市列表</NavBar>
            </div>
        )
    }
}
