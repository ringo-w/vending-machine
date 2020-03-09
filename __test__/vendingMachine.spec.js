const VendingMachine = require("../lib/VendingMachine.js");
const Inventory = require("../mockData.json");

let chipsAhoyMachine;

describe("Vending Machine", () => {
  beforeEach(() => {
    chipsAhoyMachine = new VendingMachine(Inventory);
  });
  describe("when checking running getInventory", () => {
    it("should return all products and change available", () => {
      expect(chipsAhoyMachine.getInventory()).toBe(Inventory);
    });
  });

  describe("when the vending machine takes money", () => {
    it("should return total amount inserted into machine", () => {
      expect(chipsAhoyMachine.takeMoney(1)).toEqual(1);
    });
  });
  describe("when the refund method is called", () => {
    it("should reset price paid to zero (both before and after purchase)", () => {
      expect(chipsAhoyMachine.refund(5)).toEqual(0);
    });
  });

  describe("when selecting product while in stock", () => {
    it("should reduce the current stock quantity by 1", () => {
      chipsAhoyMachine.selectChip("A1");
      expect(Inventory.products[0].currentQty).toEqual(9);
    });
  });

  describe("when choosing the product by selecting the id", () => {
    it("should give you the name of the product as 'dispensed'", () => {
      expect(chipsAhoyMachine.selectChip("A1")).toEqual(
        "Here is your Sweet Chili Heat Doritos"
      );
    });
  });

  describe("when selecting an id that does not exist", () => {
    it("should throw an error", () => {
      expect(() => chipsAhoyMachine.selectChip("B1")).toThrow();
    });
  });

  describe("when dispensing, throw an error if no coins inserted or incorrect id", () => {
    it("should throw an error if there are no coins", () => {
      expect(() => chipsAhoyMachine.dispense("A1", 0)).toThrow();
    });
  });

  describe("when dispensing, with insufficient fund", () => {
    it("should return a string 'insufficient funds'", () => {
      expect(chipsAhoyMachine.dispense("A1", 100)).toEqual(
        "Insufficient Funds"
      );
    });
  });

  describe("when dispensing a product", () => {
    it("should return the proper amount of change", () => {
      expect(chipsAhoyMachine.calculateChange(30010, 100)).toEqual({
        Dime: 1,
        Loonie: 1,
        Nickel: 0,
        Quarter: 0,
        Toonie: 149
      });
    });
  });

  describe("when restock method is called", () => {
    it("should restock the quantity of each chip to maxQty", () => {
      expect(chipsAhoyMachine.restock()).toEqual(Inventory.products);
    });
  });

  describe("refillChange", () => {
    it("should refill any coin below 50 to 100", () => {
      expect(chipsAhoyMachine.refillChange()).toEqual(Inventory.change);
    });
  });
});
