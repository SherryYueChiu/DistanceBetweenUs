import { Component, EditBox, Label, Node, _decorator } from "cc";
const { ccclass, property } = _decorator

@ccclass('CreateOwn')
export class CreateOwn extends Component {
  @property(EditBox)
  input_enterAppellation: EditBox | null = null;
  @property(Label)
  label_sharelink: Label | null = null;
  @property(Node)
  node_warning: Node | null = null;
  @property(Node)
  node_alert: Node | null = null;

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
    let encryptedPosition = btoa(`${this.myLat},${this.myLng}`);
    let param = new URLSearchParams({
      zwbyu: encryptedPosition,
      cnhu: this.input_enterAppellation.string || '他'
    });
    localStorage.setItem('myAppellation',this.input_enterAppellation.string);
    this.updateGtagData();
    url.search = param.toString();
    this.label_sharelink.string = url.toString();
    // copy to clipboard
    let that = this;
    navigator.clipboard.writeText(url.toString()).then(function () {
      console.log('Async: Copying to clipboard was successful!');
      that.showAlert('OK', '分享連結已經複製起來了')
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
        that.showWarning('A02', '找不到GPS訊號');
      } else {
        that.myLat = lat;
        that.myLng = lng;
      }
    }, function () {
      that.showWarning('A01', '找不到GPS訊號\n可能是瀏覽器不給予權限');
    });
  }

  showAlert(title: string, msg: string) {
    this.node_alert.active = true;
    this.node_alert.getChildByName('title').getComponent(Label).string = title;
    this.node_alert.getChildByName('msg').getComponent(Label).string = msg;
    (window as any).gtag('event', 'alert', {
      'title': title,
      'msg': msg
    });
  }

  showWarning(errorCode: string, msg: string) {
    this.node_warning.active = true;
    this.node_warning.getChildByName('errorCode').getComponent(Label).string = `ERR${errorCode}`;
    this.node_warning.getChildByName('msg').getComponent(Label).string = msg;
    (window as any).gtag('event', 'error', {
      'errorCode': errorCode,
      'msg': msg
    });
  }

  updateGtagData(){
    (window as any).gtag('set', {
      'myPos': localStorage.getItem('myPos'),
      'myAppellation':localStorage.getItem('myAppellation'),
      'sharerPos': localStorage.getItem('sharerPos'),
      'sharerAppellation': localStorage.getItem('sharerAppellation')
    });
  }
}