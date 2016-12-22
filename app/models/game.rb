class Game < ApplicationRecord
  belongs_to :user

  geocoded_by :location
end
