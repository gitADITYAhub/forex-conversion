// fx-conversion.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { FxConversionService } from './fx-conversion.service';
import { FxRatesService } from '../fx-rates/fx-rates.service';

describe('FxConversionService', () => {
  let service: FxConversionService;
  let fxRatesService: FxRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FxConversionService, FxRatesService],
    }).compile();

    service = module.get<FxConversionService>(FxConversionService);
    fxRatesService = module.get<FxRatesService>(FxRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should perform FX conversion correctly', () => {
    const quoteId = 123;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const amount = 100;

    const mockRates = {
      quoteId: 123,
      expiryAt: new Date().getTime() + 60000,
      rates: {
        'Realtime Currency Exchange Rate': {
          '8. Bid Price': '0.92345',
          '9. Ask Price': '0.92367',
        },
      },
    };

    jest.spyOn(fxRatesService, 'getFxRates').mockReturnValue(mockRates);

    const result = service.convertFx(quoteId, fromCurrency, toCurrency, amount);

    expect(result).toEqual({
      convertedAmount: expect.closeTo(92.356, 3),
      currency: 'EUR',
    });
  });

  it('should handle expired quote correctly', () => {
    const quoteId = 123;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const amount = 100;

    const mockRates = {
      quoteId: 456, // Different quoteId
      expiryAt: new Date().getTime() - 60000, // Expired expiry time
      rates: {
        'Realtime Currency Exchange Rate': {
          '8. Bid Price': '0.92345',
          '9. Ask Price': '0.92367',
        },
      },
    };

    jest.spyOn(fxRatesService, 'getFxRates').mockReturnValue(mockRates);

    const result = service.convertFx(quoteId, fromCurrency, toCurrency, amount);

    expect(result).toEqual({ error: 'Quote expired' });
  });
});