import React, { Component } from 'react'
import { NavBar } from 'antd-mobile';
import axios from 'axios'
//引入List组件
// https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md
// https://github.com/bvaughn/react-virtualized
import { List, AutoSizer } from 'react-virtualized';
import './index.scss'
import { getCurrentCityInfo } from '../../utils'
//改造数据结构
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
const list = [
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    // And so on...
];
function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
}) {
    return (
        <div key={key} style={style}>
            {list[index]}
        </div>
    );
}
const titleHeight = 36;
const nameHeight = 50;
export default class index extends Component {
    state = {
        cityObj: {},
        cityIndex: []
    }
    getRowHeight = ({ index }) => {
        console.log(index);
        let { cityIndex, cityObj } = this.state
        let letter = cityIndex[index]
        let list = cityObj[letter]
        return titleHeight + nameHeight * list.length
    }
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        let { cityIndex, cityObj } = this.state
        let letter = cityIndex[index]
        let list = cityObj[letter]
        let label = ""
        switch (letter) {
            case '#':
                label = '当前定位'
                break;
            case 'hot':
                label = "热门城市"
                break;
            default:
                label = letter.toUpperCase()
                break;
        }
        return (
            <div key={key} style={style} className='city'>
                <div className='title'>{label}</div>
                {list.map(item => (<div className='name' key={item.value}>{item.label}</div>))}
            </div>
        );
    }
    async getCityListData() {

        const res = await axios.get('http://157.122.54.189:9060/area/city?level=1')
        // console.log(res.data.body);
        //将请求的数据 改造成可以渲染的结构
        let { cityIndex, cityObj } = formatCityListData(res.data.body);

        //发送请求获取热门城市，并把热门城市放到数组的首位
        let hotRes = await axios.get('http://157.122.54.189:9060/area/hot')
        // console.log(hot);
        cityIndex.unshift('hot')
        cityObj.hot = hotRes.data.body


        //处理当前定位城市数据
        const curCityInfo = await getCurrentCityInfo();
        //这里cityIndex需要按顺序插入字符串,所以先做hot ，再做本地城市
        cityIndex.unshift('#');
        cityObj['#'] = [curCityInfo];
        console.log(cityIndex, cityObj);
        this.setState({ cityIndex, cityObj })
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
                <AutoSizer>
                    {({ height, width }) => <List
                        width={width}
                        height={height}
                        rowCount={this.state.cityIndex.length}
                        rowHeight={this.getRowHeight}
                        rowRenderer={this.rowRenderer}
                    />}
                </AutoSizer>

            </div>
        )
    }
}
