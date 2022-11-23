import { Component, director, Label, _decorator } from "cc";
const { ccclass, property } = _decorator

@ccclass('MachResult')
export class MachResult extends Component {
  @property(Label)
  label_title: Label | null = null;
  @property(Label)
  label_distanceMsg: Label | null = null;
  @property(Label)
  label_hint: Label | null = null;

  myLat: number = null;
  myLng: number = null;
  theirLat: number = null;
  theirLng: number = null;

  onLoad() {
    if (!this.isGeolocationAvailable()) {
      return;
    }
    this.updateCurrentPosition();
  }

  showResult(){
    let url = new URL(window.location.href);
    let params = url.searchParams;
    let theirPosition = params.get('zwbyu');
    let [theirLat, theirLng] = theirPosition.split(',');
    this.theirLat = parseFloat(theirLat ?? '0');
    this.theirLng = parseFloat(theirLng ?? '0');
    if (!this.theirLat || !this.theirLng) {
      return;
    }

    let appellation = params.get('cnhu') || '他';
    let distance = this.calcDistance();
    console.warn(this.theirLat,this.theirLng)
    console.warn(this.myLat,this.myLng)
    if (distance < 25000) {
      // 很近
      this.label_title.string = `你跟${appellation}只距離`;
      this.label_distanceMsg.string = `${Math.round(distance/1000)}km!`
      this.label_hint.string = `你們距離很近耶，怎麼還不約起來`;
    } else if (distance > 400000) {
      // VPN
      this.label_title.string = `你跟${appellation}距離了`;
      this.label_distanceMsg.string = `超過${Math.round(distance/1000)}km!`
      this.label_hint.string = `不曉得你們是在異地還是開了VPN，久久還是要記得約一下噢`;
    } else {
      this.label_title.string = `你跟${appellation}距離了`;
      this.label_distanceMsg.string = `${Math.round(distance/1000)}km!`
      this.label_hint.string = `好像有點距離，好像該約一下了`;
    }
  }

  onClickCreateOwn() {
    director.loadScene('createOwn');
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
        that.showResult();
      }
    }, function () {
      alert("找不到GPS訊號");
    });
  }

  calcDistance(): number {
    const toRad = (Value: number) => {
      return Value * Math.PI / 180;
    }
    let lat1 = this.myLat;
    let lon1 = this.myLng
    let lat2 = this.theirLat;
    let lon2 = this.theirLng;
    const R = 6371; // km
    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }
}