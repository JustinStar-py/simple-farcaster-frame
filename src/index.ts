import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'
import type { FrameSignaturePacket } from './types'

const app = new Hono()

app.get('/', (c) => {
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
          <h1 style="font-size: 10px">Hello World!</h1>
      </body>
    </html>
  `)
})

app.post('/', async (c) => {
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

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
