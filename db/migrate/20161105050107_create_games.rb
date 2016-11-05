class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.integer :players
      t.string :category
      t.integer :user_id
      t.time :time
      t.date :date
      t.text :description
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
