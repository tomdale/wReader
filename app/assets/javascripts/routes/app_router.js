var populateArray = function(array, success) {
  $.ajax({
    dataType: 'jsonp',
    url: "http://blog.chromium.org/feeds/posts/default?alt=json",
    success: function(data) {
      data.feed.entry.forEach(function(entry) {
        array.pushObject(Rss.FeedItem.create({
          title: entry.title.$t,
          id: entry.id.$t,
          publicationName: data.feed.title.$t,
          author: entry.author[0].name.$t,
          date: new Date(entry.published.$t),
          text: entry.content.$t,
        }));
      });
    }
  });
};


Rss.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    connectOutlets: function(router) {
      Ember.run.next(function() {
        var applicationController = router.get('applicationController'),
            feedItemsController = router.get('feedItemsController'),
            controlsController = router.get('controlsController');

        applicationController.connectOutlet({
          outletName: 'feedItems',
          viewClass: Rss.FeedItemsView,
          controller: router.get('filteredFeedItemsController'),
        });

        applicationController.connectOutlet('feedItem', 'feedItem');
        applicationController.connectOutlet('controls', 'controls');

        var items = [];
        populateArray(items);

        feedItemsController.set('content', items);

        controlsController.setProperties({
          feedItems: feedItemsController,
          selectedItem: router.get('feedItemController')
        });

        router.get('feedItemController').set('feedItems', feedItemsController);

        router.get('applicationController').connectOutlet({
          outletName: 'navbar',
          viewClass: Rss.NavBarView,
          controller: feedItemsController
        });
      });
    },

    markAllAsRead: function(router) {
      router.get('feedItemsController').markAllAsRead();
    },

    selectItem: function(router, event) {
      var item = event.context;

      router.transitionTo('show', item);
    },

    toggleStar: function(router, event) {
      event.context.toggleProperty('isStarred');
    },

    toggleUnread: function(router, event) {
      event.context.toggleProperty('isUnread');
    },

    selectPrevious: function(router) {
      router.get('feedItemsController').selectPrevious();
    },

    selectNext: function(router) {
      router.get('feedItemsController').selectNext();
    },

    enter: function() {
      console.log('enter');
    },

    showAll: function(router) {
      router.transitionTo('index.none');
    },

    showUnread: function(router) {
      router.transitionTo('unread');
    },

    showStarred: function(router) {
      router.transitionTo('starred');
    },

    showRead: function(router) {
      router.transitionTo('read');
    },

    eventTransitions: {
      showAll: 'index.none',
      showUnread: 'unread',
      showStarred: 'starred',
      showRead: 'read'
    },

    index: Ember.Route.extend({
      route: '/',

      connectOutlets: function(router) {
        var items = router.get('feedItemsController');

        router.get('filteredFeedItemsController').set('content', items);
      },

      none: Ember.Route.extend({
        route: '/'
      }),

      show: Ember.Route.extend({
        route: '/item/:id',

        connectOutlets: function(router, item) {
          router.get('feedItemsController').select(item);
        }
      })
    }),

    unread: Ember.Route.extend({
      route: '/unread',

      connectOutlets: function(router) {
        var items = router.get('feedItemsController');

        items = items.filterProperty('isUnread', true);
        router.get('filteredFeedItemsController').set('content', items);
      }
    }),

    read: Ember.Route.extend({
      route: '/read',

      connectOutlets: function(router) {
        var items = router.get('feedItemsController');
        debugger;

        items = items.filterProperty('isRead', true);
        router.get('filteredFeedItemsController').set('content', items);
      }
    }),

    starred: Ember.Route.extend({
      route: '/starred',

      connectOutlets: function(router) {
        var items = router.get('feedItemsController');

        items = items.filterProperty('isStarred', true);
        router.get('filteredFeedItemsController').set('content', items);
      }
    })
  })
});

