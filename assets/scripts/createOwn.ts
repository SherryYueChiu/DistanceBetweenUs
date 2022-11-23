import { Component, EditBox, Label, _decorator } from "cc";
const { ccclass, property } = _decorator

@ccclass('CreateOwn')
export class CreateOwn extends Component {
  @property(EditBox)
  input_enterAppellation: EditBox | null = null;
  @property(Label)
  label_sharelink: Label | null = null;

  myLat: number = null;
  myLng: number = null;

  onLoad() {
    if (!this.isGeolocationAvailable()) {
      return;
    }
    this.updateCurrentPosition();
  }

  onSubmit() {
    if (!this.isGeolocationAvailable()) {
      return;
    }
    if (!this.myLat || !this.myLng) {
      return;
    }
    let url = new URL(window.location.href);
    let param = new URLSearchParams({
      zwbyu: `${this.myLat},${this.myLng}`,
      cnhu: this.input_enterAppellation.string || '他'
    });
    url.search = param.toString();
    this.label_sharelink.string = url.toString();
    // copy to clipboard
    navigator.clipboard.writeText(url.toString()).then(function () {
      console.log('Async: Copying to clipboard was successful!');
      alert('分享連結已經起來')
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  isGeolocationAvailable() {
    if ("geolocation" in navigator) {
      return true;
    } else {
      return false;
    }
  }

  updateCurrentPosition() {
    let that = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      if (!lat && !lng) {
        alert("找不到GPS訊號");
      } else {
        that.myLat = lat;
        that.myLng = lng;
      }
    }, function () {
      alert("找不到GPS訊號");
    });
  }
}