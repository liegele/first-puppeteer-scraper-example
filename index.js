import puppeteer from 'puppeteer';

const getQuotes = async () => {
  //Start a Puppeteer session with:
  //- a visible browser ('headless: false' - easier to debug because you'll see the browser in action)
  //- no default viewport ('defaultviewport: null' - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    // defaultviewport: null,
  });

  //Open a new page/tab
  const page = await browser.newPage();

  //On this page/tab
  // - open the 'https://quotes.toscrape.com/' website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto('http://quotes.toscrape.com', {
    waitUntil: 'domcontentloaded',
  });

  //Set screen size
  await page.setViewport({ width: 1980, height: 1024 });

  //Get page data
  const quotes = await page.evaluate(() => {
    //Fetch the first element with class "quote"
    const quote = document.querySelector('.quote');

    //Fetch the sub-elements from the previously fetched quote element
    //Get the displayed text and returned it ('innerText')
    const text = quote.querySelector('.text').innerText;
    const author = quote.querySelector('.author').innerText;

    return { text, author };
  });

  //Display quotes
  console.log(quotes);

  /* //Close tab
  await page.close();
  //Close the browser
  await browser.close(); */
};

//Start the scraping
getQuotes();
