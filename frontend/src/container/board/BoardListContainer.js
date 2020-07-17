import React, { useEffect, useRef, useState } from "react";
import BoardList from "../../component/board/BoardList";
import { useDispatch, useSelector } from "react-redux";
import { boardFindAllThunk, boardInitialize } from "../../modules/board";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { writeInitialize } from "../../modules/write";

function BoardListContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const switchError = useRef(false);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [sort, setSort] = useState("");
  const [sortedInfo, setSortedInfo] = useState();

  const {
    user,
    boardFindAll,
    boardFindAllTotal,
    boardFindAllError,
    boardFindAllLoading,
  } = useSelector(({ board, loading, auth }) => ({
    user: auth.user,
    boardFindAll: board.boardFindAll,
    boardFindAllTotal: board.boardFindAllTotal,
    boardFindAllError: board.boardFindAllError,
    boardFindAllLoading: loading["board/BOARD_FIND_ALL"],
  }));

  const onChangeSortColumn = (sorter) => {
    setSortedInfo(sorter);
  }

  useEffect(() => {
    dispatch(writeInitialize());

    return () => {
      dispatch(boardInitialize());
    };
  }, []);
  useEffect(() => {
    const data = {
      page: 1,
      search: search,
      sort: sort,
      searchType: searchType,
    };
    dispatch(writeInitialize());
    dispatch(boardFindAllThunk(data));
  }, [dispatch]);

  useEffect(() => {
    if (!switchError.current) {
      switchError.current = true;
      return;
    }
    message.warning("해당 사용자는 읽기 권한이 없습니다.");
  }, [boardFindAllError]);

  const onWrite = () => {
    history.push("/write");
  };

  const onPagination = (e) => {
    const data = {
      page: e,
      search: search,
      sort: sort,
      searchType: searchType,
    };
    dispatch(boardFindAllThunk(data));
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onChangeSort = (e) => {
    setSort(e);
    const data = {
      page: 1,
      search: search,
      sort: e,
      searchType: searchType,
    };

    if (
      (data.search !== "" && data.searchType !== "") ||
      (data.search === "" && data.searchType === "")
    ) {
      dispatch(boardFindAllThunk(data));
    } else {
      message.warning("검색어와 검색타입을 함께 선택해주세요.");
    }
  };

  const onSubmit = () => {
    const data = {
      page: 1,
      search: search,
      sort: sort,
      searchType: searchType,
    };
      dispatch(boardFindAllThunk(data));
  };
  const onChangeSearchType = (e) => {
    setSearchType(e);
  };

  const onInitSearch = () => {
    setSearch("");
    setSearchType("");
    setSort("");
    setSortedInfo('');
    const data = {
      page: 1,
      search: "",
      sort: "",
      searchType: "",
    };
    dispatch(boardFindAllThunk(data));
  };
  return (
    <BoardList
      boardFindAll={boardFindAll}
      boardFindAllTotal={boardFindAllTotal}
      boardFindAllError={boardFindAllError}
      boardFindAllLoading={boardFindAllLoading}
      onWrite={onWrite}
      onPagination={onPagination}
      user={user}
      onChangeSearch={onChangeSearch}
      onChangeSort={onChangeSort}
      onChangeSearchType={onChangeSearchType}
      search={search}
      sort={sort}
      searchType={searchType}
      onSubmit={onSubmit}
      onInitSearch={onInitSearch}
      sortedInfo={sortedInfo}
onChangeSortColumn={onChangeSortColumn}
    />
  );
}

export default BoardListContainer;
