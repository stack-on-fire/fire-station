![fire-station-banner](https://user-images.githubusercontent.com/29632358/134782760-fa9acebc-693e-4f14-8a94-caa8b3ab2596.png)

Suggest new features here

</a><a href="https://github.com/stack-on-fire/fire-station/discussions">
  <img alt="Join the discussion on Github" src="https://img.shields.io/badge/Github%20Discussions%20%26%20Support-Chat%20now!-blue" />
</a>

## What

Easy notifications about important events of your backend services. **New email signup**, **payment**, **user registration** - simple call to API and **you have it registered**.

## Why

When launching a new SaaS there are so many things to take care about that we always forget about most important - key metrics and events. How many users have signed up? Was the newly released feature even used? Fire Station is a hustle free way of solving this problem - on key important events just add a s**imple snippet of code** and enjoy all your **events in a single place**.

## How it looks like

<img width="1378" alt="Screenshot 2021-09-25 at 20 50 35" src="https://user-images.githubusercontent.com/29632358/134783051-cad8f20f-c979-4279-bceb-6bf17f7616f0.png">

## Try it out here(beta)

https://station.stackonfire.dev

## Guide

1. Create a new project
2. Add a new endpoint - rename it to your convenience so it meaningfully represents the event
3. Create new Access Token
4. Use the endpoint id in calling a simple API request

```typescript
  await axios.post(
    `station.stackonfire.dev/api/event/create?endpoint=${YOUR_ENDPOINT_ID}`,
    { metaData: variables.metaData }, // Send any kind of JSON you want to access later in the event information
    {
      headers: {
        Authorization:
          "Bearer " +
          "YOUR_ACCESS_TOKEN", // get the token form the Access Tokens tab as in screenshot below
      },
    }
  );

```
<img width="1159" alt="Screenshot 2021-09-25 at 21 02 01" src="https://user-images.githubusercontent.com/29632358/134783295-95415c76-890d-424d-8b88-7989e73b547c.png">


## Get started with self-hosted version

Fire station is dead simple to self host! You need to have an instance of Postgres database running, as long as you have the connection string you can safely deploy to Vercel. Environments variables necessary to run the app are listed in `.env.example`

Fire-station currently offers three methods of authentication - magic link, github and twitter. The auth setup is powered by Next-auth and to make it work you need to provide correct environment variables to the project.

To enable live notifications you will need to setup Pusher with their api and respective env vars.


## Contribute

- Clone the repo
- run `docker-compose up -d` in the terminal to boot up the database
- development environment uses MSW to mock session, so you don't need to set up next-auth related env variables to be able to log in. If you need to mimic login workflow - disable service workers in `_app.tsx` 
- run `yarn run dev` 
