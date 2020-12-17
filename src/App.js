
import { Button } from 'antd-mobile';
import { HashRouter, Route, Link } from 'react-router-dom'
import Home from './pages/Home/index'
import cityList from './pages/cityList/index'
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Link to='/'>首页</Link>
        <Link to='/cityList'>城市</Link>

        <Route exact path='/' component={Home} />
        <Route exact path='/cityList' component={cityList} />
      </HashRouter>
    </div>
  );
}

export default App;
