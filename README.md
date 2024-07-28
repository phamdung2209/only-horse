<h1 align="center">OnlyFans but for Horses 🐴</h1>

![Demo App](https://res.cloudinary.com/den0awox0/image/upload/v1722181963/horse/DEMO/a5z7sagdfbbspjhgkcvw.png)

Some Features:

-   ⚛️ Tech Stack: Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Stripe
-   🔐 Authentication with Kinde Auth
-   💸 Monthly and Annually Subscriptions with Stripe.
-   💰 One Time Payments with Stripe
-   💵 Building a Stripe Billing Portal
-   🛒 E-Commerce Store
-   ✉ Sending "Successful Payment" Emails to Users
-   ✍️ Creating Posts
-   💬 Commenting on Posts
-   ❤️ Liking Posts
-   🔒 Secret Admin Dashboard
-   📝 Data Aggregation with Prisma
-   🖼️ Edit Profile
-   📷 Image/Video Uploads using Cloudinary
-   💙 Awesome Landing Page
-   🌐 Deployment
-   👀 And Millions of Other Cool Features

### Setup .env file

```js
NEXT_PUBLIC_BASE_URL=<base_url>

// KINDE
KINDE_CLIENT_ID=<get_from_kinde>
KINDE_CLIENT_SECRET=<get_from_kinde>
KINDE_ISSUER_URL=<get_from_kinde>
KINDE_SITE_URL=<get_from_kinde>
KINDE_POST_LOGOUT_REDIRECT_URL=<get_from_kinde>
KINDE_POST_LOGIN_REDIRECT_URL=<get_from_kinde>

// CLOUDINARY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<get_from_cloudinary>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<get_from_cloudinary>
CLOUDINARY_API_SECRET=<get_from_cloudinary>

// STRIPE
STRIPE_SECRET_KEY=<get_from_stripe>
STRIPE_BILLING_PORTAL_LINK_DEV=<get_from_stripe>
STRIPE_BILLING_PORTAL_LINK_LIVE=<get_from_stripe>

STRIPE_WEBHOOK_SECRET_DEV_KEY=<get_from_stripe>
STRIPE_WEBHOOK_SECRET_LIVE_KEY=<get_from_stripe>

NEXT_PUBLIC_STRIPE_DEV_MONTHLY_URL=<get_from_stripe>
NEXT_PUBLIC_STRIPE_DEV_YEARLY_URL=<get_from_stripe>

NEXT_PUBLIC_STRIPE_LIVE_MONTHLY_URL=<get_from_stripe>
NEXT_PUBLIC_STRIPE_LIVE_YEARLY_URL=<get_from_stripe>

STRIPE_YEARLY_PLAN_PRICE_ID_=<get_from_stripe>
STRIPE_MONTHLY_PLAN_PRICE_ID_=<get_from_stripe>

// FIREBASE
NEXT_PUBLIC_FIREBASE_API_KEY=<get_from_firebase>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<get_from_firebase>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<get_from_firebase>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<get_from_firebase>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<get_from_firebase>
NEXT_PUBLIC_FIREBASE_APP_ID=<get_from_firebase>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<get_from_firebase>

// SQL
DATABASE_URL=<any_postgres_db_url>

// RESEND
RESEND_API_KEY=<get_from_resend>

ADMIN_EMAIL=<your_email>
```

### Install dependencies

```shell
npm install
```

### Start the app

```shell
npm run dev
```

<hr/>
<hr/>
This project is built for educational purposes only. If you have any questions, feel free to reach out to me on [Facebook](https://www.facebook.com/dungpv2209) or [Instagram](https://www.instagram.com/phamdung.22092003).
<hr/>
<hr/>

### Enjoy the project! 😊

### License

```
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
