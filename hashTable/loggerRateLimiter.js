/*
Design a logger system that receives a stream of messages along with their timestamps.
Each unique message should only be printed at most every 10 seconds (i.e. a message 
printed at timestamp t will prevent other identical messages from being printed 
until timestamp t + 10).

All messages will come in chronological order. Several messages may arrive at the same timestamp.

Implement the Logger class:

Logger() Initializes the logger object.
bool shouldPrintMessage(int timestamp, string message) Returns true if the message should be printed in the given timestamp, otherwise returns false.
 
Example 1:
Input
["Logger", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage"]
[[], [1, "foo"], [2, "bar"], [3, "foo"], [8, "bar"], [10, "foo"], [11, "foo"]]
Output
[null, true, true, false, false, false, true]

Explanation
Logger logger = new Logger();
logger.shouldPrintMessage(1, "foo");  // return true, next allowed timestamp for "foo" is 1 + 10 = 11
logger.shouldPrintMessage(2, "bar");  // return true, next allowed timestamp for "bar" is 2 + 10 = 12
logger.shouldPrintMessage(3, "foo");  // 3 < 11, return false
logger.shouldPrintMessage(8, "bar");  // 8 < 12, return false
logger.shouldPrintMessage(10, "foo"); // 10 < 11, return false
logger.shouldPrintMessage(11, "foo"); // 11 >= 11, return true, next allowed timestamp for "foo" is 11 + 10 = 21
 
 */
var Logger = function () {};

/**
 * @param {number} timestamp
 * @param {string} message
 * @return {boolean}
 */
Logger.prototype.shouldPrintMessage = function (timestamp, message) {};

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */

/* 
Approach 1: Hashtable
Time complexity: O(1)
Space complexity: O(M). where M is the size of all incoming messages. 
Over the time, the hashtable would have an entry for each unique message that has appeared.

1st Run:
Runtime: 226 ms, faster than 13.65% of JavaScript online submissions for Logger Rate Limiter.
Memory Usage: 48.4 MB, less than 33.08% of JavaScript online submissions for Logger Rate Limiter.
2nd Run:
Runtime: 254 ms, faster than 8.60% of JavaScript online submissions for Logger Rate Limiter.
Memory Usage: 48 MB, less than 85.05% of JavaScript online submissions for Logger Rate Limiter.
*/
var Logger = function () {
  this.msgMap = new Map();
  this.shouldPrintMessage = function (timestamp, message) {
    if (this.msgMap.has(message)) {
      const allowedTimestamp = this.msgMap.get(message) || 0;
      if (timestamp < allowedTimestamp) return false;
      this.msgMap.set(message, timestamp + 10);
    } else {
      this.msgMap.set(message, timestamp + 10);
    }
    return true;
  };
};

/*
Approach 2: 
Time complexity: O(N). where N is the size of the queue. In the worst case, 
all the messages in the queue become obsolete. As a result, we need clean them up.
Space complexity: O(N). where N is the size of the queue. We keep the incoming
messages in both the queue and set. The upper bound of the required space would
be 2N, if we have no duplicate at all.

Runtime: 271 ms, faster than 7.66% of JavaScript online submissions for Logger Rate Limiter.
Memory Usage: 50.1 MB, less than 12.34% of JavaScript online submissions for Logger Rate Limiter.
*/
var Logger = function () {
  this.msgSet = new Set();
  this.queue = [];

  function Log(timestamp, message) {
    this.timestamp = timestamp;
    this.message = message;
  }

  this.shouldPrintMessage = function (timestamp, message) {
    //clean up
    while (this.queue.length > 0) {
      const lastLog = this.queue[0];
      //if the message has expired
      if (timestamp - lastLog.timestamp >= 10) {
        this.msgSet.delete(lastLog.message);
        this.queue.shift();
      } else {
        break;
      }
    }

    //check for message
    if (!this.msgSet.has(message)) {
      const log = new Log(timestamp, message);
      this.queue.push(log);
      this.msgSet.add(message);
      return true;
    } else {
      return false;
    }
  };
};
