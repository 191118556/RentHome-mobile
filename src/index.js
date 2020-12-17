import React from 'react'
import ReactDOM from 'react-dom'
import './assets/fonts/iconfont.css'
import './index.css'
//引入全局样式的在app或index中问题不大，只是顺序问题，而且下面引入可能导致覆盖问题
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
