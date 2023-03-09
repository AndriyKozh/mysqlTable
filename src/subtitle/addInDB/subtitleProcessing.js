const arrViewes = require("../array/arrViewes");
const { db } = require("../model/dbConnection");

function historyId(arrViewes) {
  for (let i = 0; i < arrViewes.length; i++) {
    const resInd = arrViewes[i];

    // videoId
    const titleUrl = resInd.titleUrl;
    const videoID = titleUrl.slice(32, 47);

    // likeVideo
    function videoInfo(info) {
      // add DB
      const sqlQuery =
        "UPDATE user_history_youtube SET  subtitle _rocessing?  WHERE  user_history_youtube_id=?";
      db.query(
        sqlQuery,
        [vieweVideo || "0", likeVideo || "0", videoID],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );
    }
  }
}

historyId(arrViewes);
