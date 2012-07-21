class FeedItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :link, :description, :short_description, :date, :read, :starred
end
