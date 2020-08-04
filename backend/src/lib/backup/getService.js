/**
 * 백업에 필요한 데이터를 가져와 객체안에 담는 작업을 하는 함수이다.
 */

module.exports = async (req,user) => {
  let board = null;
  let comment = null;
  try {
    board = await req.app.service("board").find({user});
    comment = await req.app.service("comment").find({user});
  } catch (error) {
    console.log(error);
  }
  const dataStructure= { board: board.data,comment: comment.data }

  return dataStructure;
};
