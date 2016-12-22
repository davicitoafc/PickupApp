class GamesController < ApplicationController
  def index
    @games = Game.all
    respond_to do |format|
    format.html # index.html.erb
    format.json { render json: @games }
  end
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
    @games = Game.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @game }
    end
  end


  private

  def game_params
    params.require(:game).permit(:date, :time, :players, :description, :category, :location)
  end
end
