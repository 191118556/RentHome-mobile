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
    filterData: {},
    selectedValues: {
      area: ['area', 'null'],
      mode: ['null'],
      price: ['null'],
      more: []
    }

  }
  async getFilterData() {
    // 现获取城市信息
    const cityInfo = await getCurrentCityInfo()

    const res = await axios.get('http://157.122.54.189:9060/houses/condition', { params: { id: cityInfo.value } })
    // console.log(res);
    this.setState({ filterData: res.data.body })
  }
  handleTitle = (type) => {
    //从state中拿出选中的value值，来判断切换的时候是否有改变
    // console.log(type);
    let { selectedValues, activeTitle } = this.state
    let newTitlteSelectValues = { ...activeTitle };
    //点击该标题的时候高亮，点击其他标题的时候要判断是否改变里面的值，假如改变则需要高亮
    //1.排他思想，不考虑是否有改变值，点击不同标题都需要将当前标题改变高亮
    Object.keys(activeTitle).forEach(key => {
      let selectValue = selectedValues[key];
      if (key === type) {
        newTitlteSelectValues[key] = true
      } else if (key === 'area' && (selectValue[1] !== 'null' || selectValue[0] != 'area')) {
        // 区域
        newTitlteSelectValues[key] = true
      } else if (key === 'mode' && selectValue[0] !== 'null') {
        // 方式
        newTitlteSelectValues[key] = true
      } else if (key === 'price' && selectValue[0] !== 'null') {
        // 价格
        newTitlteSelectValues[key] = true;
      } else if (key === 'more' && selectValue.length) {
        newTitlteSelectValues[type] = true;
      } else {
        newTitlteSelectValues[key] = false
      }


    })
    this.setState({
      activeTitle: newTitlteSelectValues, //这里会把重复的替换到按顺序，所以非常灵性
      openType: type
    })
  }
  onCancel = () => {
    this.handleTitle('')
  }
  onSave = (type, value) => {
    // 点击确定也需要把遮罩层去掉
    //需要判断是否有选择其他的，不然假如选择了最初始的无，则需要取消高亮
    //需要注意的是点确定每次都要更新filter state中的值
    let { selectedValues, activeTitle } = this.state
    let newTitlteSelectValues = { ...activeTitle };
    let newSelectValues = {
      ...selectedValues,
      [type]: value
    };
    let selectValue = newSelectValues[type];
    if (type === 'area' && (selectValue[1] !== 'null' || selectValue[0] != 'area')) {
      // 区域
      newTitlteSelectValues[type] = true
    } else if (type === 'mode' && selectValue[0] !== 'null') {
      // 方式
      newTitlteSelectValues[type] = true
    } else if (type === 'price' && selectValue[0] !== 'null') {
      // 价格
      newTitlteSelectValues[type] = true;
    } else if (type === 'more' && selectValue.length) {
      newTitlteSelectValues[type] = true;
    } else {
      newTitlteSelectValues[type] = false
    }
    console.log(type, value);
    this.setState({
      openType: '',
      selectedValues: newSelectValues,
      activeTitle: newTitlteSelectValues,
    })

  }
  componentDidMount() {
    this.getFilterData()
  }
  renderFilterPikcer() {
    // 这里需要注意的是filterData一开始不要设置为null,不然则会出现报错导致程序无法再替换
    const { openType, filterData: {
      area, subway, rentType, price
    }, selectedValues } = this.state
    // console.log(this.state.filterData);

    if (openType === 'area' || openType === 'mode' || openType === 'price') {
      let data = null
      let cols = 1;
      let defaultVal = []
      //通过switch来处理前三个不同的筛选条件
      switch (openType) {
        case 'area':
          data = [area, subway];
          cols = 3;
          defaultVal = selectedValues.area
          break;
        case 'mode':
          data = rentType;
          defaultVal = selectedValues.mode
          break;
        case 'price':
          data = price;
          defaultVal = selectedValues.price
          break;
        default:
          break;
      }
      return <FilterPicker key={openType} data={data} defaultVal={defaultVal} cols={cols} type={openType} onCancel={this.onCancel} onSave={this.onSave} />
    }
    return null
  }
  renderFilterMore() {
    const { openType, filterData: { roomType, floor, oriented, characteristic }, selectedValues: { more } } = this.state
    if (openType === 'more') {
      const data = { roomType, floor, oriented, characteristic }
      return <FilterMore data={data} onSave={this.onSave} defaultValue={more} onCancel={this.onCancel} />
    }
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
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
