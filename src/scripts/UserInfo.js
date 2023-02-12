export default class UserInfo {
  constructor( { userNameSelector, userInfoSelector } ) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo['popup-name'] = this._userNameElement.textContent;
    userInfo['popup-description'] = this._userInfoElement.textContent;

    return userInfo;
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo['popup-name'];
    this._userInfoElement.textContent = userInfo['popup-description']; 
  }
}