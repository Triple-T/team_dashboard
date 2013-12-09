module Api
  class PointsController < BaseController

    def index
      points = Point.find_all_by_datarow_id(params[:datarow_id])
      respond_with(points)
    end

    def create
      datarow = Datarow.find(params[:datarow_id])
      # fixed on rails master (remove after 4.0.1 release)
      request.body.rewind
      input = JSON.parse(request.body.read)
      point = datarow.points.build(point_params(input))
      if point.save
        render :json => point, :status => :created, :location => api_datarow_point_url(:datarow_id => datarow.id, :id => point.id)
      else
        render :json => point.errors, :status => :unprocessable_entity
      end
    end

    def update
      datarow = Datarow.find(params[:datarow_id])
      point = datarow.points.find(params[:id])
      # fixed on rails master (remove after 4.0.1 release)
      request.body.rewind
      input = JSON.parse(request.body.read)
      if point.update_attributes(point_params(input))
        head :no_content
      else
        render :json => point.errors, :status => :unprocessable_entity
      end
    end

    def destroy
      datarow = Datarow.find(params[:datarow_id])
      point = datarow.points.find(params[:id])
      point.destroy
      head :no_content
    end
    
    protected

    def point_params(input)
      input.slice(*%w(x y datarow_id))
    end

  end
end