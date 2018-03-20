# PWA BTC
For internal use testing the tracking bitcoin realtime.

## How to using :
1. Download or Clone on the repo - https://github.com/elvatz/pwabtc
2. On root folder run `npm install`
3. Build the production on build folder by run `npm build run`
4. Go to build folder `cd build`
5. Create server.js and input the code
  `    
    const express = require('express')
    const path = require('path')
    const bodyParser = require('body-parser')
    const app = express()
    const Pusher = require('pusher')

    const pusher = new Pusher({
        appId: '494404',
        key: '2dbf8659a993d281e5e0',
        secret: '37ea681980b1b458f754',
        cluster: 'ap1',
        encrypted: true
    })

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.static(path.join(__dirname)));

    app.use((req, res, next) => { 
        res.setHeader('Access-Control-Allow-Origin', '*') 
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type') 
        res.setHeader('Access-Control-Allow-Credentials', true) 
        next()
    })

    app.set('port', (5000))

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.post('/prices/new', (req, res) => {
        pusher.trigger( 'coin-prices', 'prices', {
            prices: req.body.prices
        });
        res.sendStatus(200);
    })

    app.listen(app.get('port'), () => {
        console.log('Node app is running on port', app.get('port'))
    })
  `
  6. Run `npm init` and click enter until finish
  7. Run with `node server.js` 
  8. Open browser and go to localhost:5000
  9. Happy tracking!
