import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageItem } from '../imageItem';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {

  errorMsg: string;
  newImageItem: FormGroup;
  imageName: string;
  image: ImageBitmap;
  file: File;
  url: string;

  constructor(private modalController: ModalController, private fb: FormBuilder) { }

  ngOnInit() {
    this.newImageItem = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]]
    });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.imageName = event.target.files[0].name;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(event.target.files[0].type)) {
        this.errorMsg = 'You can only upload images(jpeg,png,gif).';
      } else {
        this.errorMsg = '';
        this.newImageItem.patchValue({ name: this.imageName.split('.')[0] });
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (ev: any) => { // called once readAsDataURL is completed
          this.image = ev.target.result;
          this.url = ev.target.result;
        };
      }
    }
  }

  async close() {
    await this.modalController.dismiss();
  }

  async submit() {
    if (this.url) {
      await this.modalController.dismiss(new ImageItem(this.url, this.newImageItem.value.title, this.newImageItem.value.description));
    } else {
      this.errorMsg = 'You must upload a valid image.';
    }
  }
}
