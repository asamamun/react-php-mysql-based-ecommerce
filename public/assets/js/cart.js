class Cart {
    constructor() {
      this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }
  
    addItem(item) {
      this.items.push(item);
      this.updateStorage();
    }
  
    removeItem(item) {
        this.items = this.items.filter(e=> e.id!=item)
        this.updateStorage();
    //   const index = this.items.indexOf(item);
    //   if (index > -1) {
    //     this.items.splice(index, 1);
        
    //   }
    }
    
  
    updateStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  
    getTotal() {
      return this.items.reduce((total, item) => total + item.price, 0);
    }
    totalItems(){
      return this.items.length;
    }
    getItems(){
        return this.items;
    }
    emptyCart(){
      this.items = [];
      localStorage.removeItem('cart');
    }
  }