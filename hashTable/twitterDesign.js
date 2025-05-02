/* 
355. Design Twitter
https://leetcode.com/problems/design-twitter/
Type: Medium

Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.

Implement the Twitter class:

Twitter() Initializes your twitter object.
void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this function will be made with a unique tweetId.
List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.
void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.
 
Example 1:
Input
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output
[null, null, [5], null, null, [6, 5], null, [5]]

Explanation
Twitter twitter = new Twitter();
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
twitter.follow(1, 2);    // User 1 follows user 2.
twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.unfollow(1, 2);  // User 1 unfollows user 2.
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
 
Constraints:
 - 1 <= userId, followerId, followeeId <= 500
 - 0 <= tweetId <= 10^4
 - All the tweets have unique IDs.
 - At most 3 * 10^4 calls will be made to postTweet, getNewsFeed, follow, and unfollow.
 - A user cannot follow himself.
*/

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
/* 
Approach I: HashTable + Sorting

Runtime: 29 ms Beats 53.28%
Memory: 71.29 MB Beats 88.03% 
*/
var Twitter = function () {
  //Map of followers for a given followee. Key: user id, value: Set
  this.follows = new Map();
  //map of tweets. key: userId, values: [] (how do we remove tweet when user unfollows)
  this.tweets = new Map();
  this.time = 0;
};

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function (userId, tweetId) {
  if (!this.tweets.has(userId)) this.tweets.set(userId, []);
  this.tweets.get(userId).push({ time: ++this.time, id: tweetId });
};

/**
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function (userId) {
  //prepare the news feed for this user.
  //get the list of user this user follows
  const feeds = [];
  //add feeds from this user
  const userTweets = this.tweets.get(userId) || [];
  //add the recent last 10 tweets
  feeds.push(...userTweets.slice(-10));
  //add tweets from people whom this user follows
  if (this.follows.has(userId)) {
    for (const followee of this.follows.get(userId)) {
      const followeeTweets = this.tweets.get(followee) || [];
      //add the recent last 10 tweets
      feeds.push(...followeeTweets.slice(-10));
    }
  }
  //We can user Priority Queue here (max PQ) instead of array
  //get the recent 10 tweets from all tweet timeline
  return feeds
    .sort((a, b) => b.time - a.time)
    .slice(0, 10)
    .map((tweet) => tweet.id);
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function (followerId, followeeId) {
  if (!this.follows.has(followerId)) {
    this.follows.set(followerId, new Set());
  }
  //this follower is now following a new person: followeeId
  this.follows.get(followerId).add(followeeId);
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function (followerId, followeeId) {
  if (this.follows.has(followerId)) {
    this.follows.get(followerId).delete(followeeId);
  }
};

/* 
Approach II: Using PrioritQueue

Runtime: 19 ms Beats 88.14%
Memory: 71.27 MB Beats 87.85%
*/
class Tweet {
  constructor(id, time) {
    this.id = id;
    this.time = time;
    //pointer for next node
    this.next = null;
  }
}

class User {
  constructor(userId) {
    this.tweetHead = null;
    this.follows = new Set();
    //follow to self
    this.follow(userId);
  }
  //user can tweet
  post(tweetId, timestamp) {
    const tweet = new Tweet(tweetId, timestamp);
    tweet.next = this.tweetHead;
    this.tweetHead = tweet;
    //add this tweet in front
  }
  //user can follow someone
  follow(followeeId) {
    this.follows.add(followeeId);
  }

  unfollow(followeeId) {
    this.follows.delete(followeeId);
  }
}

var Twitter = function () {
  this.time = 0;
  this.userMap = new Map();
};

Twitter.prototype.postTweet = function (userId, tweetId) {
  if (!this.userMap.has(userId)) {
    this.userMap.set(userId, new User(userId));
  }
  this.userMap.get(userId).post(tweetId, ++this.time);
};

Twitter.prototype.getNewsFeed = function (userId) {
  if (!this.userMap.has(userId)) return [];
  const maxPQ = new PriorityQueue((a, b) => {
    return b.time - a.time;
  });
  const users = this.userMap.get(userId).follows;
  //add tweet from add user to PQ
  for (const user of users) {
    const tweet = this.userMap.get(user).tweetHead;
    //ensure not to add null to PQ
    if (tweet != null) {
      maxPQ.enqueue(tweet);
    }
  }
  console.log(maxPQ);
  const result = [];
  let count = 0;
  while (maxPQ.size() > 0 && count < 10) {
    //remove front element from PQ
    const tweet = maxPQ.dequeue();
    result.push(tweet.id);
    //add next node of this tweet to max to get it sorted by timestamp
    if (tweet.next != null) {
      maxPQ.enqueue(tweet.next);
    }
    count++;
  }
  return result;
};

Twitter.prototype.follow = function (followerId, followeeId) {
  //create follower user if it does not exist
  if (!this.userMap.get(followerId)) {
    const follower = new User(followerId);
    this.userMap.set(followerId, follower);
  }
  //create followee user if it does not exist
  if (!this.userMap.has(followeeId)) {
    const followee = new User(followeeId);
    this.userMap.set(followeeId, followee);
  }
  //add followee to follower's follows list
  this.userMap.get(followerId).follow(followeeId);
};

Twitter.prototype.unfollow = function (followerId, followeeId) {
  if (followeeId == followerId) return;
  if (this.userMap.has(followerId)) {
    this.userMap.get(followerId).unfollow(followeeId);
  }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
