module DatarowHelper
  extend self
  
  def generate_datapoints(target, from, to)
    ::Datarow.find_by_title(target).points.order("x").map {|p| [p.y, p.x.to_i]}
  end
end