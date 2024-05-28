import { searchUserByNickNameApi } from "@/apis/user"
import { useState } from "react"
import { Button, Search, Toast } from "react-vant"

const Friends = () => {

  const [searchValue, setSearchValue] = useState('')
  const [userList, setUserList] = useState([])
  const handleSearch = async () => {
    const res = await searchUserByNickNameApi(searchValue)
    console.log('搜索返回：', res)
    setUserList(res.data)
  }

  return (
    <div>
      <Search
        value={searchValue}
        onChange={setSearchValue}
        clearable
        placeholder="请输入查找昵称"
      // onSearch={handleSearch}
      // onBlur={handleSearch}
      />
      <Button onClick={handleSearch}>搜索</Button>

      <div>
        {userList.length === 0 ? (
          <div>未搜索到相关用户</div>
        ) : (
          <div>
            {userList.map((item, index) => (
              <div key={index}>{item.nickName}</div>
            ))
            }
          </div>
        )}

      </div>
    </div>
  )
}

export default Friends