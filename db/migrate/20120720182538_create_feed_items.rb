class CreateFeedItems < ActiveRecord::Migration
  def change
    create_table :feed_items do |t|
      t.string :id
      t.string :title
      t.string :publication_name
      t.string :author
      t.string :link
      t.text :text
      t.string :date
      t.boolean :is_read, default: false
      t.boolean :is_starred, default: false

      t.timestamps
    end
  end
end
