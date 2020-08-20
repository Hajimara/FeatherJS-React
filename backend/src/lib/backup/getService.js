/**
 * 백업에 필요한 데이터를 가져와 객체안에 담는 작업을 하는 함수이다.
 * 사용자가 셀렉박스를 선택했을 경우 request받는 body data배열 길이를 파악하여
 * 쿼리가 필요한 요청인지를 판단한다.
 * 수정
 */

module.exports = async (req, user) => {
  let board = null;
  let comment = null;
  let getServiceList = req.body.dataStructure;
  let dataStructure = {};
  let rootKey = getServiceList[0];
  try {
    console.log(getServiceList);
    if (
      String(req.originalUrl).includes("/backup") &&
      req.body.selectBoardId.length > 0
    ) {
      // dataStructure의 배열 0번째는 항상 rootKey를 파라미터로 받는다.
      // rootKey 이외의 컬렉션은 rootKey의 _id를 가지고 있는지 검색한다.
      const getSelectServicePromise = async (serviceItem) => {
        if(rootKey === serviceItem) {
          return new Promise(async (resolve, reject) => {
            let result = await req.app.service(serviceItem).find({
              user,
              query: {
                $sort: {
                  createdAt: -1,
                },
                _id: {
                  $in: req.body.selectBoardId,
                },
              },
            });
            console.log(result);
            if (result) {
              dataStructure[serviceItem] = result.data;
              resolve(result);
            } else {
              reject;
            }
          });
        }else{
          return new Promise(async (resolve, reject) => {
            let result = await req.app.service(serviceItem).find({
              user,
              query: {
                $sort: {
                  createdAt: -1,
                },
                board: {
                  $in: req.body.selectBoardId,
                },
              },
            });
            console.log(result);
            if (result) {
              dataStructure[serviceItem] = result.data;
              resolve(result);
            } else {
              reject;
            }
          });
        }
       
      };
      await Promise.all(
        getServiceList.map((serviceItem) =>
          getSelectServicePromise(serviceItem)
        )
      ).then(() => {
        console.log("get Service");
      });
    } else {
      if (typeof getServiceList === "string") {
        getServiceList = getServiceList.substring(0).substring(-1).split(",");
      }
      const getServicePromise = async (serviceItem) => {
        return new Promise(async (resolve, reject) => {
          let result = await req.app.service(serviceItem).find({
            user,
          });
          console.log(result);
          if (result) {
            dataStructure[serviceItem] = result.data;
            resolve(result);
          } else {
            reject;
          }
        });
      };
      await Promise.all(
        getServiceList.map((serviceItem) => getServicePromise(serviceItem))
      ).then(() => {
        console.log("get Service");
      });
    }
  } catch (error) {
    console.log(error);
  }
  // const dataStructure = { board: board.data, comment: comment.data };

  return dataStructure;
};
