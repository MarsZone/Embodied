import { NavBar, Toast, Tabs } from "react-vant"
import './Discover.scoped.scss'
import { Outlet, useNavigate } from "react-router-dom"

const Discover = () => {
  const tabList = [
    {
      key: 'follow',
      name: '关注'
    },
    {
      key: 'random',
      name: '随机'
    }
  ]

  const navigate = useNavigate()


  const onClickTab = (path) => {
    navigate(path)
  }

  return (
    <div className="layout">
      <NavBar
        title="发现"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      />
      <div className="container">

        {/* <Tabs border type='capsule'>
          {tabList.map(item => (
            <Tabs.TabPane
              key={item.key}
              title={`${item.name}`}
              name={item.key}
            >
            </Tabs.TabPane>
          ))}
        </Tabs> */}

        <div className="discover-tab-container">
          <div className="tab-item tab__follow" onClick={onClickTab('/follow')}>关注</div>
          <div className="tab-item tab__view" onClick={onClickTab('/view')}>随机</div>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default Discover