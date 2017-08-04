const Card = require("./card");
const Deck = require("./deck");
const HumanPlayer = require("./human_player");
const ComputerPlayer = require("./computer_player")



class Game{
  constructor(ctx, canvasEl){
    this.deck = new Deck;
    this.count = 0;
    this.computer1 = new ComputerPlayer(this.deck.take(3), [150, 220], "computer 1");
    this.computer2 = new ComputerPlayer(this.deck.take(3),[680, 220], "comptuer 2" );
    this.human = new HumanPlayer(this.deck.take(3), "Human Player");
    this.turnorder = [this.human, this.computer1, this.computer2 ];
    this.ctx = ctx;
    this.canvasEl = canvasEl;
    this.clickOnCard = this.clickOnCard.bind(this);
    this.clickOnButton = this.clickOnButton.bind(this);
  }

  startGame(){
    this.renderGame();
    this.takeTurn(this.turnorder[0])
  }

  takeTurn(player){
    this.turnorder.shift();
    if (player !== this.human ) {
      setTimeout(function(){ this.computerPlayerTurn(player); }.bind(this), 1200); } else {
        this.canvasEl.addEventListener("click",this.clickOnCard);
      }
    }

  isGameOver(){
    if(this.count > 99){
      this.ctx.font = '64px serif';
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.fillText(`You Lose`, 470, 100);
      this.playAgain();
    } else if( this.turnorder.length === 1 ) {
      this.ctx.font = '64px serif';
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.fillText(`You Win`, 470, 100);
      this.human.score = this.human.score + 1;
      this.playAgain();
    }else{
      this.takeTurn(this.turnorder[0])
    }

  }

  computerPlayerTurn(player){
    let playedCard = player.takeTurn(this.count);
    if (playedCard !== "bust") {
      this.renderCard(player, playedCard);
      this.addToCount(playedCard);
      this.turnorder.push(player)
    }
      player.receiveCard(this.deck.take(1));
      this.renderGame();
      this.isGameOver();
  }

  renderCard(player, card){
    if (player.name === "computer 1" ){
      let cardimg = new Image();
      cardimg.src = `./PNG/${card.name}.png`
      cardimg.onload = function(){
      this.ctx.drawImage(cardimg, player.location[0] , 120 , cardimg.width * 0.09, cardimg.height * 0.09);
      }.bind(this);
      } else {
      let cardimg2 = new Image();
      cardimg2.src = `./PNG/${card.name}.png`
      cardimg2.onload = function(){
      this.ctx.drawImage(cardimg2, player.location[0] , 120 , cardimg2.width * 0.09, cardimg2.height * 0.09);
      }.bind(this);
  }
  }


  addToCount(card){
    let value;
    if (card.value === 'J') {
       value = 99 - this.count;
    } else if( card.value === '4'){
      this.turnorder.reverse();
      value = card.gameValue();
    } else {
       value = card.gameValue();
    }
    this.count = this.count + value;
  }

  renderGame(){
    this.renderCount();
    this.renderHand();
    this.renderPlayers();
    this.renderScore();
  }


  renderPlayers(){
    this.turnorder.forEach((player) => {
      if (player !== this.human){
        let cardimg = new Image();
        cardimg.src = `./PNG/hand.png`
        cardimg.onload = function(){
          this.ctx.drawImage(cardimg,
                              player.location[0]
                              ,player.location[1]
                              ,cardimg.width * 0.15,
                              cardimg.height * 0.15);
        }.bind(this)
      }
    });
  }


  renderCount(){
    this.ctx.font = '48px serif';
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillText(`${this.count}`, 470, 100);
  }


  renderHand(){
    let cardimg = new Image();
    cardimg.src = `./PNG/${this.human.hand[0].name}.png`
    cardimg.onload = function(){
    this.ctx.drawImage(cardimg, 120 , 520 , cardimg.width * 0.15, cardimg.height * 0.15);
    }.bind(this);

    let cardimg2 = new Image();
    cardimg2.src = `./PNG/${this.human.hand[1].name}.png`
    cardimg2.onload = function(){
    this.ctx.drawImage(cardimg2, 222 , 520 , cardimg2.width * 0.15, cardimg2.height * 0.15);
    }.bind(this);

    let cardimg3 = new Image();
    cardimg3.src = `./PNG/${this.human.hand[2].name}.png`
    cardimg3.onload = function(){
    this.ctx.drawImage(cardimg3, 324 , 520 , cardimg3.width * 0.15, cardimg3.height * 0.15);
    }.bind(this);
  }


  clickOnCard(event){

    var x = event.clientX;
    var y = event.clientY;
    if( (x>195 && y>580) && (x<295 && y<688) ){
      let playedCard = this.human.playCard(0,this.deck.take(1))
      this.canvasEl.removeEventListener("click", this.clickOnCard);
      // this.canvasEl.removeEventListener("click", evt => this.clickOnCard(evt));
      this.addToCount(playedCard);
      this.renderGame();
      this.turnorder.push(this.human);
      this.isGameOver();
    }
    if( (x>296 && y>580) && (x<396 && y<688) ){
      let playedCard = this.human.playCard(1,this.deck.take(1))
      this.canvasEl.removeEventListener("click", this.clickOnCard);
      this.addToCount(playedCard);
      this.renderGame();
      this.turnorder.push(this.human);
      this.isGameOver();;
      }
    if( (x>397 && y>585) && (x<496 && y<688) ){
      let playedCard = this.human.playCard(2,this.deck.take(1))
      this.canvasEl.removeEventListener("click", this.clickOnCard);
      this.addToCount(playedCard);
      this.renderGame();
      this.turnorder.push(this.human);
      this.isGameOver();;
      }
  }

  playAgain(){
    let button = new Image();
    button.src = `./PNG/button_play_again.png`
    button.onload = function(){
    this.ctx.drawImage(button, 250 , 270 , button.width, button.height);
    }.bind(this);
    this.canvasEl.addEventListener("click",this.clickOnButton)
  }

  clickOnButton(event){
    var x = event.clientX;
    var y = event.clientY;

    if( (x>286 && y>332) && (x<637 && y<475) ){
      this.canvasEl.removeEventListener("click", this.clickOnButton);
      this.human.hand = this.deck.take(3);
      this.count = 0;
      this.turnorder = [this.human, this.computer1, this.computer2 ];
      this.startGame();
    }
  }

  renderScore(){
    let beans = this.human.score
    if (beans === 1){
      let bean = new Image();
      bean.src = `./PNG/coffee_bean.png`
      bean.onload = function(){
      this.ctx.drawImage(bean, 474 , 570 , bean.width * 0.15, bean.height * 0.15);
      }.bind(this);
    } else if (beans === 2) {
      let bean = new Image();
      bean.src = `./PNG/french_press.png`
      bean.onload = function(){
      this.ctx.drawImage(bean, 440 , 520 , bean.width * 0.2, bean.height * 0.2);
      }.bind(this);
    } else if (beans > 2) {
      let bean = new Image();
      bean.src = `./PNG/plant.png`
      bean.onload = function(){
      this.ctx.drawImage(bean, 460 , 520 , bean.width * 0.37, bean.height * 0.37);
      }.bind(this);
    }
  }

}
module.exports = Game;
