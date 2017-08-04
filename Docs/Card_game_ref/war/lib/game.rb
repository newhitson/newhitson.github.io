require_relative './ai_player'

class Game
  # ::deal_in_players is a factory method that:
  # 1) Takes in an array of cards
  # 2) deals cards in an alternating pattern & creates 2 AIPlayers
  # 3) return instance of Game
  def self.deal_in_players(deck)
    deck = []
    deck2 =[]
    deck1 = true
    Card.all_cards.each do |card|
      if deck1
        deck << card
        deck1 = false
      else
        deck2 << card
        deck1 = true
      end
    end

    Game.new(AIPlayer.new(deck),AIPlayer.new(deck2))

  end

  def initialize(player1, player2)
    @player1 = player1
    @player2 = player2
  end

  # call do_battle until game is over
  def play

    unless @player1.out_of_cards? || @player2.out_of_cards?
      do_battle
    end

  end

  # 1. Players each take their top card
  # 2. If the cards' rank is the same, first, take an additional card
  #    prisoner from each player. Then, repeat #do_battle.
  # 3. If the last drawn cards are different ranks, all the cards drawn in
  #    this round are awarded to the drawer of the higher ranked card.
  def do_battle(prisoners = [])
    raise  OutOfCardsError if @player1.out_of_cards?
    raise  OutOfCardsError if @player2.out_of_cards?
    player1_card = @player1.take_card
    player2_card = @player2.take_card
    case player1_card<=> player2_card
    when 1
      @player1.give_won_cards([player1_card, player2_card])
    when 0
      do_battle([player1_card, player2_card])
    when -1
      @player2.give_won_cards([player1_card, player2_card])
      #
    end
    #@player2.give_won_cards([player1_card, player2_card])


  end

  # if either of the players has run out of cards, the game is over
  def game_over?
   return true if @player1.out_of_cards?
   return true if @player2.out_of_cards?
  end
end
