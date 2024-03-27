import { Injectable } from '@nestjs/common';
import { payDto } from './dto/pay.dto';
import axios from 'axios';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Thank for Buy ::::';
  }

  async makePayment(dto: payDto) {
    try {
    const {data} = await axios({
      method: 'POST',
      url: 'https://api.yookassa.ru/v3/payments',
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": Date.now()
      },
      auth: {
        username: "357076",
        password: 'test_9V43jlUrPjnZeBv-kDPRwyH7EylHhsPugf9h4u3UF_s'
      },
      data: {
        "amount": {
          "value": dto.amount,
          "currency": "RUB"
        },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: 'http://localhost:3000/'
        },
      }
    })

    return data
  } catch(err) {
    console.log(err)
  }
  }
}
