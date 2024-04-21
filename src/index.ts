import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'
import type { FrameSignaturePacket } from './types';

// other dependencies
import * as qs from 'qs';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();
const app = new Hono()

app.get('/gm-gn', (c) => {
  const frameImage = 'https://media1.giphy.com/media/AGk0lxogARkwyE3hHr/giphy.gif?cid=790b7611axxlg1weuuvijlc6rl1bdopm5y42povo4yf4o8f0&ep=v1_gifs_search&rid=giphy.gif&ct=g'
  const framePostUrl = c.req.url

  return c.html(html`
    <html lang="en">
      <head>
        <meta property="og:image" content="${frameImage}" />
        <meta property="fc:frame" content="vNext" />
  
        <meta property="fc:frame:image" content="${frameImage}" />
        <meta property="fc:frame:image:aspect_ratio" content="1:1" />
        <meta property="fc:frame:post_url" content="${framePostUrl}" />
        <meta name="fc:frame:button:1" content="Start" />
        <meta name="fc:frame:button:2" content="Justin Repo Github" />
        <meta name="fc:frame:button:2:action" content="link" />
        <meta name="fc:frame:button:2:target" content="https://github.com/JustinStar-py/simple-farcaster-frame" />
        <title>Farcaster Frames</title>
      </head>
      <body>
        <div style="text-align: center; padding-top: 50px; padding-bottom: 50px">
          <h1 style="font-size: 15px; font-family: monospace; background-color: black; color: white;">Hello World!</h1>
        </div>
      </body>
    </html>
  `)
})

app.post('/gm-gn', async (c) => {
  try {
    const body = await c.req.json<FrameSignaturePacket>()
    const { buttonIndex, inputText } = body.untrustedData
   
    const images = [
      'https://i.seadn.io/s/raw/files/5ee72f82317c8674393956c846b84fd7.gif?auto=format&dpr=1&w=1000', // GM
      'https://i.seadn.io/s/raw/files/3ab033231437165cd2378a5a31cd5e4b.gif?auto=format&dpr=1&w=3840' // GN
    ]
    const defaultImage = 'https://media1.giphy.com/media/AGk0lxogARkwyE3hHr/giphy.gif?cid=790b7611axxlg1weuuvijlc6rl1bdopm5y42povo4yf4o8f0&ep=v1_gifs_search&rid=giphy.gif&ct=g'
    const frameImage = images[buttonIndex - 1] || defaultImage
    const framePostUrl = c.req.url

    return c.html(html`
      <html lang="en">
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${frameImage}" />
          <meta property="fc:frame:image:aspect_ratio" content="1:1" />
          <meta property="fc:frame:post_url" content="${framePostUrl}" />
          <meta property="fc:frame:button:1" content="Gm!" />
          <meta property="fc:frame:button:2" content="Gn!" />
          <title>Farcaster Frames</title>
        </head>
      </html>
    `)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Invalid request' }, 400)
  }
})

// ========================================= //

app.get('/degen-chart', (c) => {
  const frameImage = 'https://jolly-diverse-herring.ngrok-free.app/gifs/degen-chart.gif'
  const framePostUrl = c.req.url
  const frameSharingText = "https://warpcast.com/~/compose?text=Check $DEGEN chart easily here! ✨" + encodeURIComponent("\n") + "frame by @justin-eth 🤝🏻&embeds[]=https://jolly-diverse-herring.ngrok-free.app/degen-chart"

  return c.html(html`
    <html lang="en">
      <head>
        <meta property="og:image" content="${frameImage}" />
        <meta property="fc:frame" content="vNext" />
  
        <meta property="fc:frame:image" content="${frameImage}" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:post_url" content="${framePostUrl}" />
        <meta name="fc:frame:button:1" content="$DEGEN Chart" />
        <meta name="fc:frame:button:2" content="Share" />
        <meta name="fc:frame:button:2:action" content="link" />
        <meta name="fc:frame:button:2:target" content="${frameSharingText}" />
        <title>Farcaster Frames</title>
      </head>
      <body>
        <div style="text-align: center; padding-top: 50px; padding-bottom: 50px">
          <h1 style="font-size: 10px">Hello World!</h1>
      </body>
    </html>
  `)
})

app.post('/degen-chart', async (c) => {
  try {
    const intervalTimesButtons = ["15m", "1h", "4h", "1d"]
    const choosingTimeframe = "https://jolly-diverse-herring.ngrok-free.app/gifs/chart-timeframe.gif"

    // convert text to url string
    const framePostUrl = c.req.url
    return c.html(html`
      <html lang="en">
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${choosingTimeframe}" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:post_url" content="${framePostUrl.replace("degen-chart", "degen-chart-show")}" />
          <meta name="fc:frame:button:1" content="${intervalTimesButtons[0]}" />
          <meta name="fc:frame:button:2" content="${intervalTimesButtons[1]}" />
          <meta name="fc:frame:button:3" content="${intervalTimesButtons[2]}" />
          <meta name="fc:frame:button:4" content="${intervalTimesButtons[2]}" />
          <title>Farcaster Frames</title>
        </head>
      </html>
    `)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Invalid request' }, 400)
  }
})

app.post('/degen-chart-show', async (c) => {
  try {
    const body = await c.req.json<FrameSignaturePacket>()
    const { buttonIndex } = body.untrustedData
    const intervalTimesButtons = ["15m", "1h", "4h", "1d"]
    const fixingBugFrameImage = "https://jolly-diverse-herring.ngrok-free.app/gifs/fixing-bugs.gif"

    const framePostUrl = c.req.url

    const fetchImage = async () => {
      const img = await axios.get('https://api.chart-img.com/v1/tradingview/advanced-chart/storage', {
          headers: {
            Authorization: 'Bearer ' + process.env.CHART_IMG_KEY,
          },
          params: {
            symbol: 'BYBIT:DEGENUSDT',
            interval: intervalTimesButtons[buttonIndex - 1],
            studies: [],
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          },
        })
        .then((res) => {
          return res.data.url
        }).catch((err) => {
          console.error(err)
        })

      return img;
    }

    return c.html(html`
      <html lang="en">
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${await fetchImage()}" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:post_url" content="${framePostUrl}" />
          <meta name="fc:frame:button:1" content="${intervalTimesButtons[0]}" />
          <meta name="fc:frame:button:2" content="${intervalTimesButtons[1]}" />
          <meta name="fc:frame:button:3" content="${intervalTimesButtons[2]}" />
          <meta name="fc:frame:button:4" content="${intervalTimesButtons[3]}" />
          <title>Farcaster Frames</title>
        </head>
      </html>
    `)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Invalid request' }, 400)
  }
})

// ========================================= //

app.get('/gifs/:filename', async (c) => {
  const filename = c.req.param('filename');
  const gifPath = path.join(__dirname, 'gifs', filename);

  try {
    const fileData = await fs.promises.readFile(gifPath);
    const extension = path.extname(filename).slice(1);

    c.header('Content-Type', `image/${extension}`);
    return c.body(fileData);
  } catch (err) {
    console.error(err);
    return c.text('File not found', 404);
  }
});


const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
