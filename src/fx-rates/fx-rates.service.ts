import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FxRatesService {
  private fxRates: Record<string, any> = {};
  private quoteId: number = 0;

  constructor(private readonly httpService: HttpService,
    private readonly configService: ConfigService,) {
    this.fetchFxRates();
    setInterval(this.fetchFxRates.bind(this), 30000); // Fetch rates every 30 seconds
  }

  async fetchFxRates() {
    const apiKey = this.configService.get<string>('ALPHAVANTAGE_API_KEY');
    const url =
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${apiKey}`;
    const response = await this.httpService.get(url).toPromise();
    this.fxRates = response.data;
  }

  getFxRates() {
    this.quoteId++;
    const expiryAt = new Date().getTime() + 1000000;
    console.log(new Date().getTime()); // Quote expires in 30 seconds
    return { quoteId: this.quoteId, expiryAt, rates: this.fxRates };
  }
}