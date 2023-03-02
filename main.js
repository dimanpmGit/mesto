(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var r=function(t){return t.ok?t.json():Promise.reject(new Error("Произошла ошибка"))},n=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.url=e.url,this.urlForCards="".concat(this.url,"/cards"),this.urlForUser="".concat(this.url,"/users/me"),this.headers=e.headers}var n,o;return n=t,(o=[{key:"getUserInfo",value:function(){return fetch(this.urlForUser,{headers:this.headers}).then(r)}},{key:"updateUserInfo",value:function(t){return fetch(this.urlForUser,{method:"PATCH",headers:this.headers,body:JSON.stringify(t)}).then(r)}},{key:"getCardsData",value:function(){return fetch(this.urlForCards,{headers:this.headers}).then(r)}},{key:"createCard",value:function(t){return fetch(this.urlForCards,{method:"POST",headers:this.headers,body:JSON.stringify(t)}).then(r)}},{key:"deleteCard",value:function(t){return fetch("".concat(this.urlForCards,"/").concat(t),{method:"DELETE",headers:this.headers}).then(r)}},{key:"likeCard",value:function(t){return fetch("".concat(this.urlForCards,"/").concat(t,"/likes"),{method:"PUT",headers:this.headers}).then(r)}},{key:"unlikeCard",value:function(t){return fetch("".concat(this.urlForCards,"/").concat(t,"/likes"),{method:"DELETE",headers:this.headers}).then(r)}},{key:"changeAvatar",value:function(t){return fetch("".concat(this.urlForUser,"/avatar"),{method:"PATCH",headers:this.headers,body:JSON.stringify(t)}).then(r)}}])&&e(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),t}();function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==o(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===o(i)?i:String(i)),n)}var i}var u=function(){function t(e,r,n){var o=n.handleCardClick,i=n.handleTrashClick,u=n.handleLikeCard,a=n.handleUnlikeCard,c=n.userId;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardParams=e,this._cardTemplateSelector=r,this._handleCardClick=o,this._handleTrashClick=i,this._handleLikeCard=u,this._handleUnlikeCard=a,this._userId=c,this._id=e._id,"owner"in this._cardParams?this._cardOwnerId=this._cardParams.owner._id:this._cardOwnerId=this._userId}var e,r;return e=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardTemplateSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_setData",value:function(){this._cardName.textContent=this._cardParams.name,this._cardImage.setAttribute("src",this._cardParams.link),this._cardImage.setAttribute("alt",this._cardParams.name),this._cardParams.likes?this._cardLikes.textContent=this._cardParams.likes.length:this._cardLikes.textContent=0}},{key:"_likeCard",value:function(){this._heartButton.classList.add("element__heart-button_active"),this._cardLikes.textContent=Number(this._cardLikes.textContent)+1}},{key:"_unlikeCard",value:function(){this._heartButton.classList.remove("element__heart-button_active"),this._cardLikes.textContent=Number(this._cardLikes.textContent)-1}},{key:"deleteCard",value:function(){this._newCard.remove(),this._newCard=null}},{key:"_setEventListeners",value:function(){var t=this;this._heartButton.addEventListener("click",(function(){t._heartButton.classList.contains("element__heart-button_active")?(t._unlikeCard(),t._handleUnlikeCard()):(t._likeCard(),t._handleLikeCard())})),this._cardOwnerId===this._userId&&(this._trashButton.classList.add("element__trash-button_type_visible"),this._trashButton.addEventListener("click",(function(){return t._handleTrashClick()}))),this._cardImage.addEventListener("click",(function(){return t._handleCardClick()}))}},{key:"getView",value:function(){var t=this;return this._newCard=this._getTemplate(),this._cardImage=this._newCard.querySelector(".element__image"),this._cardName=this._newCard.querySelector(".element__name"),this._cardLikes=this._newCard.querySelector(".element__heart-likes"),this._heartButton=this._newCard.querySelector(".element__heart-button"),this._trashButton=this._newCard.querySelector(".element__trash-button"),this._setData(),this._setEventListeners(),this._cardParams.likes.forEach((function(e){e._id===t._userId?t._heartButton.classList.add("element__heart-button_active"):t._heartButton.classList.remove("element__heart-button_active")})),this._newCard}}])&&i(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function c(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==a(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===a(o)?o:String(o)),n)}var o}var l=function(){function t(e,r){var n=e.items,o=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._initialArray=n,this._renderer=o,this._container=document.querySelector(r)}var e,r;return e=t,(r=[{key:"renderElements",value:function(){var t=this;this._initialArray.forEach((function(e){t._renderer(e)}))}},{key:"renderElement",value:function(t){this._container.prepend(t)}}])&&c(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function p(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,y(n.key),n)}}function f(t,e,r){return(e=y(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function y(t){var e=function(t,e){if("object"!==s(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===s(e)?e:String(e)}var d=function(){function t(e,r){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),f(this,"_showInputError",(function(t,e){var r=n._formElement.querySelector(".".concat(t.id,"-error"));t.classList.add("".concat(n._validationConfig.inputErrorClass)),r.textContent=e,r.classList.add("".concat(n._validationConfig.errorClass))})),f(this,"_hideInputError",(function(t){var e=n._formElement.querySelector(".".concat(t.id,"-error"));t.classList.remove("".concat(n._validationConfig.inputErrorClass)),e.classList.remove("".concat(n._validationConfig.errorClass)),e.textContent=""})),f(this,"_checkInputValidity",(function(t){t.validity.valid?n._hideInputError(t):n._showInputError(t,t.validationMessage)})),this._validationConfig=e,this._formElement=r,this._formButton=r.querySelector("".concat(e.submitButtonSelector)),this._inputList=Array.from(r.querySelectorAll(".popup__input"))}var e,r;return e=t,(r=[{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"disableSubmitButton",value:function(){this._formButton.classList.add("".concat(this._validationConfig.inactiveButtonClass)),this._formButton.setAttribute("disabled",!0)}},{key:"enableSubmitButton",value:function(){this._formButton.classList.remove("".concat(this._validationConfig.inactiveButtonClass)),this._formButton.removeAttribute("disabled")}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disableSubmitButton():this.enableSubmitButton()}},{key:"_resetFormErrors",value:function(){var t=this;this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"resetValidation",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"_setEventListeners",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._toggleButtonState(),t._checkInputValidity(e)}))}))}},{key:"enableValidation",value:function(){this._setEventListeners(),this._resetFormErrors()}}])&&p(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}(),h=(document.querySelector(".page"),document.querySelector(".popup_edit")),v=document.querySelector(".popup_add"),_=document.querySelector(".popup_card"),m=(h.querySelector(".popup__container"),h.querySelector(".popup__form"),v.querySelector(".popup__form"),v.querySelector(".popup__container"),document.querySelector(".profile__name"),document.querySelector(".profile__description"),document.querySelector(".profile__edit-button")),b=document.querySelector(".profile__add-button"),S=(v.querySelector(".popup__input_type_top"),v.querySelector(".popup__input_type_bottom"),h.querySelector(".popup__input_type_top"),h.querySelector(".popup__input_type_bottom"),_.querySelector(".popup__image"),_.querySelector(".popup__image-name"),document.querySelector(".elements__list"),document.querySelectorAll(".popup__close-button"),document.querySelector(".profile__avatar")),g=document.querySelector(".popup_avatar"),w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function E(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,C(n.key),n)}}function C(t){var e=function(t,e){if("object"!==k(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==k(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===k(e)?e:String(e)}var O=function(){function t(e){var r,n,o,i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,o=function(t){"Escape"===t.code&&i.close()},(n=C(n="_handleEscClose"))in r?Object.defineProperty(r,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[n]=o,this._popup=document.querySelector(e),this._popupButton=this._popup.querySelector(".popup__save-button")}var e,r;return e=t,(r=[{key:"setEventListeners",value:function(){var t=this;this._popup.querySelector(".popup__close-button").addEventListener("click",this.close.bind(this)),this._popup.addEventListener("click",(function(e){e.target.classList.contains("popup")&&t.close()}))}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"renderLoading",value:function(t){var e=this._popupButton.textContent;this._popupButton.textContent=t?"Сохранение...":e}}])&&E(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function j(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==P(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==P(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===P(o)?o:String(o)),n)}var o}function L(){return L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=q(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},L.apply(this,arguments)}function I(t,e){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},I(t,e)}function q(t){return q=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},q(t)}var T=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&I(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=q(n);if(o){var r=q(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===P(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t))._formSubmiter=e,r._inputList=Array.from(r._popup.querySelectorAll(".popup__input")),r._popupForm=r._popup.querySelector(".popup__form"),r}return e=u,(r=[{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){t[e.name]=e.value})),t}},{key:"setInputValues",value:function(t){this._inputList.forEach((function(e){e.value=t[e.name]}))}},{key:"setEventListeners",value:function(){var t=this;L(q(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(e){e.preventDefault(),t._formSubmiter(t._getInputValues())}))}},{key:"close",value:function(){L(q(u.prototype),"close",this).call(this),this._popupForm.reset()}}])&&j(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(O);function B(t){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function R(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==B(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==B(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===B(o)?o:String(o)),n)}var o}var A=function(){function t(e,r){var n=e.userNameSelector,o=e.userInfoSelector,i=e.userAvatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userNameElement=document.querySelector(n),this._userInfoElement=document.querySelector(o),this._userAvatar=document.querySelector(i),this._name=r.name,this._about=r.about,this._avatar=r.avatar,this._id=r._id}var e,r;return e=t,(r=[{key:"getUserInfo",value:function(){var t={};return t["popup-name"]=this._userNameElement.textContent,t["popup-description"]=this._userInfoElement.textContent,t}},{key:"updateUserInfo",value:function(t){this._userNameElement.textContent=t["popup-name"],this._userInfoElement.textContent=t["popup-description"]}},{key:"setUserInfo",value:function(){this._userNameElement.textContent=this._name,this._userInfoElement.textContent=this._about,this._userAvatar.setAttribute("src",this._avatar),this._userAvatar.setAttribute("alt",this._name)}},{key:"setNewAvatar",value:function(t){this._userAvatar.setAttribute("src",t)}},{key:"getUserId",value:function(){return this._id}}])&&R(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function x(t){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},x(t)}function U(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==x(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==x(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===x(o)?o:String(o)),n)}var o}function F(){return F="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=N(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},F.apply(this,arguments)}function D(t,e){return D=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},D(t,e)}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}var V=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&D(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=N(n);if(o){var r=N(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===x(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._popupImage=e._popup.querySelector(".popup__image"),e._popupImageName=e._popup.querySelector(".popup__image-name"),e}return e=u,(r=[{key:"open",value:function(t){F(N(u.prototype),"open",this).call(this),this._popupImage.setAttribute("src",t.link),this._popupImage.setAttribute("alt",t.name),this._popupImageName.textContent=t.name}}])&&U(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(O);function J(t){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},J(t)}function H(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==J(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==J(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===J(o)?o:String(o)),n)}var o}function Y(){return Y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=M(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},Y.apply(this,arguments)}function z(t,e){return z=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},z(t,e)}function M(t){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},M(t)}var G=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&z(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=M(n);if(o){var r=M(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===J(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var r,n=e.handleYesDelete;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t))._popupForm=r._popup.querySelector(".popup__form"),r._formSubmiter=n,r._card={},r}return e=u,(r=[{key:"setEventListeners",value:function(){var t=this;Y(M(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(e){console.log(e),e.preventDefault(),t._formSubmiter(t._card)}))}},{key:"open",value:function(t){Y(M(u.prototype),"open",this).call(this),this._card=t}},{key:"close",value:function(){Y(M(u.prototype),"close",this).call(this)}}])&&H(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(O);function K(t){return K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},K(t)}function Q(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==K(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==K(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===K(o)?o:String(o)),n)}var o}function W(){return W="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=Z(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},W.apply(this,arguments)}function X(t,e){return X=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},X(t,e)}function Z(t){return Z=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Z(t)}var $=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&X(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=Z(n);if(o){var r=Z(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===K(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var r,n=e.handleUpdateAvatar;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t))._popupForm=r._popup.querySelector(".popup__form"),r._link=r._popupForm.querySelector(".popup__input"),r._handleUpdateAvatar=n,r._avatarLink={},r}return e=u,(r=[{key:"setEventListeners",value:function(){var t=this;W(Z(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(e){e.preventDefault(),t._avatarLink.avatar=t._link.value,t._handleUpdateAvatar(t._avatarLink)}))}},{key:"open",value:function(t){W(Z(u.prototype),"open",this).call(this)}},{key:"close",value:function(){W(Z(u.prototype),"close",this).call(this)}}])&&Q(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(O),tt=new n({url:"https://mesto.nomoreparties.co/v1/cohort-60",headers:{authorization:"795d4992-334e-420a-88f5-63bf4e3c7168","Content-Type":"application/json"}});tt.getUserInfo().then((function(t){var e=new A({userNameSelector:".profile__name",userInfoSelector:".profile__description",userAvatarSelector:".profile__avatar-image"},t);e.setUserInfo();var r=new T(".popup_edit",(function(t){r.renderLoading(!0),tt.updateUserInfo({name:t["popup-name"],about:t["popup-description"]}).then((function(){r.close()})).catch((function(t){console.log(t)})).finally((function(){r.renderLoading(!1)})),e.updateUserInfo({"popup-name":t["popup-name"],"popup-description":t["popup-description"]})}));r.setEventListeners(),m.addEventListener("click",(function(){et.resetValidation(),et.enableSubmitButton();var t=e.getUserInfo();r.setInputValues(t),r.open()})),tt.getCardsData().then((function(t){var r=new l({items:t.reverse(),renderer:function(t){i(t)}},".elements__list");r.renderElements();var n=new T(".popup_add",(function(t){n.renderLoading(!0),tt.createCard(t).then((function(t){i(t)})).catch((function(t){console.log(t)})).finally((function(){n.renderLoading(!1)})),n.close()}));n.setEventListeners(),b.addEventListener("click",(function(){rt.resetValidation(),rt.disableSubmitButton(),n.open()})),S.addEventListener("click",(function(){o.open()}));var o=new $(".popup_avatar",{handleUpdateAvatar:function(t){o.renderLoading(!0),tt.changeAvatar(t).then((function(t){e.setNewAvatar(t.avatar)})).catch((function(t){console.log(t)})).finally((function(){o.renderLoading(!1)})),o.close()}});function i(t){var n=function(t){var r=new u(t,"#card-item-template",{handleCardClick:function(){!function(t){nt.open(t)}(t)},handleTrashClick:function(){!function(t){a.open(t)}(r)},handleLikeCard:function(){tt.likeCard(t._id).then((function(t){})).catch((function(t){console.log(t)}))},handleUnlikeCard:function(){tt.unlikeCard(t._id).then((function(t){})).catch((function(t){console.log(t)}))},userId:e.getUserId()});return r.getView()}(t);r.renderElement(n)}o.setEventListeners();var a=new G(".popup_delete",{handleYesDelete:function(t){a.renderLoading(!0),tt.deleteCard(t._cardParams._id).then((function(){t.deleteCard(),a.close()})).catch((function(t){console.log(t)})).finally((function(){a.renderLoading(!1)}))}});a.setEventListeners()})).catch((function(t){console.log(t)}))})).catch((function(t){console.log(t)}));var et=new d(w,h);et.enableValidation();var rt=new d(w,v);rt.enableValidation(),new d(w,g).enableValidation();var nt=new V(".popup_card");nt.setEventListeners()})();