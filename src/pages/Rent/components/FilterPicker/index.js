import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'



export default class FilterPicker extends Component {
  state = {
    val: []
  }
  onCancel = () => {
    this.props.onCancel()
  }
  onOk = () => {
    this.props.onSave(this.props.type, this.state.val);
  }
  handleChange = (val) => {
    // console.log('val', val);
    this.setState({ val: [...val] })
  }
  componentDidMount() {
    this.setState({ val: [...this.props.defaultVal] })
  }
  render() {
    return (
      <>
        {/* 选择器组件： */}
        {/* 绑定onchange事件，选择的value在回调的形参中 */}
        <PickerView data={this.props.data} value={this.state.val} cols={this.props.cols} onChange={this.handleChange} />

        {/* 底部按钮 */}
        <FilterFooter onCancel={this.onCancel} onOk={this.onOk} />
      </>
    )
  }
}
