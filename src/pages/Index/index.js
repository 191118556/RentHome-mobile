import React, { Component } from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import axios from 'axios'
import { getCurrentCityInfo } from '../../utils/index'
import './index.scss'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
const navs = [
    { img: Nav1, title: '整租', 'path': '/home/rent' },
    { img: Nav2, title: '合租', 'path': '/home/rent' },
    { img: Nav3, title: '地图找房', 'path': '/map' },
    { img: Nav4, title: '去出租', 'path': '/rent' },
]
export default class Index extends Component {
    state = {
        swipers: [],
        gorups: [],
        news: [],
        cityInfo: {}
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);

        //请求轮播图数据
        // this.getLocation()
        this.getCityInfo()
        this.getSwiperData()
        this.getGroups()
        this.getNewsData();

    }
    //获取轮播图 函数 
    async getSwiperData() {
        const res = await axios({
            url: 'http://157.122.54.189:9060/home/swiper'
        })
        // console.log(res);
        this.setState({
            swipers: res.data.body
        })
    }
    async getGroups() {
        const res = await axios.get('http://157.122.54.189:9060/home/groups', { params: { area: 'AREA|88cff55c-aaa4-e2e0' } })
        // console.log(res);
        this.setState({
            gorups: res.data.body
        })
    }
    //获取最新资讯
    async getNewsData() {
        const res = await axios.get(`http://157.122.54.189:9060/home/news`, {
            params: {
                area: 'AREA|88cff55c-aaa4-e2e0'
            }
        });

        this.setState({
            news: res.data.body
        });
    }
    async getCityInfo() {
        const cityInfo = await getCurrentCityInfo();
        this.setState({
            cityInfo
        });
    }
    //获取定位信息
    // getLocation = () => {
    //     var myCity = new window.BMap.LocalCity();

    //     myCity.get(async (result) => {

    //         const res = await axios.get(`http://157.122.54.189:9060/area/info`, {
    //             params: {
    //                 name: result.name
    //             }
    //         })
    //         // console.log(res);
    //         this.setState({
    //             cityInfo: res.data.body
    //         })
    //     });
    // }
    //渲染轮播图函数 返回轮播图组件
    renderSwipers() {
        //需要注意的是  一开始数组为空，但是会出现轮播图不会自动切换的bug， 所以需要注意 给一个条件渲染
        return (this.state.swipers.length ? <Carousel
            autoplay={true}
            autoplayInterval={1000}
            infinite
        // dotStyle={{ width: '.633rem', height: ".633rem" }}
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log('slide to', index)}
        >
            {this.state.swipers.map(val => (
                <a
                    key={val.id}
                    href="http://www.alipay.com"
                    style={{ display: 'inline-block', width: '100%' }}
                >
                    <img
                        src={`http://157.122.54.189:9060${val.imgSrc}`}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            // this.setState({ imgHeight: 'auto' });
                        }}
                    />
                </a>
            ))}
        </Carousel> : null)
    }
    //渲染头部搜索栏
    renderSearch = () => {
        return (
            <Flex className='search-box'>
                <Flex className='search'>
                    <div className='location' onClick={() => this.props.history.push('/citylist')}>
                        {this.state.cityInfo.label || '广州'}
                        <i className='iconfont icon-arrow'></i>
                    </div>
                    <div className='form'>
                        <i className='iconfont icon-search'></i>
                        <span>请输入小区或地址</span>
                    </div>
                </Flex>
                <i className='iconfont icon-map' onClick={() => this.props.history.push('/map')}></i>
            </Flex>
        )
    }
    //渲染导航区
    renderNavs() {
        return <Flex className='flex-nav'>
            {navs.map(item => (
                <Flex.Item className='flex-nav-items' key={item.title} onClick={() => this.props.history.push(item.path)}>
                    <img src={item.img} alt="nav" />
                    <h3>{item.title}</h3>
                </Flex.Item>))}


        </Flex>
    }
    //渲染
    renderGroup() {
        return (<div className="group">
            <h3 className="group-title">
                租房小组
            <span className="more">更多</span>
            </h3>
            <Grid data={this.state.gorups} columnNum={2} square={false}
                activeStyle={true}
                hasLine={false}
                renderItem={item => {
                    // console.log(item);
                    return (
                        <Flex className='group-item' justify='around' >
                            <div className='desc'>
                                <p className="title">{item.title}</p>
                                <span className="info">{item.desc}</span>
                            </div>
                            <img src={`http://157.122.54.189:9060` + item.imgSrc} />
                        </Flex>)
                }
                } />
        </div>)
    }
    //渲染最新资讯
    renderNews() {
        return (<div className="news">
            <h3 className="group-title">
                最新资讯
        </h3>
            <WingBlank size="md">
                {this.state.news.map((item) => (
                    <div className="news-item" key={item.id}>
                        <div className="img-wrap">
                            <img alt="" src={'http://157.122.54.189:9060' + item.imgSrc} />
                        </div>
                        <Flex className="content" direction="column" justify="between" >
                            <div className="title">{item.title}</div>
                            <Flex className="desc" justify="between">
                                <span>{item.from}</span>
                                <span>{item.date}</span>
                            </Flex>
                        </Flex>
                    </div>
                ))}
            </WingBlank>

        </div>)
    }
    render() {
        return (
            <div className='Index'>


                {/* 轮播图 */}
                <div className="swiper-area">
                    {/* 搜索区域 */}

                    {this.renderSwipers()}
                    {this.renderSearch()}
                </div>

                <div className="navs">
                    {this.renderNavs()}
                </div>
                {/* 租房 */}
                {this.renderGroup()}
                {this.renderNews()}
            </div>
        )
    }
}
