import { NextApiRequest, NextApiResponse } from 'next'
import { getScreenshot } from '../../infra/getScreenshot';

const getHTML = ({ title }) => `
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        margin: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: sans-serif;

        background-color: #666;
      }

      h1 {
        font-size: 10vw;
        color: #fff;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>
    ${title}
    </h1>
  </body>
</html>
`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const isHTMLDebugMode = false;
  const html = getHTML({
    title: req.query.title || 'Título',
  })
  
  if (isHTMLDebugMode) {
    res.setHeader('Content-Type', 'text/html')
    return res.end(html)
  }

  const file = await getScreenshot(html);

  res.setHeader('Content-Type', `image/png`)
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
  );

  res.end(file);
}