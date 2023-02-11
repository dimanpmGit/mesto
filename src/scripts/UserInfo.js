export default class UserInfo {
  constructor( { userNameSelector, userInfoSelector } ) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo['name'] = this._userNameElement.textContent;
    userInfo['description'] = this._userInfoElement.textContent;

    return userInfo;
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo['name'];
    this._userInfoElement.textContent = userInfo['description']; 
  }
}