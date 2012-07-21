Rss.FeedItem = Ember.Object.extend({
  // title: DS.attr('string'),
  // author: DS.attr('string'),
  // link: DS.attr('string'),
  // description: DS.attr('string'),
  // shortDescription: DS.attr('string'),
  // date: DS.attr('date'),
  isUnread: true,

  isRead: function() {
    return !this.get('isUnread')
  }.property('isUnread'),

  isStarred: false,

  isUnstarred: function() {
    return !this.get('isStarred');
  }.property('isStarred')
});
