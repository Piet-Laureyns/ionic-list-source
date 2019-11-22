import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageItem } from '../imageItem';
import { ModalController, AlertController, ToastController, IonVirtualScroll, PopoverController } from '@ionic/angular';
import { ItemService } from '../item.service';
import { CreateItemComponent } from '../create-item/create-item.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: ImageItem[] = [];
  filteredItems: ImageItem[] = [];
  page = 0;
  noItemsMessage: string;
  @ViewChild('virtualScroll', { static: false }) ordersVirtualScroll: IonVirtualScroll;

  constructor(
    private modalController: ModalController, private alertController: AlertController, private itemService: ItemService,
    public toastController: ToastController, public popoverController: PopoverController) {
  }

  ngOnInit() {
    this.loadItems();
    this.filteredItems = this.items;
  }

  async imageClicked(item: any) {
    const popover = await this.popoverController.create({
      component: ImageViewerComponent,
      componentProps: {
        imageUrl: item.imageUrl
      },
      translucent: true
    });
    return await popover.present();
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

  // Assign random colors to the background-color and color of clicked item
  itemClicked(item: ImageItem) {
    const randomColorLight = this.createHexcode(Math, 'ABCDEF98', 4);
    const randomColorDark = this.createHexcode(Math, '01234567', 4);
    const random = Math.floor(Math.random() * 2);
    if (random === 1) {
      item.setBackgroundColor('#' + randomColorDark);
      item.setTextColor('#' + randomColorLight);
    } else {
      item.setBackgroundColor('#' + randomColorLight);
      item.setTextColor('#' + randomColorDark);
    }
  }

  private createHexcode(m, s, c) {
    return s[m.floor(m.random() * s.length)] + (c && this.createHexcode(m, s, c - 1));
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

  showMoreButtonClicked(item: ImageItem) {
    item.showDescription = !item.showDescription;
    this.ordersVirtualScroll.checkRange(this.filteredItems.indexOf(item), 1);
  }

  deleteItemClicked(item: ImageItem) {
    this.alertController.create({
      header: 'Are you sure?',
      message: 'Are you sure that you want to delete <strong>' + item.title + '</strong>?',
      buttons: [{
        text: 'Yes',
        cssClass: 'yesButton',
        handler: () => {
          const index: number = this.items.indexOf(item);
          if (index !== -1) {
            this.items.splice(index, 1);
            this.filteredItems = [...this.filteredItems];
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
    if (event.detail) { // Check if something is typed in the search input
      const input = event.detail.srcElement.value.toLowerCase();
      if (input === '') { // If search field is empty => show entire list
        this.filteredItems = this.items;
        this.noItemsMessage = '';
      } else {
        const matchingItems: ImageItem[] = this.itemService.getItemsMatchingSearchString(input);
        if (matchingItems.length === 0) {
          this.noItemsMessage = 'There are no animals in the list that match "' + input + '".';
          this.filteredItems = [];
        } else {
          this.filteredItems = matchingItems;
        }
      }
    } else {
      this.filteredItems = this.items;
      this.noItemsMessage = '';
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
