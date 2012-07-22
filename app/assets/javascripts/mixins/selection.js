Rss.SelectionMixin = Ember.Mixin.create({
  selectedIndex: null,
  selectedItem: null,

  isFirstItemSelected: function() {
    return this.get('selectedIndex') === 0;
  }.property('selectedIndex'),

  isLastItemSelected: function() {
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

    if (item) {
      item.set('isSelected', true);
      item.set('isRead', true);
      this.set('selectedIndex', this.indexOf(item));
    } else {
      this.set('selectedIndex', null);
    }

    this.set('selectedItem', item);
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
