import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import axios from 'axios'
import { Toast } from 'antd-mobile';
// Set  
// Map 
import { getCurrentCityInfo } from '../../utils'
import styles from './index.module.scss'
import './index.scss';

export default class MyMap extends Component {

    async initMap() {
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
                Toast.loading('加载中...', 0, null, true)
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

    }
    // 发请求  遍历数据 渲染覆盖物
    async renderOverlays(id) {
        //获取当地城市的房源
        let res = await axios.get('http://157.122.54.189:9060/area/map', { params: { id } })
        // console.log(res.data.body);

        res.data.body.forEach((v, i) => {
            this.createOverlays(v.coord.longitude, v.coord.latitude, v.count, v.label)
        })
        Toast.hide()
    }
    // 渲染覆盖物
    createOverlays(longitude, latitude, count, name) {
        var opts = {
            position: new window.BMap.Point(longitude, latitude), // 指定文本标注所在的地理位置
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
    }
    // 渲染圆形覆盖物
    createCircle() {

    }
    // 渲染方形覆盖物
    createReact() {

    }
    componentDidMount() {
        this.initMap()
    }


    render() {
        return (
            <div className={styles.map}>
                <NavHeader >地图找房</NavHeader>
                <div id="container" className={styles.container}></div>
            </div>
        )
    }
}