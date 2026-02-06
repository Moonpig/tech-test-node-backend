import express from "express";

export const app = express()

app.set('json spaces', 2);

const cardsUrl = "https://moonpig.github.io/tech-test-node-backend/cards.json"
const sizesUrl = "https://moonpig.github.io/tech-test-node-backend/sizes.json"
const templatesUrl = "https://moonpig.github.io/tech-test-node-backend/templates.json"

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

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
      const firstPage = card.pages[0];
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
  const { cardId, sizeId } = req.params;
  const cards = await getAllCards();
  const templates = await getTemplates();
  const sizes = await getSizes();

  const card = cards.find(card => card.id === cardId);
  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }
  const selectedSize = sizeId
  ? sizes.find(s => s.id === sizeId)
  : undefined;

    if (sizeId && !selectedSize) {
      return res.status(404).json({ error: "Card size not found" });
    }
    const pricePence = selectedSize ? card.basePrice * selectedSize.priceMultiplier : card.basePrice;
    const price = `£${(pricePence / 100).toFixed(2)}`; 

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
