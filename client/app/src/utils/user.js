//封装user相关的方法
const USER_ID = 'user_id'

function setUserId(userId){
  localStorage.setItem(USER_ID, userId)
}

function getUserId(){
  return localStorage.getItem(USER_ID)
}

function removeUserId(){
  localStorage.removeItem(USER_ID)
}

export {
  setUserId,
  getUserId,
  removeUserId
}