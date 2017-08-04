class Pile

  def initialize(cards)
    @cards = cards
  end

  # return the top (last) card and remove it from pile
  def take_card
    #raise OutOfCardsError empty?
    @cards.pop

  end

  # returns true if the pile is empty
  def empty?
    return true if @cards.length == 0

  end

  # add cards to the bottom (beginning) of pile
  def add_cards(new_cards)
    if new_cards.is_a?(Card)
    @cards =   [new_cards] << @cards
    else

    new_cards.each do |card|
      @cards << card
    end
  end
  end
end

class OutOfCardsError < StandardError
end
