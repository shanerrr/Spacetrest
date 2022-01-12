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
   * @param endDate optional param 
   * @returns object of image
   */
  getPictureOfDay(startDate: string | null = null, endDate: string | null = null) {
    return axios({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      timeout: startDate ? 60000 : 15500,
      url: this.uri + this.config.pictureOfDay + `${startDate ? `&start_date=${startDate}&end_date=${endDate}` : ''}`
    });
  }

  /**
   * @param date date of image requested
   * @returns object of image
   */
  getSpecificImageOfDay(date: string | string[]) {
    return axios({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
      url: this.uri + this.config.pictureOfDay + `&date=${date}`
    });
  }
}