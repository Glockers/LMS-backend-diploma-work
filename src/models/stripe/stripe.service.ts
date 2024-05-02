import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private readonly databaseService: DatabaseService
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      typescript: true,
      apiVersion: '2023-08-16'
    });
  }

  public async constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );
  }

  public async createPurchase(userId, courseId) {
    return this.databaseService.purchase.create({
      data: {
        userId,
        courseId
      }
    });
  }
}
