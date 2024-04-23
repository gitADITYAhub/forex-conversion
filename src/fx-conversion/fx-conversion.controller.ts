import { Body, Controller, Post } from '@nestjs/common';
import { FxConversionService } from './fx-conversion.service';

@Controller('fx-conversion')
export class FxConversionController {
  constructor(private readonly fxConversionService: FxConversionService) {}

  @Post()
  convertFx(@Body() body: { quoteId: number; fromCurrency: string; toCurrency: string; amount: number }) {
    return this.fxConversionService.convertFx(
      body.quoteId,
      body.fromCurrency,
      body.toCurrency,
      body.amount,
    );
  }
}
