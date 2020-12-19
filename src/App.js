
// import { Button } from 'antd-mobile';
import { HashRouter, BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
// <Switch>是唯一的因为它仅仅只会渲染一个路径。相比之下（不使用<Switch>包裹的情况下），每一个被location匹配到的<Route>将都会被渲染。
import Home from './pages/Home/index'
import cityList from './pages/cityList/index'
import NotFound from './pages/NotFound'
import MyMap from './pages/MyMap'
function App() {
  return (

    <BrowserRouter>
      {/* <Switch>是唯一的因为它仅仅只会渲染一个路径。相比之下（不使用<Switch>包裹的情况下），每一个被location匹配到的<Route>将都会被渲染。 */}
      <Switch>
        <Redirect exact from='/' to='/home' />
        {/* 这里需要加个exact，不然会出现bug */}
        <Route path='/home' component={Home} />
        <Route path='/cityList' component={cityList} />
        <Route path="/map" component={MyMap} />
        <Route path='*' component={NotFound} />
        {/* *是会匹配所以路由所以应该放在最后不然在switch之下就不会渲染到后面的路由 */}
      </Switch>
    </BrowserRouter>

  );
}

export default App;
