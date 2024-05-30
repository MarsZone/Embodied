import { searchUserByNickNameApi } from "@/apis/user"
import { useState } from "react"
import { Search, Cell, Image } from "react-vant"
import './NewFriend.scoped.scss'
import { previewFileApi } from "@/apis/file"
import { useNavigate } from "react-router-dom"

const NewFriend = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [userList, setUserList] = useState([])
  const [hint, setHint] = useState('')

  const handleSearch = async () => {
    const res = await searchUserByNickNameApi(searchValue)
    const list = res.data
    console.log('搜索返回userList：', res)
    setUserList(list)

    if (userList.length === 0) {
      setHint('未搜索到相关用户')
    }

    //拼接avatarUrl
    const listWithAvatar = await Promise.all(list.map(async user => {
      const avatarRes = await previewFileApi(user.avatar)
      return { ...user, avatarUrl: avatarRes.data }
    }))
    console.log('拼接后的userList：', listWithAvatar)
    setUserList(listWithAvatar)
  }

  const onClickUser = (uid) => {
    navigate(`/profile/${uid}`)
  }

  return (
    <div>
      <Search
        value={searchValue}
        onChange={setSearchValue}
        clearable
        placeholder="请输入查找昵称"
        onBlur={handleSearch}
      />
      <div>
        {userList.length === 0 ? (
          <div className="hint">{hint}</div>
        ) : (
          <div>
            {userList.map((item, index) => (
              <div>
                <Cell
                  center
                  key={index}
                  title={item.nickName}
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

export default NewFriend