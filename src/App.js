
import { Button } from 'antd-mobile';
import { HashRouter, BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './pages/Home/index'
import cityList from './pages/cityList/index'
function App() {
  return (
    <div className="App">
      <BrowserRouter>


        <Route path='/home' component={Home} />
        <Route path='/cityList' component={cityList} />
      </BrowserRouter>
    </div>
  );
}

export default App;
