# Melody Bot by creativefls

# requirement
- node v8
- mongo 3.6
- nodemon for development `npm i -g nodemon` (optional)
- pm2 for production `npm i -g pm2` (you can use other process manager up to you)

# How to run
- clone this repo
- `npm install`
- `cp .env.example .env`
- edit `.env` sesuaikan setting environment
- run for dev : `npm run dev` or `npm start` if you prefer not use nodemon
- run for prod : `pm2 start ./bin/www --name dinusian-service` (if you want to use pm2)
