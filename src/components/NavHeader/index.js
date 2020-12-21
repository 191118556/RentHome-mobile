import React from 'react'
import { NavBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import './index.scss'
function NavHeader({ children, history, onLeftClick }) {
    const defaultHandle = () => history.go(-1);
    return (
        <NavBar className='navheader-comp'
            mode="light"
            icon={<i className='iconfont icon-back'></i>}
            onLeftClick={onLeftClick || defaultHandle}
        >{children}</NavBar>
    )
}
NavHeader.propTypes = {
    children: PropTypes.string,
    onLeftClick: PropTypes.func

}
export default withRouter(NavHeader)