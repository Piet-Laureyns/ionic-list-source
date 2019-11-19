import { Injectable } from '@angular/core';
import { ImageItem } from './imageItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items: ImageItem[] = [
    new ImageItem('./assets/images/dog.jpg', 'Dog', 'Mankinds best friend!'),
    new ImageItem('./assets/images/elephant.jpg', 'Elephant', 'Elephants cannot jump!'),
    new ImageItem('./assets/images/giraffe.jpg', 'Giraffe', 'A Giraffe has the same amount of bones in their neck as humans!'),
    new ImageItem('./assets/images/kangaroo.jpg', 'Kangaroo', 'Kangaroos are the only large animal to use hopping as their primary method of movement!'),
    new ImageItem('./assets/images/lion.jpg', 'Lion', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/panda.jpg', 'Panda', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/tiger.jpeg', 'Tiger', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/wolf.jpg', 'Wolf', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/zebra.jpg', 'Zebra', 'Kangaroos are the only large ')
  ];

  constructor() { }

  getAllItems() {
    return [...this.items];
  }
}
