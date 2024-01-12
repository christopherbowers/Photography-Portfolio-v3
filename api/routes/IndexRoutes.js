import { Router } from "express";


export const IndexRoutes = Router()
  .get('/', (_, res) => {
    //res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    res.send('hello world');
  })


  .get('/content/*', (req, res) => {
    const regex = /\/content\/(.*)\/(.*)\.jpg/g;
    const path = req.path.replace(regex, 'images/$2.webp');

    res
      .writeHead(301, {
        Location: `https://photo.christopherbowers.net/${path}`,
      })
      .end();
  });
