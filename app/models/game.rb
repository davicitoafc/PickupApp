class Game < ApplicationRecord
  belongs_to :user

  geocoded_by :location
  after_validation :geocode, if: :location_changed?

  validates :date, :players, :description, :location, presence: true
  validate :correct_time

  def update
    
  end

  def correct_time
   if date.past?
     errors.add(:date, "You cannot create a game in the past")
   else
     return true
   end
 end
end
