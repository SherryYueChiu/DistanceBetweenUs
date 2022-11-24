import { Component, director, _decorator } from "cc";
const { ccclass, property } = _decorator

@ccclass('Entry')
export class Entry extends Component {
  onLoad() {
    if (!this.isGeolocationAvailable()) {

    }
    let url = new URL(window.location.href);
    let params = url.searchParams;
    if (!params.has('zwbyu')) {
      // 空白
      director.loadScene('createOwn');
    } else {
      director.loadScene('matchResult');
    }
  }

  isGeolocationAvailable() {
    if ("geolocation" in navigator) {
      return true;
    } else {
      return false;
    }
  }
}