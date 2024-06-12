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