class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def new
    @game
  end

  def show
    @game = Game.find(params[:id])
  end
end
