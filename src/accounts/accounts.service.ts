import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  private balances: Record<string, number> = {};

  topUpAccount(currency: string, amount: number) {
    if (!this.balances[currency]) {
      this.balances[currency] = 0;
    }
    this.balances[currency] += amount;
    return { message: `Account topped up with ${amount} ${currency}` };
  }

  getAccountBalance() {
    return { balances: this.balances };
  }
}