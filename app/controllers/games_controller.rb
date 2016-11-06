class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    @game.user_id = current_user.id
  if @game.save
      redirect_to user_path(current_user)
  else
    render :new
  end
end


  def show
    @game = Game.find(params[:id])
  end

  private

  def game_params
    params.require(:game).permit(:date, :time, :seats_available, :price, :comments, :start_location, :end_location, :completed)
  end
end
