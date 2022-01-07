import axios from 'axios';

export class ImageService {

  uri: string;
  imageUri: string;
  config: any;

  constructor() {
    this.uri = 'https://api.nasa.gov';
    this.imageUri = 'https://images-api.nasa.gov';
    this.config = {
      pictureOfDay: '/planetary/apod' + `?api_key=${process.env.NASA_API_KEY}`,
      getPhotos: '/search?media_type=image',
    }
  }

  /**
   * @returns object of image
   */
  getPictureOfDay() {
    return axios({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      url: this.uri + this.config.pictureOfDay
    });
  }

  /**
   * @returns array of objects
   */
  getGeneralPhotos(page: number) {
    return axios({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      url: this.imageUri + this.config.getPhotos + `&page=${page}`
    });
  }
}