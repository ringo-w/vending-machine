// Canadian coin currencies only
class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
    this.pricePaid = 0;
  }

  // Check all inventory (e.g. mock data)
  getInventory() {
    return this.inventory;
  }

  // accumulate money inserted into machine
  takeMoney(amount) {
    if (!amount) return new Error();
    this.pricePaid += amount;
    return this.pricePaid;
  }

  // select chip by ID to allow for variable item in any slot
  // and check for available stock and matching ID
  selectChip(id, payment) {
    for (let chip of this.inventory.products) {
      if (chip.id === id && chip.currentQty === 0)
        throw new Error("Out of Stock");
      else if (chip.id === id && chip.currentQty > 0) {
        chip.currentQty--;
        this.calculateChange(payment, chip.price);
        return `Here is your ${chip.name}`;
      } else {
        throw new Error("Incorrect ID. Please try again.");
      }
    }
  }

  // dispense method
  dispense(id, payment) {
    if (!id || !payment) throw new Error("Error");
    for (let chip of this.inventory.products) {
      if (chip.id === id && chip.price > payment) {
        return "Insufficient Funds";
      } else if (chip.price <= payment) {
        return this.selectChip(id, payment);
      }
    }
  }

  // return the fewest number of coins
  calculateChange(payment, price) {
    let change = payment - price;
    if (change === 0) return 0;
    let coinCount = { Toonie: 0, Loonie: 0, Quarter: 0, Dime: 0, Nickel: 0 };
    while (change > 0) {
      if (change / 200 > 0 || change / 200 === 0) {
        coinCount.Toonie = Math.floor(change / 200);
        change %= 200;
      }
      if (change / 100 > 0 || change === 0) {
        coinCount.Loonie = Math.floor(change / 100);
        change %= 100;
      }
      if (change / 25 > 0 || change === 0) {
        coinCount.Quarter = Math.floor(change / 25);
        change %= 25;
      }
      if (change / 10 > 0 || change === 0) {
        coinCount.Dime = Math.floor(change / 10);
        change %= 10;
      }
      if (change / 5 > 0 || change === 0) {
        coinCount.Nickel = Math.floor(change / 5);
        change %= 5;
      }
    }

    return coinCount;
  }

  // restock product one by one with while loop
  restock() {
    this.inventory.products.forEach(product => {
      while (product.currentQty < product.maxQty) product.currentQty++;
    });
    return this.inventory.products;
  }

  // replenish change by topping off to the max quantity
  refillChange() {
    this.inventory.change.forEach(coin => {
      if (coin.currentQty < coin.minQty) coin.currentQty = coin.maxQty;
    });
    return this.inventory.change;
  }

  // refund the accumulated coins inserted
  refund() {
    return (this.pricePaid = 0);
  }
}

module.exports = VendingMachine;
