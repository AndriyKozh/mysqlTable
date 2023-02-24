const arrViewes = require("../array/arrViewes");
const { db } = require("../model/dbConnection");

function historyId(arrViewes) {
  for (let i = 0; i < arrViewes.length; i++) {
    const resInd = arrViewes[i];

    const titleUrl = resInd.titleUrl;
    const videoID = titleUrl.slice(32, 47);

    function videoInfo(info) {
      const vieweVideo = info?.statistics.viewCount;
      console.log(vieweVideo);
      const likeVideo = info?.statistics.likeCount;

      // console.log(`${videoID} ${vieweVideo}`);

      const sqlQuery =
        "UPDATE user_history_youtube SET   viewe=?, oklike=?  WHERE  user_history_youtube_id=?";
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

    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoID}&key=`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        videoInfo(...data.items);
      });
  }
}

historyId(arrViewes);
