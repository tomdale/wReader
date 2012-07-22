Rss.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    connectOutlets: function(router) {
      Ember.run.next(function() {
        var appController = router.get('applicationController'),
            controlsController = router.get('controlsController'),
            feedItemController = router.get('feedItemController');

        // Asynchronously retrieve all of the RSS items
        var feedItems = Rss.FeedItem.find();

        // Give controllers access to other controllers they need
        controlsController.connectControllers('feedItem', 'feedItems');
        feedItemController.connectControllers('feedItems');

        // Fill in the outlets we created in application.handlebars
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

    selectItem: function(router, event) {
      router.get('feedItemsController').select(event.context);
    },

    showAll: Ember.Route.transitionTo('index'),
    showUnread: Ember.Route.transitionTo('unread'),
    showStarred: Ember.Route.transitionTo('starred'),
    showRead: Ember.Route.transitionTo('read'),

    index: Ember.Route.extend({
      route: '/',

      connectOutlets: function(router) {
        router.setPath('feedItemsController.filterKey', '');
      }
    }),

    unread: Ember.Route.extend({
      route: '/unread',

      connectOutlets: function(router) {
        router.setPath('feedItemsController.filterKey', 'isUnread');
      }
    }),

    read: Ember.Route.extend({
      route: '/read',

      connectOutlets: function(router) {
        router.setPath('feedItemsController.filterKey', 'isRead');
      }
    }),

    starred: Ember.Route.extend({
      route: '/starred',

      connectOutlets: function(router) {
        router.set('feedItemsController.filterKey', 'isStarred');
      }
    })
  })
});

