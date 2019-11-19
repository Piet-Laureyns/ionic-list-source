import { Component, OnInit } from '@angular/core';
import { ImageItem } from '../imageItem';
import { ModalController, AlertController } from '@ionic/angular';
import { ItemService } from '../item.service';
import { CreateItemComponent } from '../create-item/create-item.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: ImageItem[] = [];

  constructor(private modalController: ModalController, private alertController: AlertController, private itemService: ItemService) {
  }

  ngOnInit() {
    this.items = this.itemService.getAllItems();
  }

  itemSelected(item) {
    console.log(item);
  }

  itemClicked(item: ImageItem) {
    const randomColorLight = this.createHexcode(Math, 'ABCDEF', 4);
    const randomColorDark = this.createHexcode(Math, '0123456789', 4);
    const random = Math.floor(Math.random() * 2);
    if (random === 1) {
      document.getElementById(item.title).setAttribute('style', '--background:#' + randomColorLight + ';color: #' + randomColorDark + ';');
    } else {
      document.getElementById(item.title).setAttribute('style', '--background:#' + randomColorDark + ';color: #' + randomColorLight + ';');
    }
  }

  // TODO Searchbar https://ionicframework.com/docs/api/searchbar
  // TODO Alerts    https://ionicframework.com/docs/api/toast
  // TODO Inifinte  Scroll/ Virtual Scroll https://ionicframework.com/docs/api/infinite-scroll
  // Deploy         https://stackoverflow.com/questions/53036381/how-to-deploy-ionic-4-app-to-github-pages

  private createHexcode(m, s, c) {
    return s[m.floor(m.random() * s.length)] + (c && this.createHexcode(m, s, c - 1));
    // Source https://stackoverflow.com/questions/13833463/how-do-i-generate-a-random-hex-code-that-of-a-lighter-color-in-javascript
  }

  async createNewItemClicked() {
    const modal = await this.modalController.create({
      component: CreateItemComponent
    });
    await modal.present();
    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.items.push(res.data);
      }
    });
  }

  selectItem(item: ImageItem) {

  }

  // Ionic Alert Animations?
  deleteItem(item: ImageItem) {
    this.alertController.create({
      header: 'Are you sure?',
      message: 'Are you sure that you want to delete <strong>' + item.title + '</strong>?',
      buttons: [{
        text: 'Yes',
        cssClass: 'success',
        handler: () => {
          const index: number = this.items.indexOf(item);
          if (index !== -1) {
            this.items.splice(index, 1);
          }
        }
      }, {
        text: 'No',
        role: 'cancel',
        cssClass: 'danger'
      }]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  searchBarChange() {

  }
}
