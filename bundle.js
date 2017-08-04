/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function () {
  function Card(suit, value) {
    _classCallCheck(this, Card);

    this.suit = suit;
    this.value = value;
    this.name = this.value + this.suit;
  }

  _createClass(Card, [{
    key: 'gameValue',
    value: function gameValue() {
      var gameValues = { 'A': 1, '2': 2, '3': 3, '4': 0, '5': 5, '6': 6, '7': 7, '8': 8, '9': 0,
        '10': -10, 'J': 0, 'Q': 10, 'K': 10 };
      return gameValues[this.value];
    }
  }]);

  return Card;
}();

module.exports = Card;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 940;
  canvasEl.height = 627;

  var ctx = canvasEl.getContext("2d");
  var game = new Game(ctx, canvasEl).startGame();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = __webpack_require__(0);
var Deck = __webpack_require__(3);
var HumanPlayer = __webpack_require__(4);
var ComputerPlayer = __webpack_require__(5);

var Game = function () {
  function Game(ctx, canvasEl) {
    _classCallCheck(this, Game);

    this.deck = new Deck();
    this.count = 0;
    this.computer1 = new ComputerPlayer(this.deck.take(3), [150, 220], "computer 1");
    this.computer2 = new ComputerPlayer(this.deck.take(3), [680, 220], "comptuer 2");
    this.human = new HumanPlayer(this.deck.take(3), "Human Player");
    this.turnorder = [this.human, this.computer1, this.computer2];
    this.ctx = ctx;
    this.canvasEl = canvasEl;
    this.clickOnCard = this.clickOnCard.bind(this);
    this.clickOnButton = this.clickOnButton.bind(this);
  }

  _createClass(Game, [{
    key: "startGame",
    value: function startGame() {
      this.renderGame();
      this.takeTurn(this.turnorder[0]);
    }
  }, {
    key: "takeTurn",
    value: function takeTurn(player) {
      this.turnorder.shift();
      if (player !== this.human) {
        setTimeout(function () {
          this.computerPlayerTurn(player);
        }.bind(this), 1000);
      } else {
        this.canvasEl.addEventListener("click", this.clickOnCard);
      }
    }
  }, {
    key: "isGameOver",
    value: function isGameOver() {
      if (this.count > 99) {
        this.ctx.font = '64px serif';
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.fillText("You Lose", 470, 100);
        this.playAgain();
      } else if (this.turnorder.length === 1) {
        this.ctx.font = '64px serif';
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.fillText("You Win", 470, 100);
        this.human.score = this.human.score + 1;
        this.playAgain();
      } else {
        this.takeTurn(this.turnorder[0]);
      }
    }
  }, {
    key: "computerPlayerTurn",
    value: function computerPlayerTurn(player) {
      var playedCard = player.takeTurn(this.count);
      if (playedCard !== "bust") {
        this.renderCard(player, playedCard);
        this.addToCount(playedCard);
        this.turnorder.push(player);
      }
      player.receiveCard(this.deck.take(1));
      this.renderGame();
      this.isGameOver();
    }
  }, {
    key: "renderCard",
    value: function renderCard(player, card) {
      console.log(player.name);
      if (player.name === "computer 1") {
        var cardimg = new Image();
        cardimg.src = "./PNG/" + card.name + ".png";
        cardimg.onload = function () {
          this.ctx.drawImage(cardimg, player.location[0], 120, cardimg.width * 0.09, cardimg.height * 0.09);
        }.bind(this);
      } else {
        var cardimg2 = new Image();
        cardimg2.src = "./PNG/" + card.name + ".png";
        cardimg2.onload = function () {
          this.ctx.drawImage(cardimg2, player.location[0], 120, cardimg2.width * 0.09, cardimg2.height * 0.09);
        }.bind(this);
      }
    }
  }, {
    key: "addToCount",
    value: function addToCount(card) {
      console.log(card.value);
      var value = void 0;
      if (card.value === 'J') {
        value = 99 - this.count;
      } else if (card.value === '4') {
        this.turnorder.reverse();
        value = card.gameValue();
      } else {
        value = card.gameValue();
      }
      this.count = this.count + value;
    }
  }, {
    key: "renderGame",
    value: function renderGame() {
      this.renderCount();
      this.renderHand();
      this.renderPlayers();
      this.renderScore();
    }
  }, {
    key: "renderPlayers",
    value: function renderPlayers() {
      var _this = this;

      this.turnorder.forEach(function (player) {
        if (player !== _this.human) {
          var cardimg = new Image();
          cardimg.src = "./PNG/hand.png";
          cardimg.onload = function () {
            this.ctx.drawImage(cardimg, player.location[0], player.location[1], cardimg.width * 0.15, cardimg.height * 0.15);
          }.bind(_this);
        }
      });
    }
  }, {
    key: "renderCount",
    value: function renderCount() {
      this.ctx.font = '48px serif';
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.fillText("" + this.count, 470, 100);
    }
  }, {
    key: "renderHand",
    value: function renderHand() {
      var cardimg = new Image();
      cardimg.src = "./PNG/" + this.human.hand[0].name + ".png";
      cardimg.onload = function () {
        this.ctx.drawImage(cardimg, 120, 520, cardimg.width * 0.15, cardimg.height * 0.15);
      }.bind(this);

      var cardimg2 = new Image();
      cardimg2.src = "./PNG/" + this.human.hand[1].name + ".png";
      cardimg2.onload = function () {
        this.ctx.drawImage(cardimg2, 222, 520, cardimg2.width * 0.15, cardimg2.height * 0.15);
      }.bind(this);

      var cardimg3 = new Image();
      cardimg3.src = "./PNG/" + this.human.hand[2].name + ".png";
      cardimg3.onload = function () {
        this.ctx.drawImage(cardimg3, 324, 520, cardimg3.width * 0.15, cardimg3.height * 0.15);
      }.bind(this);
    }
  }, {
    key: "clickOnCard",
    value: function clickOnCard(event) {

      var top = this.canvasEl.offsetTop;
      console.log(top);
      var elLeft = this.canvasEl.offsetLeft;
      console.log(elLeft);
      var x = event.clientX;
      var y = event.clientY;
      console.log(event);
      console.log(x);
      console.log(y);
      if (x > 195 && y > 580 && x < 295 && y < 688) {
        var playedCard = this.human.playCard(0, this.deck.take(1));
        this.canvasEl.removeEventListener("click", this.clickOnCard);
        // this.canvasEl.removeEventListener("click", evt => this.clickOnCard(evt));
        this.addToCount(playedCard);
        this.renderGame();
        this.turnorder.push(this.human);
        this.isGameOver();
      }
      if (x > 296 && y > 580 && x < 396 && y < 688) {
        var _playedCard = this.human.playCard(1, this.deck.take(1));
        this.canvasEl.removeEventListener("click", this.clickOnCard);
        this.addToCount(_playedCard);
        this.renderGame();
        this.turnorder.push(this.human);
        this.isGameOver();;
      }
      if (x > 397 && y > 585 && x < 496 && y < 688) {
        var _playedCard2 = this.human.playCard(2, this.deck.take(1));
        this.canvasEl.removeEventListener("click", this.clickOnCard);
        this.addToCount(_playedCard2);
        this.renderGame();
        this.turnorder.push(this.human);
        this.isGameOver();;
      }
    }
  }, {
    key: "playAgain",
    value: function playAgain() {
      var button = new Image();
      button.src = "./PNG/button_play_again.png";
      button.onload = function () {
        this.ctx.drawImage(button, 250, 270, button.width, button.height);
      }.bind(this);
      this.canvasEl.addEventListener("click", this.clickOnButton);
    }
  }, {
    key: "clickOnButton",
    value: function clickOnButton(event) {
      var x = event.clientX;
      var y = event.clientY;

      if (x > 286 && y > 332 && x < 637 && y < 475) {
        this.canvasEl.removeEventListener("click", this.clickOnButton);
        this.human.hand = this.deck.take(3);
        this.count = 0;
        this.turnorder = [this.human, this.computer1, this.computer2];
        this.startGame();
      }
    }
  }, {
    key: "renderScore",
    value: function renderScore() {
      var beans = this.human.score;
      if (beans === 1) {
        var bean = new Image();
        bean.src = "./PNG/coffee_bean.png";
        bean.onload = function () {
          this.ctx.drawImage(bean, 474, 570, bean.width * 0.15, bean.height * 0.15);
        }.bind(this);
      } else if (beans === 2) {
        var _bean = new Image();
        _bean.src = "./PNG/french_press.png";
        _bean.onload = function () {
          this.ctx.drawImage(_bean, 440, 520, _bean.width * 0.2, _bean.height * 0.2);
        }.bind(this);
      } else if (beans > 2) {
        var _bean2 = new Image();
        _bean2.src = "./PNG/plant.png";
        _bean2.onload = function () {
          this.ctx.drawImage(_bean2, 460, 520, _bean2.width * 0.37, _bean2.height * 0.37);
        }.bind(this);
      }
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = __webpack_require__(0);

var Deck = function () {
  function Deck() {
    _classCallCheck(this, Deck);

    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.suits = ['H', 'D', 'S', 'C'];
    this.cards = [];

    for (var s = 0; s < this.suits.length; s++) {
      for (var v = 0; v < this.values.length; v++) {
        this.cards.push(new Card(this.suits[s], this.values[v]));
      }
    }
    this.cards = this.shuffle(this.cards);
  }

  _createClass(Deck, [{
    key: 'shuffle',
    value: function shuffle(a) {
      for (var i = a.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        var _ref = [a[j], a[i - 1]];
        a[i - 1] = _ref[0];
        a[j] = _ref[1];
      }
      return a;
    }
  }, {
    key: 'take',
    value: function take(n) {
      var taken = [];
      for (var i = 0; i < n; i++) {
        taken.push(this.cards.shift());
      }
      this.outOfCards();
      return taken;
      //returns cards in a array
    }
  }, {
    key: 'outOfCards',
    value: function outOfCards() {
      if (this.cards.length === 0) {
        var shuffleUp = new Deck();
        this.cards = shuffleUp.cards;
      }
    }
  }]);

  return Deck;
}();

module.exports = Deck;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HumanPlayer = function () {
  function HumanPlayer(startinghand, name) {
    _classCallCheck(this, HumanPlayer);

    this.hand = startinghand;
    this.score = 0;
    this.name;
  }

  _createClass(HumanPlayer, [{
    key: "playCard",
    value: function playCard(pos, newcard) {
      var playedCard = this.hand.splice(pos, 1, newcard[0]);
      return playedCard[0];
    }
  }]);

  return HumanPlayer;
}();

module.exports = HumanPlayer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComputerPlayer = function () {
  function ComputerPlayer(startinghand, location, name) {
    _classCallCheck(this, ComputerPlayer);

    this.hand = startinghand;
    this.location = location;
    this.name = name;
  }

  _createClass(ComputerPlayer, [{
    key: "takeTurn",
    value: function takeTurn(count) {
      for (var i = 0; i < this.hand.length; i++) {
        if (~~this.hand[i].gameValue() + count < 100) {
          var play = this.hand.splice(i, 1);
          console.log(play[0]);
          return play[0];
        }
      }
      return "bust";
    }
  }, {
    key: "receiveCard",
    value: function receiveCard(card) {
      this.hand.push(card[0]);
    }
  }]);

  return ComputerPlayer;
}();

module.exports = ComputerPlayer;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map