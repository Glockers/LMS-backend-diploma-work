import { RequestWithRawBody } from 'src/common/middleware/rawBody.middleware';
import { StripeService } from './stripe.service';
import {
  Controller,
  Post,
  Headers,
  Req,
  BadRequestException
} from '@nestjs/common';
import Stripe from 'stripe';

@Controller('webhook')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = await this.stripeService.constructEventFromPayload(
      signature,
      request.rawBody
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session?.metadata?.userId;
      const courseId = session?.metadata?.courseId;

      if (!userId || !courseId) {
        return new BadRequestException('Webhook Error: Missing metadata');
      }

      await this.stripeService.createPurchase(userId, courseId);
    } else {
      return new BadRequestException(
        `Webhook Error: Unhandled event type ${event.type}`
      );
    }
  }
}
