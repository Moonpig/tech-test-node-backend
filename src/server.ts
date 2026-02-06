import express from "express";

export const app = express()

app.set('json spaces', 2);

//List of URL
const cardsUrl = "https://moonpig.github.io/tech-test-node-backend/cards.json"
const sizesUrl = "https://moonpig.github.io/tech-test-node-backend/sizes.json"
const templatesUrl = "https://moonpig.github.io/tech-test-node-backend/templates.json"

//helper to get data 
async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

// function fir first endpoint
async function getAllCards() {
  return fetchJson(cardsUrl);
}
async function getTemplates() {
  return fetchJson(templatesUrl);
}


app.get('/cards', async (req, res) => {
  try{
    const cards = await getAllCards();
    const templates = await getTemplates();

    const result = cards.map((card) => {
// hit pages array on card to compare templateID
      const firstPage = card.pages[0];
// find corresponding template for id cited in page array
const firstPageTemplate = templates.find(t => t.id === firstPage.templateId);

return {
        title: card.title,
        url: `/cards/${card.id}`,
        imageUrl: firstPageTemplate ? firstPageTemplate.imageUrl : "No image available",
      };
    })
   res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
})

app.get('/cards/:cardId/:sizeId?', () => {
  // respond with card by id
})
