import { NavBar, Toast, Tabs } from "react-vant"
import './Discover.scoped.scss'
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

const Discover = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.pathname === '/discover' ? '/discover/follow' : location.pathname)
  const handleClickTab = (path) => {
    navigate(path)
    setActiveTab(path)
  }

  const tabItems = [
    {
      path: '/discover/follow',
      text: '关注'
    },
    {
      path: '/discover/view',
      text: '随机'
    }
  ]

  return (
    <div className="layout">
      <NavBar
        title="发现"
        leftArrow=""
      />
      <div className="discover-container">
          <Tabs
            align='center'
            onClickTab={v => handleClickTab(v.name)}
          >
            {tabItems.map(item => (
              <Tabs.TabPane
                key={item.path}
                title={item.text}
                name={item.path}
              >
                <Outlet />
              </Tabs.TabPane>
            ))}
          </Tabs>

        {/* <div className="discover-tab-container">
          <div
            className={`tab-item tab__follow ${activeTab === '/discover/follow' ? 'active active__follow' : ''}`}
            onClick={() => onClickTab('/discover/follow')}
          >
            关注
          </div>
          <div
            className={`tab-item tab__view ${activeTab === '/discover/view' ? 'active active__view' : ''}`}
            onClick={() => onClickTab('/discover/view')}
          >
            随机
          </div>
        </div>
        <Outlet /> */}
      </div>
    </div >
  )
}

export default Discover