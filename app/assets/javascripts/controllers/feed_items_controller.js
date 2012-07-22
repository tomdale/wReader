Rss.FeedItemsController = Ember.ArrayController.extend({
  selectedIndex: null,

  totalCount: function() {
    var length = this.get('length');

    return length === 1 ? length + " Item" : length + " Items";
  }.property('@each'),

  unreadCount: function() {
    return this.filterProperty('isUnread', true).get('length');
  }.property('@each.isUnread'),

  readCount: function() {
    return this.filterProperty('isUnread', false).get('length');
  }.property('@each.isUnread'),

  starredCount: function() {
    return this.filterProperty('isStarred', true).get('length');
  }.property('@each.isStarred'),

  markAllAsRead: function() {
    this.forEach(function(item) {
      item.set('isRead', true);
    });
  },

  firstItemSelected: function() {
    return this.get('selectedIndex') === 0;
  }.property('selectedIndex'),

  lastItemSelected: function() {
    return this.get('selectedIndex') === this.get('length')-1;
  }.property('selectedIndex'),

  hasNoSelection: function() {
    return this.get('selectedIndex') === null;
  }.property('selectedIndex'),

  select: function(item) {
    var currentItem = this.get('selectedItem');

    if (currentItem) {
      currentItem.set('isSelected', false);
    }

    item.set('isSelected', true);
    item.set('isRead', true);

    this.set('selectedItem', item);
    this.set('selectedIndex', this.indexOf(item));
  },

  selectIndex: function(index) {
    this.set('selectedIndex', index);
    this.select(this.objectAt(index));
  },

  selectNext: function() {
    var selectedIndex = this.get('selectedIndex');
    this.selectIndex(selectedIndex+1);
  },

  selectPrevious: function() {
    var selectedIndex = this.get('selectedIndex');
    this.selectIndex(selectedIndex-1);
  }
});

