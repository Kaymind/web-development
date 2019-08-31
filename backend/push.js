var OneSignal = require("onesignal-node");

// first we need to create a client
var myClient = new OneSignal.Client({
  userAuthKey: "N2NhNDkwMGQtYTZkMy00MTE2LTlhMjAtYzZjZmVmNTFhNjgy", // user key
  app: {
    appAuthKey: "ZDE3MDBlMjktOTkyYS00ODU2LTg5YTItNzk3Y2Y2NjQ1NTYw", // rest key
    appId: "fa6ba122-0ba1-4944-8f47-25894d1ebd1d"
  } // appID
});

// we need to create a notification to send
var firstNotification = new OneSignal.Notification({
  contents: {
    en: "CodeMobiles.com",
    th: "โค้ดโมบายส์ จำกัด"
  }
});

// set target users
firstNotification.setIncludedSegments(["All"]);
firstNotification.setExcludedSegments(["Inactive Users"]);

// set notification parameters
firstNotification.setParameter("data", { abc: "123", foo: "bar" });
//firstNotification.setParameter('send_after', 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)');

/*
var firstNotification = new OneSignal.Notification({
    contents: {
        en: "Test notification",
        tr: "Test mesajı"
    },
    include_player_ids: ["1dd608f2-c6a1-11e3-851d-000c2940e62c", "2dd608f2-c6a1-11e3-851d-000c2940e62c"]
});
*/

// send this notification to All Users except Inactive ones
myClient.sendNotification(firstNotification, function(err, httpResponse, data) {
  if (err) {
    console.log("Something went wrong...");
  } else {
    console.log(data, httpResponse.statusCode);
  }
});
