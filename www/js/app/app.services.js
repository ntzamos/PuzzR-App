angular.module('PuzzR.app.services', ['ngResource'])

.service('UserService', function() {
    // For the purpose of this example I will store user data on ionic local storage but you should save it on a database

    var setUser = function(user_data) {
        window.localStorage.starter_google_user = JSON.stringify(user_data);
    };

    var login = function(){
      window.localStorage.loggedIn = true;
    };
    var isLoggedIn = function(){
      return window.localStorage.loggedIn;
    };
    var logout = function(){
      window.localStorage.loggedIn = false;
    };
    var getUser = function(){
        return JSON.parse(window.localStorage.starter_google_user || '{}');
    };

    return {
        getUser: getUser,
        isLoggedIn: isLoggedIn,
        logout: logout,
        login: login,
        setUser: setUser
    };
})

.service('AuthService', function (){
  //
  // this.saveUser = function(user){
  //   window.localStorage.your_app_name_user = JSON.stringify(user);
  // };
  //
  // this.getLoggedUser = function(){
  //
  //   return (window.localStorage.your_app_name_user) ?
  //     JSON.parse(window.localStorage.your_app_name_user) : null;
  // };

})

.service('PostService', function ($http, $q){

  this.getUserDetails = function(userId){
    var dfd = $q.defer();

    $http.get('database.json').success(function(database) {
      //find the user
      var user = _.find(database.users, function(user){ return user._id == userId; });
      dfd.resolve(user);
    });

    return dfd.promise;
  };

  this.getUserPosts = function(userId){
    var dfd = $q.defer();

    $http.get('http://api.puzz-r.com/puzzles/1').success(function(posts) {
      //
      // //get user posts
      // var userPosts =  _.filter(database.posts, function(post){ return post.userId == userId; });
      // //sort posts by published date
      // var sorted_posts = _.sortBy(userPosts, function(post){ return new Date(post.date); });
      //
      // //find the user
      // var user = _.find(database.users, function(user){ return user._id == userId; });
      //
      // //add user data to posts
      // var posts = _.each(sorted_posts.reverse(), function(post){
      //   post.user = user;
      //   return post;
      // });

      dfd.resolve(posts);
    });

    return dfd.promise;
  };

  this.getUserLikes = function(userId){
    var dfd = $q.defer();

    $http.get('http://api.puzz-r.com/puzzles/1').success(function(likes) {
      //get user likes
      // //we will get all the posts
      // var slicedLikes = database.posts.slice(0, 4);
      // // var sortedLikes =  _.sortBy(database.posts, function(post){ return new Date(post.date); });
      // var sortedLikes =  _.sortBy(slicedLikes, function(post){ return new Date(post.date); });
      //
      // //add user data to posts
      // var likes = _.each(sortedLikes.reverse(), function(post){
      //   post.user = _.find(database.users, function(user){ return user._id == post.userId; });
      //   return post;
      // });

      dfd.resolve(likes);

    });

    return dfd.promise;

  };

  this.getFeed = function(page){

    var pageSize = 5, // set your page size, which is number of records per page
        skip = pageSize * (page-1),
        totalPosts = 1,
        totalPages = 1,
        dfd = $q.defer();

    $http.get('http://api.puzz-r.com/puzzles/'+page).success(function(puzzles) {

      totalPosts = puzzles.length;
      totalPages = totalPosts/pageSize;


      dfd.resolve({
        posts: puzzles,
        totalPages: totalPages
      });
    });

    return dfd.promise;
  };
})

.service('ShopService', function ($http, $q, _){

  this.getProducts = function(){
    var dfd = $q.defer();
    $http.get('http://api.puzz-r.com/puzzles/1').success(function(puzzles) {
      dfd.resolve(puzzles);
    });
    return dfd.promise;
  };

  this.getProduct = function(productId){
    var dfd = $q.defer();
    $http.get('http://api.puzz-r.com/puzzle/'+productId).success(function(puzzle) {

      dfd.resolve(puzzle);
    });
    return dfd.promise;
  };

  this.addProductToCart = function(productToAdd){
    var cart_products = !_.isUndefined(window.localStorage.ionTheme1_cart) ? JSON.parse(window.localStorage.ionTheme1_cart) : [];

    //check if this product is already saved
    var existing_product = _.find(cart_products, function(product){ return product._id == productToAdd._id; });

    if(!existing_product){
      cart_products.push(productToAdd);
    }

    window.localStorage.ionTheme1_cart = JSON.stringify(cart_products);
  };

  this.getCartProducts = function(){
    return JSON.parse(window.localStorage.ionTheme1_cart || '[]');
  };

  this.removeProductFromCart = function(productToRemove){
    var cart_products = JSON.parse(window.localStorage.ionTheme1_cart);

    var new_cart_products = _.reject(cart_products, function(product){ return product._id == productToRemove._id; });

    window.localStorage.ionTheme1_cart = JSON.stringify(new_cart_products);
  };

})

.factory('PuzzleService', PuzzleService);

PuzzleService.$inject = ['$resource'];

function PuzzleService($resource) {
    return $resource('http://api.puzz-r.com/categories',{},{
        getPuzzles: {
            url: 'http://api.puzz-r.com/puzzles/:page',
            method: 'GET',
            isArray: true
        },
        getPuzzlesEnded: {
            url: 'http://api.puzz-r.com/puzzles/ended/:page',
            method: 'GET',
            isArray: true
        },
        getPuzzleById: {
            url: 'http://api.puzz-r.com/puzzle/:puzzleId',
            method: 'GET'
        },
        getPuzzlesByCategory: {
            url: 'http://api.puzz-r.com/puzzles/category/:categoryId/:page',
            method: 'GET',
            isArray: true
        },
        postPlay: {
            url: 'http://api.puzz-r.com/play',
            method: 'POST',
            isArray: true,
            headers: {
              'Content-Type': 'application/json'
            }
        }
    });
}
