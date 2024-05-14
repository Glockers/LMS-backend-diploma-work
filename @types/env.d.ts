declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DATABASE_URL: string;
    STRIPE_WEBHOOK_SECRET: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_PUBLISHABLE_KEY: string;
  }
}
