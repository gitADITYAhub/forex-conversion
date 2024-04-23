import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  topUpAccount(@Body() body: { currency: string; amount: number }) {
    return this.accountsService.topUpAccount(body.currency, body.amount);
  }

  @Get('balance')
  getAccountBalance() {
    return this.accountsService.getAccountBalance();
  }
}