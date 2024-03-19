import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      {/* 二级路由的出口，如果没有出口就无法显示二级路由 */}
      <Outlet /> 
      我是首页home
    </div>
  )
}


export default Layout