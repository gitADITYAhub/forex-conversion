import { Injectable } from '@nestjs/common';
import { FxRatesService } from '../fx-rates/fx-rates.service';

@Injectable()
export class FxConversionService {
  constructor(private readonly fxRatesService: FxRatesService) {}

  convertFx(quoteId: number, fromCurrency: string, toCurrency: string, amount: number) {
    const { rates, expiryAt } = this.fxRatesService.getFxRates();
    const currentTime = new Date().getTime();

    if ( currentTime > expiryAt) {
      return { error: 'Quote expired' };
    }

    const exchangeRate = this.getExchangeRate(rates.rates, fromCurrency, toCurrency);
    const convertedAmount = amount * exchangeRate;

    return { convertedAmount, currency: toCurrency };
  }

  private getExchangeRate(rates: any, fromCurrency: string, toCurrency: string) {
  // Check if rates is defined and has the expected structure
  if (rates && rates['Realtime Currency Exchange Rate']) {
    const realtimeRates = rates['Realtime Currency Exchange Rate'];
    const bidPrice = realtimeRates['8. Bid Price'];
    const askPrice = realtimeRates['9. Ask Price'];

    // Check if bidPrice and askPrice are defined
    if (bidPrice && askPrice) {
      // Use the midpoint between bid and ask prices as the exchange rate
      const exchangeRate = (parseFloat(bidPrice) + parseFloat(askPrice)) / 2;
      return exchangeRate;
    } else {
      console.error('Invalid bid or ask prices in rates data');
      return 0; // Or return a default exchange rate value
    }
  } else {
    // Handle the case where rates is undefined or doesn't have the expected structure
    console.error('Invalid rates data structure');
    return 0; // Or return a default exchange rate value
  }
}
}