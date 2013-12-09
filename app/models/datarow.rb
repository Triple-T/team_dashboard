class Datarow < ActiveRecord::Base
  has_many :points, :dependent => :destroy
end
