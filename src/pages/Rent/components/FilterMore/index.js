import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'
const moreTitle = [{ tit: '户型', type: 'roomType' }, { tit: '朝向', type: 'oriented' }, { tit: '楼层', type: 'floor' }, { tit: '房屋亮点', type: 'characteristic' }]
export default class FilterMore extends Component {

  state = {
    // selectList: this.props.defaultValue
    selectList: this.props.defaultValue

  }
  // 渲染标签

  renderFilters(list) {
    // 高亮类名： styles.tagActive
    return list.map(item => {
      let isSelected = this.state.selectList.indexOf(item.value) > -1
      return <span key={item.value} onClick={this.handleClick.bind(this, item)} className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')} >{item.label}</span >
    })

  }
  handleClick(item) {
    // console.log(12);
    const { selectList } = this.state;

    if (selectList.indexOf(item.value) > -1) {
      let index = selectList.findIndex((key) => key === item.value);
      selectList.splice(index, 1);
    } else {
      selectList.push(item.value)
    }
    this.setState({ selectList })
  }
  onOk = () => {
    this.props.onSave('more', this.state.selectList)
  }
  handleCancel = () => {
    this.setState({
      selectList: []
    });
  }
  render() {
    const { characteristic, floor, oriented, roomType } = this.props.data;
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={() => this.props.onCancel()} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} onOk={this.onOk} cancelText='清除' onCancel={this.handleCancel} />
      </div>
    )
  }
}
