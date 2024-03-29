# Next Booking App

Website where you can find and book short- and long-term homestays and experiences all over the world.

**Demo:** [https://next-book-app.vercel.app/](https://next-book-app.vercel.app/)

Features:

- Credential authentication with NextAuth
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Search algorithm by category, location, date range, number of guests, rooms and bathrooms
- Reservation system
- Styling with Tailwind
- Prisma with MongoDB

## Installation

To clone and run this application locally, you'll need Node.js and npm installed on your computer.

```shell
# Clone the repository
git clone https://github.com/bushnastyaa/next-booking-app.git

# Install packages
npm i
```

Setup .env file

```js
DATABASE_URL=
NEXTAUTH_SECRET=
```

Setup Prisma

```shell
npx prisma db push
```

Run the app

```shell
npm run dev
```

## Tools

`typescript` `next` `react` `mongodb` `prisma` `tailwind` `next-auth` `react-hook-form`
