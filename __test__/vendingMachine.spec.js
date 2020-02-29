const VendingMachine = require("../lib/VendingMachine.js");
const Inventory = require("../mockData.json");

let chipsAhoyMachine;

describe("Vending Machine", () => {
  beforeEach(() => {
    chipsAhoyMachine = new VendingMachine(Inventory);
  });
  describe("when checking for inventory", () => {
    it("should return everything in mockData.json", () => {
      expect(chipsAhoyMachine.getInventory()).toBe(Inventory);
      expect(chipsAhoyMachine.getProducts()).toBe(Inventory.products);
      expect(chipsAhoyMachine.getChange()).toBe(Inventory.change);
    });
  });

  describe("when taking in money", () => {
    it("should return total price inserted into machine", () => {
      expect(chipsAhoyMachine.takeMoney(5)).toBe(5);
    });
  });
  describe("when the refund method is called", () => {
    it("should reset price paid to zero (both before and after purchase)", () => {
      expect(chipsAhoyMachine.refund()).toBe(0);
    });
  });
  describe("when selecting the id", () => {
    it("should give you the name of the product", () => {
      expect(chipsAhoyMachine.selectChip("A1")).toEqual(
        "Sweet Chili Heat Doritos"
      );
    });
  });
  describe("when selecting the wrong id or out of stock", () => {
    it("should throw an error", () => {
      expect(() => chipsAhoyMachine.selectChip("B1")).toThrow();
    });
  });
  // check for restocking coins and products
});
