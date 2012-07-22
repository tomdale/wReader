Rss.FeedItemController = Ember.ObjectController.extend({
  contentBinding: 'target.feedItemsController.selectedItem',
  feedItems: null
});
