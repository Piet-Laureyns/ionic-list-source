export class ImageItem {

  public showDescription = false;
  private backgroundColor: string;
  private textColor: string;

    constructor(
      public imageUrl: string,
      public title: string,
      public description: string,
    ) { }

  public getBackgroundColor() {
    return this.backgroundColor ? this.backgroundColor : 'var(--ion-color-light)';
  }

  public getTextColor() {
    return this.textColor ? this.textColor : 'var(--ion-color-dark)';
  }

  public setBackgroundColor(color) {
    this.backgroundColor = color;
  }

  public setTextColor(color) {
    this.textColor = color;
  }
}
