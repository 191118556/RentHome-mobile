import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends Component {
  state = {
    activeTitle: {
      area: false,
      mode: false,
      price: false,
      more: false
    },
    openType: ''

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
          {openType === 'area' || openType === 'mode' || openType === 'price' ? <FilterPicker onCancel={this.onCancel} onSave={this.onSave} /> : null}


          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
