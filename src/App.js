
// import { Button } from 'antd-mobile';
import { HashRouter, BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home/index'
import cityList from './pages/cityList/index'
import NotFound from './pages/NotFound'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path='/home' component={Home} />
          <Route path='/cityList' component={cityList} />
          <Route path='*' component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
