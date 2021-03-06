import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {

  imageUrl: string;

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.imageUrl = this.navParams.get('imageUrl');
  }

  async myDismiss() {
    await this.modalController.dismiss();
  }

}
