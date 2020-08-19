![alt text](img/moonpig-logo.png "Moonpig")

# Node Backend Technical Challenge

We've been asked to rebuild the Moonpig cards service using the latest best practices.  We'd like you to build out a simple service that provides two endpoints that our frontend can hit.  
We have provided you with three JSON data sources in `/data` that should be used by the API to return the required JSON when a given endpoint is hit.

## Endpoints

### `/cards`

This endpoint returns a list of cards.
- `backgroundImageUrl` should be the front-cover image found on the corresponding page template.
- `url` should have the format `/cards/[id]`

Expected JSON output
```json
[
  {
    "title": "card 1 title",
    "backgroundImageUrl": "/front-cover-portrait-1.jpg",
    "url": "/cards/card001"
  },
  {
    "title": "card 2 title",
    "backgroundImageUrl": "/front-cover-portrait-2.jpg",
    "url": "/cards/card002"
  },
  {
    "title": "card 3 title",
    "backgroundImageUrl": "/front-cover-landscape.jpg",
    "url": "/cards/card003"
  }
]
```

### `/cards/[cardId]/[sizeId]`

This endpoint returns a single card by it's id.  It also takes an optional route parameter `sizeId` which is used to calculate the price.
- `price` is calculated by the multiplying the `basePrice` on the card by the `priceMultiplier` from the selected size.  If no size is provided it should default to the `basePrice`.

Expected JSON output when hitting `/cards/card001/gt`
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
  "backgroundImageUrl": "/front-cover-portrait-1.jpg",
  "price": "£4.00",
  "pages": [
    {
      "title": "Front Cover",
      "width": 300,
      "height": 600,
      "backgroundImageUrl": "/front-cover-portrait-1.jpg"
    },
    {
      "title": "Inside Left",
      "width": 300,
      "height": 600,
      "backgroundImageUrl": ""
    },
    {
      "title": "Inside Right",
      "width": 300,
      "height": 600,
      "backgroundImageUrl": ""
    },
    {
      "title": "Back Cover",
      "width": 300,
      "height": 600,
      "backgroundImageUrl": "/back-cover-portrait.jpg"
    }
  ]
}
```

## Tools, Libraries and frameworks

An app skeleton is provided for your convenience.  It consists of the following tools
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
  - Knowledge of Node and it's APIs

## Notes
We have provided a notes file `NOTES.md` for any notes that you wish to add that could help your application such as explaining why you've made certain decisions.

Please note we appreciate that your free time is important and feel that doing less "well" is preferable to doing more "less well".  With this in mind if you feel that your code is unfinished please leave some notes explaining what you'd do given more time.  We'll be more than happy to review this.
