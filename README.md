![alt text](img/moonpig-logo.png "Moonpig")

# Node Backend Technical Challenge

You've been tasked with building a new "cards" service for the front-end of the Moonpig website. This exercise requires building a simple REST-like API with two endpoints - one for returning a list of cards and another that returns a single instance of a card.

We have provided three JSON files that serve as source data - you can find them at the following URLs:
- https://moonpig.github.io/tech-test-node-backend/cards.json
- https://moonpig.github.io/tech-test-node-backend/sizes.json
- https://moonpig.github.io/tech-test-node-backend/templates.json

Please treat these as a remote data source, rather than manually downloading and integrating into your application locally.

## Endpoints

### `/cards`

This endpoint returns a list of cards.
- `imageUrl` should be the image found on the template that corresponds to the first page for the card.
- `url` should have the format `/cards/[id]`

Expected JSON response from `GET /cards`:

```json
[
  {
    "title": "card 1 title",
    "imageUrl": "/front-cover-portrait-1.jpg",
    "url": "/cards/card001"
  },
  {
    "title": "card 2 title",
    "imageUrl": "/front-cover-portrait-2.jpg",
    "url": "/cards/card002"
  },
  {
    "title": "card 3 title",
    "imageUrl": "/front-cover-landscape.jpg",
    "url": "/cards/card003"
  }
]
```

### `/cards/[cardId]/[sizeId]`

This endpoint returns a single card identified by its `id`. It takes an optional route parameter `sizeId` - the sizing of a card affects its price.

- `price` is calculated by the multiplying the `basePrice` of the card by the `priceMultiplier` from the selected size. If no size is provided it should default to the `basePrice`.  The `basePrice` is the amount in pence and the result should be formatted as
a string e.g. `"£2.00"`.

Expected JSON response from `GET /cards/card001/gt`:

```json
{
  "title": "card 1 title",
  "size": "gt",
  "availableSizes": [
    {
      "id": "sm",
      "title": "Small"
    },
    {
      "id": "md",
      "title": "Medium"
    },
    {
      "id": "gt",
      "title": "Giant"
    }
  ],
  "imageUrl": "/front-cover-portrait-1.jpg",
  "price": "£4.00",
  "pages": [
    {
      "title": "Front Cover",
      "width": 300,
      "height": 600,
      "imageUrl": "/front-cover-portrait-1.jpg"
    },
    {
      "title": "Inside Left",
      "width": 300,
      "height": 600,
      "imageUrl": ""
    },
    {
      "title": "Inside Right",
      "width": 300,
      "height": 600,
      "imageUrl": ""
    },
    {
      "title": "Back Cover",
      "width": 300,
      "height": 600,
      "imageUrl": "/back-cover-portrait.jpg"
    }
  ]
}
```

## Tools, Libraries and frameworks

An app skeleton is provided for your convenience. It consists of the following tools:

- Express
- Jest for unit/integration testing
- Supertest for integration tests
- TypeScript - If you're not familiar with TypeScript you can use JavaScript instead.

## Scripts

| Command | Description |
|--|--|
| `yarn dev` | run the server in development (watch) mode on port 7000 |
| `yarn test` |  run tests using Jest watch mode |


## Assessment

We will assess the task based on the following criteria:

- How clean, modular and extensible the code is
- Considerations for performance
- Approach to testing
- Knowledge of Node and its APIs
- Use of Git

## Notes

We have provided a notes file `NOTES.md` for any notes that you wish to add that could help your application such as explaining why you've made certain decisions.

Please note we appreciate that your free time is important and feel that doing less "well" is preferable to doing more "less well".  With this in mind if you feel that your code is unfinished please leave some notes explaining what you'd do given more time.  We'll be more than happy to review this.

For your convenience we've made this a template repository so you can easily create a private copy.

When it comes to submission please follow the instructions provided in the email you were sent. Please ensure you submit the .git folder alongside your code.
