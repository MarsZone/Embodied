import { Outlet } from "react-router-dom"

const Discover = () => {
  return (
    <div>
      {/* 二级路由的出口，如果没有出口就无法显示二级路由 */}
      <Outlet /> 
      我是发现页Discover
    </div>
  )
}

export default Discover