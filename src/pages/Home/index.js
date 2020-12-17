import React, { Component } from 'react'
import './index.css'
import { TabBar } from 'antd-mobile';
import Index from '../Index';
import { Route } from 'react-router-dom';
// 找房
import Rent from '../Rent';
import News from '../News';
import Profile from '../Profile';
const navs = [
    { title: '首页', icon: 'icon-ind', path: '/home/index' },
    { title: '找房', icon: 'icon-findHouse', path: '/home/rent' },
    { title: '资讯', icon: 'icon-infom', path: '/home/news' },
    { title: '我的', icon: 'icon-my', path: '/home/my' },
]
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
                    {navs.map(item => {
                        return (<TabBar.Item
                            title={item.title}
                            key={item.path}
                            icon={<i className={`iconfont ${item.icon}`}></i>
                            }
                            selectedIcon={
                                <i className={`iconfont ${item.icon}`}></i>
                            }
                            selected={pathname === item.path}

                            onPress={() => {
                                this.props.history.push(item.path)
                            }}
                            data-seed="logId"
                        >

                        </TabBar.Item>)
                    })}


                </TabBar>
            </div>
        )
    }
}
