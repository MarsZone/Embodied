import { NavBar, Toast } from "react-vant";

const TopBar = () => {
  return (
    <NavBar
      title="标题"
      leftText="返回"
      rightText="按钮"
      onClickLeft={() => Toast('返回')}
      onClickRight={() => Toast('按钮')}
    />
  );
}

export default TopBar

