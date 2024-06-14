import { NavBar, Toast, Tabs } from "react-vant"
import './Discover.scoped.scss'
import { Outlet, useNavigate } from "react-router-dom"

const Discover = () => {

  const navigate = useNavigate()
  const onClickTab = (path) => {
    navigate(path)
  }

  return (
    <div className="layout">
      {/* <NavBar
        title="发现"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      /> */}
      <div className="container">

        <div className="discover-tab-container">
          <div className="tab-item tab__follow" onClick={() => onClickTab('/discover/follow')}>关注</div>
          <div className="tab-item tab__view" onClick={() => onClickTab('/discover/view')}>随机</div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Discover