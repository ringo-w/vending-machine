class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
    this.profit = 0;
    this.pricePaid = 0;
  }

  getInventory() {
    return this.inventory;
  }
  getProducts() {
    return this.inventory.products;
  }
  getChange() {
    return this.inventory.change;
  }
  takeMoney(amount) {
    if (!amount) return new Error();
    this.pricePaid += amount;
    return this.pricePaid;
  }

  selectChip(id) {
    for (let chip of this.inventory.products) {
      if (chip.id === id && chip.currentQty > 0) {
        // if (this.pricePaid > id.price) {
        //   this.pricePaid -= id.price;
        //   refund();
        return chip.name;
      }
      // }
      else {
        throw new Error("Incorrect ID or out of stock. Please try again.");
      }
    }
  }
  refund() {
    return (this.pricePaid = 0);
  }
}

module.exports = VendingMachine;
