// import { Module } from '@nestjs/common';
// import { FxRatesService } from './fx-rates.service';
// import { FxRatesController } from './fx-rates.controller';

// @Module({
//   providers: [FxRatesService],
//   controllers: [FxRatesController]
// })
// export class FxRatesModule {}
import { Module } from '@nestjs/common';
import { FxRatesController } from './fx-rates.controller';
import { FxRatesService } from './fx-rates.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [FxRatesController],
  providers: [FxRatesService],
  exports: [FxRatesService],
})
export class FxRatesModule {}
