class FeedItemsController < ApplicationController
  respond_to :json

  def index
    items = FeedItem.all

    respond_with items
  end
end
