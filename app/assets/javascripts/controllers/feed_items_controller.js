//= require mixins/selection

Rss.FeedItemsController = Ember.ArrayController.extend(Rss.SelectionMixin, {
  // Filtering
  filterKey: '',
  filteredContent: function() {
    var filter = this.get('filterKey');

    if (filter) {
      return this.filterProperty(filter, true);
    }

    return this;
  }.property('@each', 'filterKey'),

  filteredContentDidChange: function() {
    this.select(null);
  }.observes('filteredContent'),

  // Aggregate Properties
  unreadCount: function() {
    return this.filterProperty('isUnread', true).get('length');
  }.property('@each.isUnread'),

  readCount: function() {
    return this.filterProperty('isUnread', false).get('length');
  }.property('@each.isUnread'),

  starredCount: function() {
    return this.filterProperty('isStarred', true).get('length');
  }.property('@each.isStarred'),

  // Actions
  markAllAsRead: function() {
    this.setEach('isRead', true);
  }
});
