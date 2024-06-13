import React from 'react';
import { Outlet } from 'react-router-dom';
import TabNavigator from './TabNavigator/TabNavigator';

const Layout = () => {
  return (
    <div>
      <div className="content">
        <Outlet /> {/* 渲染子路由的内容 */}
      </div>
      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  );
};

export default Layout;


/*
当访问 /home 路径时，React Router 会匹配到根路由，并渲染 Layout 组件。
在 Layout 组件中，<Outlet /> 会渲染匹配的子路由 <AuthRoute><Home /></AuthRoute>。

例如：

当你访问 /home 时，<Outlet /> 会渲染 <AuthRoute><Home /></AuthRoute>。
当你访问 /discover/message 时，React Router 会先匹配到 /discover 路径，渲染 Discover 组件，然后在 Discover 组件中渲染嵌套的子路由 Message。
通过这种方式，<Outlet /> 组件在 Layout 中起到了占位符的作用，根据当前的 URL 动态渲染对应的子路由内容。

这样，页面的布局保持不变，只更新 Outlet 内部的内容。
*/