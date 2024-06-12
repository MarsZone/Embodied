import { NavBar, Toast, Tabs } from "react-vant"
import './Discover.scoped.scss'
import { Outlet } from "react-router-dom"

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

  return (
    <div className="layout">
      <NavBar
        title="发现"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      />
      <div className="container">

        <Tabs border type='capsule'>
          {tabList.map(item => (
            <Tabs.TabPane
              key={item.key}
              title={`${item.name}`}
              name={item.key}
            >
              <Outlet />
            </Tabs.TabPane>
          ))}
        </Tabs>


      </div>
    </div>
  )
}

export default Discover