import React, { Component } from 'react'
import './index.css'
import { TabBar } from 'antd-mobile';
import Index from '../Index';
import { Route } from 'react-router-dom';
// 找房
import Rent from '../Rent';
import News from '../News';
import Profile from '../Profile';
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
        };
    }

    render() {
        // console.log(this.props.location);
        // this.props
        const { location: { pathname } } = this.props
        return (
            <div className='home'>
                <Route path="/home/index" component={Index} />
                <Route path="/home/rent" component={Rent} />
                <Route path="/home/news" component={News} />
                <Route path="/home/my" component={Profile} />
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#21b97a"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="Life"
                        icon={<i className='iconfont icon-ind'></i>
                        }
                        selectedIcon={
                            <i className='iconfont icon-ind'></i>
                        }
                        selected={pathname === '/home/index'}

                        onPress={() => {
                            this.props.history.push('/home/index')
                        }}
                        data-seed="logId"
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className='iconfont icon-findHouse'></i>
                        }
                        selectedIcon={
                            <i className='iconfont icon-findHouse'></i>
                        }
                        title="找房"
                        key="Koubei"

                        selected={pathname === '/home/rent'}
                        onPress={() => {
                            this.props.history.push('/home/rent')
                        }}
                        data-seed="logId1"
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className='iconfont icon-infom'></i>
                        }
                        selectedIcon={
                            <i className='iconfont icon-infom'></i>
                        }
                        title="资讯"
                        key="Friend"
                        dot
                        selected={pathname === '/home/news'}
                        onPress={() => {
                            this.props.history.push('/home/news')
                        }}
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className='iconfont icon-my'></i>}
                        selectedIcon={<i className='iconfont icon-my'></i>}
                        title="我的"
                        key="my"
                        selected={pathname === '/home/profile'}
                        onPress={() => {
                            this.props.history.push('/home/my')
                        }}
                    >

                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}
