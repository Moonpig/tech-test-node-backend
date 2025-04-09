==============================================================================================================
Key Points of My Cards Model and Approach:
==============================================================================================================

## Central Focus on the Cards Model:

I placed most of the business logic in the Cards model because it is responsible for transforming raw data (DTOs) into the final representations used by the application. My model takes in raw card data, along with lookup maps for templates and sizes, and converts this into both a summary and a detailed view of a card. I ended up passing "Maps" in to the cards model as this made looking up templates and sizes much easier and more efficient.

## Separation of Concerns:

- getSummary: This function returns a concise card summary containing essential details such as the title, the image URL (taken from the first page’s template), and the URL for further details.
- getDetails: This function produces a detailed representation of the card. It validates the provided size, maps the raw page data with the corresponding template information, and calculates the price using a size-specific multiplier while formatting it for display.

## Explicit Dependency Injection:

By passing in lookup maps (for card sizes and templates) as parameters, the model is decoupled from the data retrieval process. This makes the model independent, easier to test, and more flexible for future modifications.

## Robust Error Handling:

The model actively checks for missing sizes or templates. When an expected size or template is not found, it throws a descriptive error. This design choice prevents silent failures and ensures that errors are caught early in the transformation process.

## Type Safety and Clean API Contracts:

Leveraging TypeScript, I defined clear interfaces (such as CardDTO, CardSummary, CardDetails, etc.) which ensure that every part of the data transformation is strongly typed. This minimizes runtime errors and improves maintainability.

## TDD Approach:

I followed a Red/Green/Refactor TDD workflow during development. I began by writing tests that defined the expected behavior of the Cards model (Red), implemented the minimal code required to make the tests pass (Green), and then refactored the code for clarity and maintainability (Refactor). I’ve reflected this iterative process in my Git commit history, demonstrating a disciplined approach to TDD.

## ES6 Modules over Classes:

I deliberately chose ES6 modules over classes for both TypeScript and JavaScript. This approach simplifies the code and aligns with my preference for functional, module-based design patterns that are less verbose while remaining fully type-safe and testable.

Overall, my Cards model stands out because it consolidates core business logic, enforces strong data validation through TypeScript types, and maintains clear separation between data transformation and data fetching. By focusing my testing efforts on this module and adhering to a TDD workflow, I've ensured that this critical part of the system is robust, easy to maintain, and scalable for future enhancements.

==============================================================================================================
Below are some project notes outlining additional improvements I’d consider if I had more time:
==============================================================================================================

Refactor Card Service with Dependency Injection (Card Factory):
• I’d refactor the card service into a function that accepts a dependency, namely a "Card Factory."
• This change would decouple the service from a specific implementation of the card model, making it easier to swap out or extend in the future.
• It would also simplify unit testing of the card service, as I could inject a mock version of the card model.

Utilize Mock Service Worker (MSW) for API Calls:
• Instead of solely relying on Jest for mocking API responses, I’d evaluate integrating Mock Service Worker.
• MSW intercepts actual network requests, enabling more realistic, network-level testing.
• This improves development workflows by streamlining API mocking and can simplify both unit and end-to-end test scenarios.

Enhanced Unit Testing for Controllers with Dependency Injection:
• I’d add tests that specifically target the cardController, injecting the card service as a dependency.
• This further reduces direct coupling between the HTTP layer and business logic, making the controller easier to test in isolation.
• Although my primary tests focus on core business logic in the service and models along with overarching integration tests, controller unit tests would provide extra confidence in the API layer.

Modularize Routes and Create Dedicated Tests for Them:
• Splitting the routes into a dedicated cardRoutes file helps keep the app.ts file cleaner and improves maintainability.
• Isolating routes makes it easier to write unit tests for route-specific logic, ensuring that every endpoint behaves as expected.

Implement Caching Mechanisms (e.g., node-cache or Redis):
• Adding caching would reduce the number of repeated HTTP calls to external data sources.
• Using node-cache or Redis could drastically improve performance, especially when the remote data does not change frequently.
• This would be particularly valuable under load, ensuring the system scales better while keeping response times low.

Implement Paging for the cards list
• Reduced Payload Size:
Pagination allows the API to return a limited subset of cards per request instead of loading the entire dataset at once.
This leads to faster response times and lower network bandwidth usage, which is particularly beneficial when the dataset is large.

• Improved Server Performance:
By limiting the number of records processed and sent in each call, pagination reduces the load on the server.
This enhances overall performance, helps with scalability, and minimizes the risk of timeouts or memory issues when handling high traffic.
