class CreateDatarows < ActiveRecord::Migration
  def change
    create_table :datarows do |t|
      t.string :title

      t.timestamps
    end
  end
end
