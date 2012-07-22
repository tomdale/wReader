Rss.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    connectOutlets: function(router) {
      Ember.run.next(function() {
        var appController = router.get('applicationController');
        var feedItems = Rss.FeedItem.find();

        appController.connectOutlet('feedItems', 'feedItems', feedItems);
        appController.connectOutlet('feedItem', 'feedItem');
        appController.connectOutlet('controls', 'controls');

        appController.connectOutlet({
          outletName: 'navbar',
          viewClass: Rss.NavBarView,
          controller: router.get('feedItemsController')
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
        route: '/item/:feed_item_id',

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

