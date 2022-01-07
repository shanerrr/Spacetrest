import axios from 'axios';

export class ImageService {

  uri: string;
  config: any;

  constructor() {
    this.uri = 'https://api.nasa.gov';
    this.config = {
      pictureOfDay: '/planetary/apod' + `?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`,
    }
  }

  /**
   * @param startDate optional param 
   * @returns object of image
   */
  getPictureOfDay(startDate: string = new Date().toISOString().split('T')[0], endDate: string = new Date().toISOString().split('T')[0]) {
    return axios({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      url: this.uri + this.config.pictureOfDay + `&start_date=${startDate}&end_date=${endDate}`
    });
  }
}