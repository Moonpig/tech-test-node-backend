import request from "supertest";
import { app } from "../../server";

describe("Cards API Integration Tests", () => {
  describe("GET /cards", () => {
    it("should return a list of card summaries", async () => {
      const response = await request(app).get("/cards");
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      if (response.body.length > 0) {
        const card = response.body[0];
        expect(card).toHaveProperty("title");
        expect(card).toHaveProperty("imageUrl");
        expect(card).toHaveProperty("url");
      }
    });
  });

  describe("GET /cards/:cardId/:sizeId?", () => {
    it("should return detailed info for a valid card and size", async () => {
      const response = await request(app).get("/cards/card001/gt");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("price");
      expect(response.body).toHaveProperty("availableSizes");
      expect(Array.isArray(response.body.availableSizes)).toBeTruthy();
      expect(response.body).toHaveProperty("pages");
      expect(Array.isArray(response.body.pages)).toBeTruthy();
    });

    it("should return 404 when card is not found", async () => {
      const response = await request(app).get("/cards/nonexistent");
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message", "Card not found.");
    });
  });
});
