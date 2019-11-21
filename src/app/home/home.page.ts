import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageItem } from '../imageItem';
import { ModalController, AlertController, ToastController, IonVirtualScroll } from '@ionic/angular';
import { ItemService } from '../item.service';
import { CreateItemComponent } from '../create-item/create-item.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: ImageItem[] = [];
  filteredItems: ImageItem[] = [];
  page = 0;
  tracker: (ix: number, obj: any) => any;
  @ViewChild('virtualScroll', {static: false}) ordersVirtualScroll: IonVirtualScroll;

  constructor(
    private modalController: ModalController, private alertController: AlertController, private itemService: ItemService,
    public toastController: ToastController) {
    this.tracker = (ix, obj) => this.trackByFn(ix, obj);

  }

  //Search when not all items have been loaded fix it

  ngOnInit() {
    this.loadItems();
    this.filteredItems = this.items;
  }

  doReorder(ev: any) {
    const itemMove = this.filteredItems.splice(ev.detail.from, 1)[0];
    this.filteredItems.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
  }

  imageClicked(item) {
    console.log(item);
  }

  getItems() {
    return [...this.items];
  }

  loadItems(infiniteScroll?) {
    this.items = this.items.concat(this.itemService.getItemsFromPage(this.page));
    this.filteredItems = this.items;
    if (infiniteScroll) {
      infiniteScroll.target.complete();
    }
  }

  loadMoreData(infiniteScroll) {
    this.page++;
    this.loadItems(infiniteScroll);
    if (this.page === this.itemService.maxPageNumber) {
      infiniteScroll.target.disabled = true;
    }
  }

  trackByFn(index, item) {
    return item ? item.title : index;
  }

  itemClicked(item: ImageItem) {
    const randomColorLight = this.createHexcode(Math, 'ABCDEF', 4);
    const randomColorDark = this.createHexcode(Math, '0123456789', 4);
    const random = Math.floor(Math.random() * 2);
    if (random === 1) {
      item.setBackgroundColor('#' + randomColorDark);
      item.setTextColor('#' + randomColorLight);
    } else {
      item.setBackgroundColor('#' + randomColorLight);
      item.setTextColor('#' + randomColorDark);
    }
  }

  // Deploy         https://stackoverflow.com/questions/53036381/how-to-deploy-ionic-4-app-to-github-pages
  //         https://www.joshmorony.com/creating-an-accordion-list-in-ionic/

  private createHexcode(m, s, c) {
    return s[m.floor(m.random() * s.length)] + (c && this.createHexcode(m, s, c - 1));
    // Source https://stackoverflow.com/questions/13833463/how-do-i-generate-a-random-hex-code-that-of-a-lighter-color-in-javascript
  }

  async createNewItemClicked() {
    const modal = await this.modalController.create({
      cssClass: 'custom-modal',
      component: CreateItemComponent
    });
    await modal.present();
    modal.onDidDismiss().then(res => {
      if (res.data) {
        const newItem = res.data;
        this.items.push(newItem);
        this.filteredItems = [...this.filteredItems];
        this.presentToast(newItem.title + ' has been added to the list list.');
      }
    });
  }

  selectItem(item: ImageItem) {
    item.showDescription = !item.showDescription;
    this.ordersVirtualScroll.checkRange(this.filteredItems.indexOf(item), 1);
  }

  // Ionic Alert Animations?
  deleteItem(item: ImageItem) {
    this.alertController.create({
      header: 'Are you sure?',
      message: 'Are you sure that you want to delete <strong>' + item.title + '</strong>?',
      buttons: [{
        text: 'Yes',
        cssClass: 'yesButton',
        handler: () => {
          const index: number = this.items.indexOf(item);
          const index2: number = this.filteredItems.indexOf(item);
          if (index !== -1) {
            this.items.splice(index, 1);
            this.filteredItems.splice(index2, 1);
            this.filteredItems = [...this.filteredItems];
            console.log(this.filteredItems);
          }
          this.presentToast(item.title + ' has been deleted from the list.');
        }
      }, {
        text: 'No',
        role: 'cancel',
        cssClass: 'noButton'
      }]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  searchItems(event) {
    if (event.detail) {
      const input = event.detail.srcElement.value.toLowerCase();
      if (input === '') {
        this.filteredItems = this.items;
      } else {
        this.filteredItems = this.items.filter(item =>
          item.title.toLowerCase().includes(input)
        );
      }
    } else {
      this.filteredItems = this.items;
    }
  }

  async presentToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      showCloseButton: true,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
