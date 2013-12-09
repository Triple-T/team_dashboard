class CreatePoints < ActiveRecord::Migration
  def change
    create_table :points do |t|
      t.datetime :x
      t.float :y
      t.references :datarow, index: true

      t.timestamps
    end
  end
end
