export default class UserInfo {
  constructor( { userNameSelector, userInfoSelector, userAvatarSelector, data } ) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo['popup-name'] = this._userNameElement.textContent;
    userInfo['popup-description'] = this._userInfoElement.textContent;

    return userInfo;
  }

  updateUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo['popup-name'];
    this._userInfoElement.textContent = userInfo['popup-description']; 
  }

  setUserInfo() {
    this._userNameElement.textContent = this._name;
    this._userInfoElement.textContent = this._about;
    this._userAvatar.setAttribute('src', this._avatar);
    this._userAvatar.setAttribute('alt', this._name);
  }
}