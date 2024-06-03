import { useEffect, useState } from "react"
import { NavBar, Cell, Image } from "react-vant"
import { previewFileApi } from "@/apis/file"
import { useNavigate } from "react-router-dom"
import { getMyFriendsAPI } from "@/apis/user"
import { getUserId } from "@/utils"

const MyFriends = () => {
  const navigate = useNavigate()
  const [friendList, setFriendList] = useState([])

  useEffect(() => {
    fetchFriendList()
  }, [])

  const fetchFriendList = async () => {
    const res = await getMyFriendsAPI()
    const list = res.data
    console.log('返回friendList：', res)

    //拼接avatarUrl
    const listWithAvatar = await Promise.all(list.map(async user => {
      let friendAvatar =
        user.friendShips.uidSource === getUserId
          ? user.sourceUserDetail.avatar
          : user.toUserDetail.avatar
      const avatarRes = await previewFileApi(friendAvatar)
      return { ...user, avatarUrl: avatarRes.data }
    }))
    console.log('拼接后的friendList：', listWithAvatar)
    setFriendList(listWithAvatar)
  }

  const onClickUser = (uid) => {
    navigate(`/profile/${uid}`)
  }

  return (
    <div>

      <NavBar
        title="好友列表"
        leftText=""
        onClickLeft={() => window.history.back(-1)}
      />

      <div>
        {friendList.length === 0 ? (
          <div className="hint">未加好友</div>
        ) : (
          <div>
            {friendList.map((item, index) => (
              <div>
                <Cell
                  center
                  key={index}
                  title={item.friendShips.uidSource === getUserId
                    ? item.sourceUserDetail.nickName
                    : item.toUserDetail.nickName}
                  label='Deserunt dolor ea eaque eos'
                  icon={<Image width={44} height={44} src={item.avatarUrl} round />}
                  isLink
                  onClick={() => onClickUser(item.uid)}
                />
              </div>
            ))
            }
          </div>
        )}

      </div>
    </div>
  )
}

export default MyFriends