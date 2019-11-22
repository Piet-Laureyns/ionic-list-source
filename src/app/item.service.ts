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
    new ImageItem('./assets/images/lion.jpg', 'Lion', ' A lion may sleep up to 20 hours a day!'),
    new ImageItem('./assets/images/turtle.jpg', 'Turtle', 'The oldest turtle ever recorded passed away at the grand old age of 188!'),
    new ImageItem('./assets/images/panda.jpg', 'Panda', 'A panda can poop 28 Kilos per day!'),
    new ImageItem('./assets/images/tiger.jpeg', 'Tiger', 'No two tigers have the same pattern of stripes!'),
    new ImageItem('./assets/images/wolf.jpg', 'Wolf', 'zebras are black with white stripes!'),
    new ImageItem('./assets/images/zebra.jpg', 'Zebra', 'Zebras are black with white stripes and not the other way around!'),
    new ImageItem('./assets/images/hamster.jpg', 'Hamster', 'Hamsters can store food in special pouches in their cheeks!'),
    new ImageItem('./assets/images/hippo.jpg', 'Hippo', 'Hippos can hold their breath for up to five minutes underwater!'),
    new ImageItem('./assets/images/tortoise.jpg', 'Tortoise', 'A group of tortoises is called a creep!'),

    new ImageItem('./assets/images/dog.jpg', 'Dog2', 'Mankinds best friend!'),
    new ImageItem('./assets/images/elephant.jpg', 'Elephant2', 'Elephants cannot jump!'),
    new ImageItem('./assets/images/giraffe.jpg', 'Giraffe2', 'A Giraffe has the same amount of bones in their neck as humans!'),
    new ImageItem('./assets/images/kangaroo.jpg', 'Kangaroo2',
      'Kangaroos are the only large animal to use hopping as their primary method of movement!'),
    new ImageItem('./assets/images/lion.jpg', 'Lion2', ' A lion may sleep up to 20 hours a day!'),
    new ImageItem('./assets/images/turtle.jpg', 'Turtle2', 'The oldest turtle ever recorded passed away at the grand old age of 188!'),
    new ImageItem('./assets/images/panda.jpg', 'Panda2', 'A panda can poop 28 Kilos per day!'),
    new ImageItem('./assets/images/tiger.jpeg', 'Tiger2', 'No two tigers have the same pattern of stripes!'),
    new ImageItem('./assets/images/wolf.jpg', 'Wolf2', 'zebras are black with white stripes!'),
    new ImageItem('./assets/images/zebra.jpg', 'Zebra2', 'Zebras are black with white stripes and not the other way around!'),
    new ImageItem('./assets/images/hamster.jpg', 'Hamster2', 'Hamsters can store food in special pouches in their cheeks!'),
    new ImageItem('./assets/images/hippo.jpg', 'Hippo2', 'Hippos can hold their breath for up to five minutes underwater!'),
    new ImageItem('./assets/images/tortoise.jpg', 'Tortoise2', 'A group of tortoises is called a creep!'),

    new ImageItem('./assets/images/dog.jpg', 'Dog3', 'Mankinds best friend!'),
    new ImageItem('./assets/images/elephant.jpg', 'Elephant3', 'Elephants cannot jump!'),
    new ImageItem('./assets/images/giraffe.jpg', 'Giraffe3', 'A Giraffe has the same amount of bones in their neck as humans!'),
    new ImageItem('./assets/images/kangaroo.jpg', 'Kangaroo3',
      'Kangaroos are the only large animal to use hopping as their primary method of movement!'),
    new ImageItem('./assets/images/lion.jpg', 'Lion3', ' A lion may sleep up to 20 hours a day!'),
    new ImageItem('./assets/images/turtle.jpg', 'Turtle3', 'The oldest turtle ever recorded passed away at the grand old age of 188!'),
    new ImageItem('./assets/images/panda.jpg', 'Panda3', 'A panda can poop 28 Kilos per day!'),
    new ImageItem('./assets/images/tiger.jpeg', 'Tiger3', 'No two tigers have the same pattern of stripes!'),
    new ImageItem('./assets/images/wolf.jpg', 'Wolf3', 'zebras are black with white stripes!'),
    new ImageItem('./assets/images/zebra.jpg', 'Zebra3', 'Zebras are black with white stripes and not the other way around!'),
    new ImageItem('./assets/images/hamster.jpg', 'Hamster3', 'Hamsters can store food in special pouches in their cheeks!'),
    new ImageItem('./assets/images/hippo.jpg', 'Hippo3', 'Hippos can hold their breath for up to five minutes underwater!'),
    new ImageItem('./assets/images/tortoise.jpg', 'Tortoise3', 'A group of tortoises is called a creep!')
  ];

  amountPerPage = 13;
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

  getItemsMatchingSearchString(searchString) {
    return this.items.filter(item =>
      item.title.toLowerCase().includes(searchString)
    );
  }
}
