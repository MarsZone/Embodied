//封装高阶组件
//有 token 正常跳转，无 token 去登录

import { getToken as _getToken } from "@/utils"
import { Navigate } from "react-router-dom"

export function AuthRoute({ children }) { //参数children是组件
  const token = _getToken()
  console.log(token)
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace />
  }
}