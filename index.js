import express from 'express';
import gitrendering from './api/request.js'
// This is a Vercel specific Package.
import chromium from 'chrome-aws-lambda';
// You could also use puppeteer if you running on local Systems.
import puppeteer_pure from 'puppeteer';

const app = express();
const port = 3000;

const page = await StartRenderer();

async function StartRenderer(){

  const puppeteer = chromium.puppeteer;
      
  const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  const page = await browser.newPage();
  return page 
}

app.get('/', gitrendering(page));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

export default app;