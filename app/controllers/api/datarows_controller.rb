module Api
  class DatarowsController < BaseController

    def show
      datarow = Datarow.find(params[:id])
      respond_with datarow
    end

    def index
      datarow = Datarow.order("TITLE ASC")
      respond_with datarow
    end

    def create
      # fixed on rails master (remove after 4.0.1 release)
      request.body.rewind
      input = JSON.parse(request.body.read)
      datarow = Datarow.new(datarow_params(input))
      if datarow.save
        render :json => datarow, :status => :created, :location => api_datarows_url(datarow)
      else
        render :json => datarow.errors, :status => :unprocessable_entity
      end
    end

    def update
      datarow = Datarow.find(params[:id])
      # fixed on rails master (remove after 4.0.1 release)
      request.body.rewind
      input = JSON.parse(request.body.read)
      if datarow.update_attributes(datarow_params(input))
        render :json => datarow
      else
        render :json => datarow.errors, :status => :unprocessable_entity
      end
    end

    def destroy
      Datarow.destroy(params[:id])
      head :no_content
    end

    protected

    def datarow_params(input)
      input.slice(*%w(title))
    end
  end
end