import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

interface Marker {
  position: any;
  title: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.component.html',
  styleUrls: ['mapa.component.scss'],
})

export class MapaComponent implements OnInit {

  @ViewChild('map', { read: ElementRef, static: false}) mapRef: ElementRef;

  map = null;

  markers: Marker[] = [
    {
      position: {
        lat: -33.44703,
        lng: -70.65762,
      },
      title: 'Instituto DUOC Alonso de Ovalle'
    },
  ];

  constructor(private alertController: AlertController) {
    console.log('constructor');
  }

  public ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = {lat: -33.44703, lng: -70.65762};

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

  
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
