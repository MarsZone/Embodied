import { Outlet, useActionData } from "react-router-dom"
import TabNavigator from "@/components/TabNavigator/TabNavigator"
import { Image, NavBar, Toast } from "react-vant"
import './Discover.scoped.scss'
import { previewFileApi } from "@/apis/file"

const Discover = () => {


  //根据tid获取url
  const getUrlByPid = async (pid) => {
    const res = await previewFileApi(pid)
    console.log(res)
    return res.data
  }


  previewFileApi(5).then(data => {
    const imageUrl = data.data;
    // 在组件的渲染过程中使用图片 URL 渲染 Image 组件
    return (
      <Image round fit='cover' src={imageUrl} />
    );
  });


  //const url = "http://120.78.142.84:9000/embodied/20240409231020112-5b8bec60-1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=9mheJLVpHTohzMYlOcXl%2F20240511%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240511T090600Z&X-Amz-Expires=36000&X-Amz-SignedHeaders=host&X-Amz-Signature=e01a89b2f9d332f3c43199e4d4532d497c03497121453795fb5e84388a2beb80"

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


        <Image round fit='cover' src={previewFileApi(5).then(data => data.data)} />
      </div>
      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Discover