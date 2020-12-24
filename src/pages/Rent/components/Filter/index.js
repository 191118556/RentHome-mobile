import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

import { getCurrentCityInfo } from '../../../../utils'
import axios from 'axios'
export default class Filter extends Component {
  state = {
    activeTitle: {
      area: false,
      mode: false,
      price: false,
      more: false
    },
    openType: '',
    filterData: {}

  }
  async getFilterData() {
    // 现获取城市信息
    const cityInfo = await getCurrentCityInfo()

    const res = await axios.get('http://157.122.54.189:9060/houses/condition', { params: { id: cityInfo.value } })
    // console.log(res);
    this.setState({ filterData: res.data.body })
  }
  handleTitle = (type) => {
    this.setState({
      activeTitle: {
        ...this.state.activeTitle,//这里会把重复的替换到按顺序，所以非常灵性
        [type]: true
      },
      openType: type
    })
  }
  onCancel = () => {
    this.setState({
      openType: ''
    })
  }
  onSave = () => {
    // 点击确定也需要把遮罩层去掉
    this.setState({
      openType: ''
    })
  }
  componentDidMount() {
    this.getFilterData()
  }
  renderFilterPikcer() {
    // 这里需要注意的是filterData一开始不要设置为null,不然则会出现报错导致程序无法再替换
    const { openType, filterData: {
      area, subway, rentType, price
    } } = this.state
    // console.log(this.state.filterData);

    if (openType === 'area' || openType === 'mode' || openType === 'price') {
      let data = null
      let cols = 1;
      //通过switch来处理前三个不同的筛选条件
      switch (openType) {
        case 'area':
          data = [area, subway];
          cols = 3
          break;
        case 'mode':
          data = rentType;
          break;
        case 'price':
          data = price;
          break;
        default:
          break;
      }
      return <FilterPicker data={data} cols={cols} onCancel={this.onCancel} onSave={this.onSave} />
    }
    return null
  }
  render() {
    const { openType } = this.state;
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* 这里判断假如点击了前三个就会遮罩层 */}
        {openType === 'area' || openType === 'mode' || openType === 'price' ? <div className={styles.mask} /> : null}


        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle activeTitle={this.state.activeTitle} handleTitle={this.handleTitle} />

          {/* 前三个菜单对应的内容： */}
          {this.renderFilterPikcer()}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
