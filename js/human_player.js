class HumanPlayer{
  constructor(startinghand, name){
    this.hand = startinghand;
    this.score = 0;
    this.name
  }

  playCard(pos, newcard){
    let playedCard = this.hand.splice(pos,1, newcard[0])
    return playedCard[0]
  };
}



module.exports = HumanPlayer;
