Rss.FeedItem = DS.Model.extend({
  title: DS.attr('string'),
  publicationName: DS.attr('string'),
  author: DS.attr('string'),
  text: DS.attr('string'),
  date: DS.attr('date'),

  isRead: false,
  isStarred: DS.attr('boolean'),

  isUnread: function() {
    return !this.get('isRead')
  }.property('isRead'),


  isUnstarred: function() {
    return !this.get('isStarred');
  }.property('isStarred')
});
