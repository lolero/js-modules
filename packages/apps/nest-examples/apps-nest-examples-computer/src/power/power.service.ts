import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    // eslint-disable-next-line no-console
    console.log(`Supplying ${watts} of power`);
  }
}
