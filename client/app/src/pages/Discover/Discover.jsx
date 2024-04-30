import { Outlet } from "react-router-dom"
import TabNavigator from "@/components/TabNavigator/TabNavigator"
import { NavBar, Toast } from "react-vant"

const Discover = () => {

  return (
    <div className="layout">
      <NavBar
        title="发现"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      />
      <div className="container">
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