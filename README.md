# app-nuxt-demo

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Deploy server then start

pm2 start yarn --name index -- run start:prod

`or`

pm2 start yarn --name index -- run start:test
