import TabNavigator from "@/components/TabNavigator/TabNavigator"
import { Image, NavBar, Toast, Tabs } from "react-vant"
import './Discover.scoped.scss'

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
            </Tabs.TabPane>
          ))}
        </Tabs>
        {/* 二级路由的出口，如果没有出口就无法显示二级路由 */}
        {/* <Outlet /> 
      我是发现页Discover */}

      </div>

      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Discover