import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import axios from 'axios'
import { Toast } from 'antd-mobile';
// Set  
// Map 
import { getCurrentCityInfo } from '../../utils'
import styles from './index.module.scss'
import './index.scss';
import { BASE_URL } from '../../utils/url'

export default class MyMap extends Component {
    state = {
        isShowHouseList: false,
        houseList: []
    }
    async initMap() {
        //获取当前定位城市
        const cityInfo = await getCurrentCityInfo();
        // console.log(cityInfo);
        var map = new window.BMap.Map("container");
        this.map = map
        // 创建地址解析器实例     
        var myGeo = new window.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        // 地址解析服务提供从地址转换到经纬度的服务，反之，逆地址解析则提供从经纬度坐标转换到地址的转换功能。
        //Geocoder.getPoint()方法来将一段地址描述转换为一个坐标    
        myGeo.getPoint(cityInfo.label, async (point) => {

            if (point) {
                // 2. 设置地图的缩放级别为11

                map.centerAndZoom(point, 11);
                // 3. 添加比例尺和平移缩放控件
                // 添加平移缩放控件
                map.addControl(new window.BMap.NavigationControl());
                // 添加比例尺
                map.addControl(new window.BMap.ScaleControl());
                // console.log(point);
                this.renderOverlays(cityInfo.value)



            }

        }, cityInfo.label);
        map.addEventListener('dragstart', () => {

            if (this.state.isShowHouseList) {
                this.setState({
                    isShowHouseList: false
                });
            }

        })


    }
    // 发请求  遍历数据 渲染覆盖物
    async renderOverlays(id) {
        //获取当地城市的房源
        Toast.loading('加载中...', 0, null, true)
        let res = await axios.get('http://157.122.54.189:9060/area/map', { params: { id } })
        // console.log(res.data.body);
        const { type, nextZoom } = this.getTypeAndZoom()
        res.data.body.forEach((v, i) => {
            this.createOverlays(v, type, nextZoom)
        })
        Toast.hide()
    }
    // 创建覆盖物
    createOverlays({ coord, count, label, value }, type, nextZoom) {
        //判断当前类型，渲染
        if (type === 'circle') {
            this.createCircle(value, coord.longitude, coord.latitude, label, count, nextZoom)
        } else {
            this.createReact(value, coord.longitude, coord.latitude, label, count)
        }
    }
    // 渲染圆形覆盖物
    createCircle(id, longitude, latitude, name, count, nextZoom) {
        const point = new window.BMap.Point(longitude, latitude)
        var opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new window.BMap.Size(-35, -35) // 设置文本偏移量
        };
        var label = new window.BMap.Label(`<div class=${styles.bubble} ><p class="${styles.name}">${name}</p>
        <p >${count}套</p></div>`, opts);
        // 自定义文本标注样式
        label.setStyle({
            border: '0px solid rgb(255,0,0)',
            padding: '0px',
        });
        this.map.addOverlay(label);
        label.addEventListener('click', () => {
            // 1. 放大
            this.map.setZoom(nextZoom)
            this.map.panTo(point)
            //解决百度地图Bug
            //清楚原来的覆盖物
            setTimeout(() => {
                this.map.clearOverlays();
            }, 0)
            this.renderOverlays(id)
        })
    }
    // 渲染方形覆盖物
    createReact(id, longitude, latitude, name, count) {
        const point = new window.BMap.Point(longitude, latitude)
        var opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new window.BMap.Size(-35, -35) // 设置文本偏移量
        };
        var label = new window.BMap.Label(`<div class=${styles.rect} ><p class="${styles.houseName}">${name}</p>
        <p class=${styles.houseNum}>${count}套</p> <i class=${styles.arrow}></i></div>`, opts);
        // 自定义文本标注样式
        label.setStyle({
            border: '0px solid rgb(255,0,0)',
            padding: '0px',
        });
        this.map.addOverlay(label);
        label.addEventListener('click', (e) => {
            const target = e.changedTouches[0];
            this.map.panBy(window.innerWidth / 2 - target.clientX, (window.innerHeight - 330) / 2 - target.clientY)
            // this.setState({ isShowHouseList: true })
            this.getHouseList(id)
        })
    }
    async getHouseList(id) {

        // 开启loading框
        Toast.loading('加载中...');
        const res = await axios.get(`http://157.122.54.189:9060/houses`, {
            params: {
                cityId: id
            }
        });
        console.log(res.data.body.list);
        // 关闭loading框
        Toast.hide();

        this.setState({
            houseList: res.data.body.list,
            isShowHouseList: true
        });

    }
    //点击矩形 渲染房屋信息
    renderHouseList() {

        return (<div className={`${styles.houselist}   ${this.state.isShowHouseList ? styles.show : ''}`}>
            <div className={styles.title}>
                房屋列表 <span className={styles.more}>更多房源</span>
            </div>
            <div className={styles.houseListContent}>
                {this.state.houseList.map(item => {
                    return <div className={styles.houseItem} key={item.houseCode}>
                        <div className={styles.imgWrap}>
                            <img src={`http://157.122.54.189:9060${item.houseImg}`} alt="" />
                        </div>

                        <div className={styles.right}>
                            <h3 className={styles.houseTitle}>
                                {item.title}
                            </h3>
                            <div className={styles.housedesc}>
                                {item.desc}
                            </div>
                            <div >
                                {item.tags.map((tag, i) => (
                                    <span key={tag} className={[styles.tags, styles[`tag${(i + 1) % 3}`]].join('   ')}>{tag}</span>
                                ))}
                            </div>
                            <div className={styles.prices}>
                                <span className={styles.priceNum}>{item.price}</span>元/月
                        </div>
                        </div>
                    </div>
                })}
            </div>
        </div>)

    }
    getTypeAndZoom() {
        //获取当前zoom层级
        const zoom = this.map.getZoom()
        let type = 'circle'
        let nextZoom = 0;
        if (10 <= zoom && zoom < 12) {
            //最大的一级
            nextZoom = 13
        } else if (12 <= zoom && zoom < 14) {
            //镇和村的级别,下一级的圆形
            nextZoom = 15
        } else if (14 <= zoom && zoom < 16) {
            nextZoom = 16
            type = 'rect'
        }
        return {
            type, nextZoom
        }
    }
    componentDidMount() {
        this.initMap()
    }


    render() {
        return (
            <div className={styles.map}>
                <NavHeader >地图找房</NavHeader>
                <div id="container" className={styles.container}></div>
                {/* <div className={[styles.houseList, this.state.isShowHouseList ? styles.shows : ''].join('&nbsp;')}></div> */}
                {this.renderHouseList()}

            </div>
        )
    }
}