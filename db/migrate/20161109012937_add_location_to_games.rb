class AddLocationToGames < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :location, :string
  end
end
