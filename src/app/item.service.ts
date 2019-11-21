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
    new ImageItem('./assets/images/kangaroo.jpg', 'Kangaroo',
      'Kangaroos are the only large animal to use hopping as their primary method of movement!'),
    new ImageItem('./assets/images/lion.jpg', 'Lion', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/panda.jpg', 'Panda', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/tiger.jpeg', 'Tiger', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/wolf.jpg', 'Wolf', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/zebra.jpg', 'Zebra', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/dog.jpg', 'Dog1', 'Mankinds best friend!'),
    new ImageItem('./assets/images/elephant.jpg', 'Elephant1', 'Elephants cannot jump!'),
    new ImageItem('./assets/images/giraffe.jpg', 'Giraffe1', 'A Giraffe has the same amount of bones in their neck as humans!'),
    new ImageItem('./assets/images/kangaroo.jpg', 'Kangaroo1',
      'Kangaroos are the only large animal to use hopping as their primary method of movement!'),
    new ImageItem('./assets/images/lion.jpg', 'Lion1', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/panda.jpg', 'Panda1', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/tiger.jpeg', 'Tiger1', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/wolf.jpg', 'Wol1f', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/zebra.jpg', 'Zebra1', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/dog.jpg', 'Dog2', 'Mankinds best friend!'),
    new ImageItem('./assets/images/elephant.jpg', 'Elephant2', 'Elephants cannot jump!'),
    new ImageItem('./assets/images/giraffe.jpg', 'Giraffe2', 'A Giraffe has the same amount of bones in their neck as humans!'),
    new ImageItem('./assets/images/kangaroo.jpg', 'Kangaroo2',
      'Kangaroos are the only large animal to use hopping as their primary method of movement!'),
    new ImageItem('./assets/images/lion.jpg', 'Lion2', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/panda.jpg', 'Panda2', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/tiger.jpeg', 'Tiger2', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/wolf.jpg', 'Wolf2', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/zebra.jpg', 'Zebra2', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/dog.jpg', 'Dog3', 'Mankinds best friend!'),
    new ImageItem('./assets/images/elephant.jpg', 'Elephant3', 'Elephants cannot jump!'),
    new ImageItem('./assets/images/giraffe.jpg', 'Giraffe3', 'A Giraffe has the same amount of bones in their neck as humans!'),
    new ImageItem('./assets/images/kangaroo.jpg', 'Kangaroo3',
      'Kangaroos are the only large animal to use hopping as their primary method of movement!'),
    new ImageItem('./assets/images/lion.jpg', 'Lion3', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/panda.jpg', 'Panda3', 'Kangaroos are the only large'),
    new ImageItem('./assets/images/tiger.jpeg', 'Tiger3', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/wolf.jpg', 'Wolf3', 'Kangaroos are the only large '),
    new ImageItem('./assets/images/zebra.jpg', 'Last Item3', 'Kangaroos are the only large ')
  ];

  amountPerPage = 15;
  public maxPageNumber = 3;

  constructor() {
  }

  getAllItems() {
    return [...this.items];
  }

  getItemsFromPage(page) {
    if (page < this.maxPageNumber) {
      return this.items.slice(page * this.amountPerPage, (page + 1) * this.amountPerPage);
    } else {
      return [];
    }
  }
}
