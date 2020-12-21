import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
// Set  
// Map 
import styles from './index.module.scss'
import './index.scss';

export default class MyMap extends Component {

    componentDidMount() {
        var map = new window.BMap.Map("container");
        var point = new window.BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);


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