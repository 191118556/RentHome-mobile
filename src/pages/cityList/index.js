import React, { Component } from 'react'
import { NavBar, Toast } from 'antd-mobile';
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
const hotCities = ['北京', '上海', '广州', '深圳'];
const titleHeight = 36;
const nameHeight = 50;
export default class index extends Component {
    listRef = React.createRef();
    state = {
        cityObj: {},
        cityIndex: [],
        curIndex: 0
    }
    componentDidMount() {
        this.getCityListData()
    }
    // listRef = React.createRef()
    getRowHeight = ({ index }) => {

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
        // console.log(index);
        return (
            <div key={key} style={style} className='city'>
                <div className='title'>{label}</div>
                {list.map(item => (<div className='name' key={item.value} onClick={this.changeCity.bind(this, item)}>{item.label}</div>))}
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
        // console.log(cityIndex, cityObj);
        this.setState({ cityIndex, cityObj }, () => { this.listRef.current.measureAllRows() })
    }

    renderCityIndex() {
        let { curIndex } = this.state
        return this.state.cityIndex.map((le, i) => {
            let clsStr = `${curIndex === i ? 'index-active' : ' '}`;
            return (
                <li key={i} className="city-index-item" onClick={this.scrollTo.bind(this, i)}>
                    <span className={clsStr}>{le === 'hot' ? '热' : le.toUpperCase()}</span>
                </li>
            );
        })
    }
    scrollTo(index) {
        // console.log(index, this.listRef.current);
        this.listRef.current.scrollToRow(index);

    }
    onRowsRendered = ({ startIndex }) => {
        // console.log(startIndex, this.state.curIndex);
        const { curIndex } = this.state;
        if (curIndex !== startIndex) {
            this.setState({ curIndex: startIndex })
        }

    }
    changeCity(cityInfo) {
        if (hotCities.indexOf(cityInfo.label) > -1) {
            //切换城市
            localStorage.setItem('hkzf_currentCity', JSON.stringify(cityInfo));
            this.props.history.go(-1);
        } else {
            //该城市暂无房源数据
            Toast.info(`该城市暂无房源数据`, 1, null, true);
        }
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
                    {/* 通过AutoSizer来调整自适应高度和宽度 */}
                    {({ height, width }) => <List
                        width={width}//列表的宽度
                        height={height}//列表的高度
                        rowCount={this.state.cityIndex.length}//列表中 行的数量
                        rowHeight={this.getRowHeight}//每一行的高度，每一行包括城市拼音首字母以及对应的城市
                        rowRenderer={this.rowRenderer}
                        onRowsRendered={this.onRowsRendered}
                        ref={this.listRef}
                        scrollToAlignment="start"
                    //每一行渲染的内容
                    />}
                </AutoSizer>
                {/* 右侧索引列表 */}
                {/* 
                    1 封装 renderCityIndex 方法，用来渲染城市索引列表。
                    2 在方法中，获取到索引数组 cityIndex ，遍历 cityIndex ，渲染索引列表。
                    3 将索引 hot 替换为 热。
                    4 在 state 中添加状态 activeIndex ，指定当前高亮的索引。
                    5 在遍历 cityIndex 时，添加当前字母索引是否高亮的判断条件。
                    */}
                <ul className='city-index'>
                    {this.renderCityIndex()}
                </ul>
            </div>
        )
    }
}
