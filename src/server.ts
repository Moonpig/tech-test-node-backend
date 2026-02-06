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
async function getSizes() {
  return fetchJson(sizesUrl);
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

app.get('/cards/:cardId/:sizeId?', async (req, res) => {
  try{
  // save what params user typed in
  const { cardId, sizeId } = req.params;
  const cards = await getAllCards();
  const templates = await getTemplates();
  const sizes = await getSizes();

  // find card matching id
  const card = cards.find(card => card.id === cardId);
  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }
  // get size requested or set to be undfined if not provided
  const selectedSize = sizeId
  ? sizes.find(s => s.id === sizeId)
  : undefined;

  // 404 if given size param doesn't match any in data
    if (sizeId && !selectedSize) {
      return res.status(404).json({ error: "Card size not found" });
    }
    // format price
    const pricePence = selectedSize ? card.basePrice * selectedSize.priceMultiplier : card.basePrice;
    const price = `£${(pricePence / 100).toFixed(2)}`; 

  // get template for card
  const template  = templates.find(t => t.id === card.pages[0].templateId);

  res.json({
    title: card.title,
    price,
    imageUrl: template ? template.imageUrl : "No image available",
  });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
})
