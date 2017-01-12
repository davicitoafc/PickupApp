class Game < ApplicationRecord
  belongs_to :user

  geocoded_by :location
  after_validation :geocode, if: :location_changed?

  validates :date, :players, :description, :location, presence: true
  validate :correct_time

  def fetch_weather
    self.latitude = latitude
    self.longitude = longitude

   appID = 'e1b0f333867c7cac1ca29c6d5fb73b29'
    puts url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+"#{latitude}"+'&lon='+"#{longitude}"+'&cnt=10&units=imperial&APPID='

  response = HTTParty.get(url+appID)
   return response.body
  end

  def correct_time
   if date.past?
     errors.add(:date, "You cannot create a game in the past")
   else
     return true
   end
 end
end
