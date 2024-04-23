// fx-rates.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { FxRatesService } from './fx-rates.service';

interface MockResponse {
  data: {
    'Realtime Currency Exchange Rate': {
      '8. Bid Price': string;
      '9. Ask Price': string;
    };
  };
}

describe('FxRatesService', () => {
  let service: FxRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [FxRatesService],
    }).compile();

    service = module.get<FxRatesService>(FxRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch FX rates from Alpha Vantage API', async () => {
    // Mock the HttpService to return sample data
    const mockResponse: MockResponse = {
      data: {
        'Realtime Currency Exchange Rate': {
          '8. Bid Price': '0.92345',
          '9. Ask Price': '0.92367',
        },
      },
    };
    // jest.spyOn(service['httpService'], 'get').mockResolvedValue(mockResponse);

    await service.fetchFxRates();

    expect(service['fxRates']).toEqual(mockResponse.data);
  });

  it('should generate a new quoteId and expiry time', () => {
    const { quoteId, expiryAt, rates } = service.getFxRates();

    expect(quoteId).toBeGreaterThan(0);
    expect(expiryAt).toBeGreaterThan(new Date().getTime());
    expect(rates).toBeDefined();
  });
});