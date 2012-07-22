Rss.FeedItemController = Ember.ObjectController.extend({
  feedItemsController: null,
  contentBinding: 'feedItemsController.selectedItem',

  toggleStar: function() {
    this.toggleProperty('isStarred');
  },

  toggleRead: function() {
    this.toggleProperty('isRead');
  }
});
