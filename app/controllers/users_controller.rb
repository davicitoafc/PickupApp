class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])

    @games_organized = @user.games
  end

end
