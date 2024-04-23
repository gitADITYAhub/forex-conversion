import { Module } from '@nestjs/common';
import { FxConversionController } from './fx-conversion.controller';
import { FxConversionService } from './fx-conversion.service';
import { FxRatesModule } from '../fx-rates/fx-rates.module';

@Module({
  imports: [FxRatesModule],
  controllers: [FxConversionController],
  providers: [FxConversionService],
})
export class FxConversionModule {}
