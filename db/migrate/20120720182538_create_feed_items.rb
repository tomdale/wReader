class CreateFeedItems < ActiveRecord::Migration
  def change
    create_table :feed_items do |t|
      t.string :title
      t.string :author
      t.string :link
      t.text :description
      t.string :short_description
      t.date :date
      t.boolean :read
      t.boolean :starred

      t.timestamps
    end
  end
end
