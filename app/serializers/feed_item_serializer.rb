class FeedItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :publication_name, :author, :link, :text, :date, :is_read, :is_starred
end
