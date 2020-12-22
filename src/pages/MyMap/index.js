import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
// Set  
// Map 
import { getCurrentCityInfo } from '../../utils'
import styles from './index.module.scss'
import './index.scss';

export default class MyMap extends Component {

    async componentDidMount() {
        const cityInfo = await getCurrentCityInfo();
        // console.log(cityInfo);
        var map = new window.BMap.Map("container");
        // 创建地址解析器实例     
        var myGeo = new window.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        // 地址解析服务提供从地址转换到经纬度的服务，反之，逆地址解析则提供从经纬度坐标转换到地址的转换功能。
        //Geocoder.getPoint()方法来将一段地址描述转换为一个坐标    
        myGeo.getPoint(cityInfo.label, function (point) {

            if (point) {
                // 2. 设置地图的缩放级别为11
                map.centerAndZoom(point, 11);
                // 3. 添加比例尺和平移缩放控件
                // 添加平移缩放控件
                map.addControl(new window.BMap.NavigationControl());
                // 添加比例尺
                map.addControl(new window.BMap.ScaleControl());
                // console.log(point);
            }
        }, cityInfo.label);

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