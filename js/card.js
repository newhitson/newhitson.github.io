
class Card {
  constructor(suit,value) {
    this.suit = suit;
    this.value = value;
    this.name = this.value + this.suit
  }
  gameValue(){
    const gameValues = {'A':1,'2':2,'3':3,'4':0,'5':5,'6':6,'7':7,'8':8,'9':0,
                        '10':-10,'J':0,'Q':10,'K':10}
    return gameValues[this.value]
  }

}
module.exports = Card;
