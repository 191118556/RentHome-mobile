import React, { Component } from 'react'
import { Flex } from 'antd-mobile';
import Filter from './components/Filter'
import { getCurrentCityInfo } from '../../utils'
import styles from './index.module.scss';
import SearchHeader from '../../components/SearchHeader'
export default class Rent extends Component {
    state = {
        cityInfo: {}
    }
    async componentDidMount() {
        const cityInfo = await getCurrentCityInfo();
        this.setState({
            cityInfo: cityInfo
        })
    }
    render() {
        return (
            <div>
                <Flex className={styles.heander}>
                    <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
                    <SearchHeader cityName={this.state.cityInfo.label} className={styles.searchHeader}></SearchHeader>
                </Flex>
                <Filter />
            </div>
        )
    }
}
