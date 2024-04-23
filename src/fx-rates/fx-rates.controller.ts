import { Controller, Get } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';

@Controller('fx-rates')
export class FxRatesController {
  constructor(private readonly fxRatesService: FxRatesService) {}

  @Get()
  getFxRates() {
    return this.fxRatesService.getFxRates();
  }
}
