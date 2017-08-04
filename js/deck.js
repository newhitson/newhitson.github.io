const Card = require("./card");

class Deck {
  constructor(){
    this.values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    this.suits = ['H','D','S','C'];
    this.cards = [];

    for (var s = 0; s < this.suits.length; s++) {
      for (var v = 0; v < this.values.length; v++) {
        this.cards.push( new Card( this.suits[s], this.values[v] ))
      }
    }
    this.cards = this.shuffle(this.cards);
 };

 shuffle(a) {
  for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

 take(n){
  let taken = [];
  for (var i = 0; i < n; i++) {
    taken.push(this.cards.shift());
  }
  this.outOfCards();
  return taken;
  //returns cards in a array
 }

 outOfCards(){
   if (this.cards.length === 0){
      let shuffleUp = new Deck
      this.cards = shuffleUp.cards
   }
 }

}

module.exports = Deck;
