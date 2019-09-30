import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map', { static: false }) mapElement:ElementRef;
  map:any;
  currentMapTrack = null;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  positionSubscription:Subscription;
  
  constructor(
    public navCtrl:NavController,
    private plt:Platform,
    private geolocation:Geolocation,
    private storage:Storage
  ) {
  }

  ionViewDidEnter() {
    this.plt.ready().then(() => {
      this.loadHistoricRoute();
      this.geolocation.getCurrentPosition()
        .then(({coords}) => {
          this.rendMap(
            new google.maps.LatLng(coords.latitude, coords.longitude),
            new google.maps.Map(this.mapElement.nativeElement, {
              zoom: 13,
              mapTypedId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false
            })
          );
        });
    });
  }

  rendMap(latLng, map) {
    map.setCenter(latLng);
    map.setZoom(16)
  }

  loadHistoricRoute() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    })
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];
    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter(p => p.coords !== undefined)
      )
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({
            lat: data.coords.latitude,
            lng: data.coords.longitude
          });
          this.redrawPath(this.trackedRoute);
        }, 0)
      })
  }

  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColoe: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  stopTracking() {
    let newRoute = {
      finished: new Date().getTime(),
      path: this.trackedRoute
    }
    this.previousTracks.push(newRoute);
    this.storage.set('routes',  this.previousTracks);
    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }

  showHistoryRoute(route) {
    this.redrawPath(route);
  }

}
