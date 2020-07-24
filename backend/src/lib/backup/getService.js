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
