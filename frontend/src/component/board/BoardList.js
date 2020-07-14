import React from "react";
import styled from "styled-components";
import { Input, Button, Select, Table, Form } from "antd";
import { date_to_str } from "../../lib/timeFormatter";
import { Link } from "react-router-dom";
import moment from 'moment';

const Area = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background-color: white;
  min-width: 1000px;
  min-height: 500px;
`;

const TopArea = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: white;
  position: relative;
`;

const TitleBox = styled.div`
  margin: 15px 40px 0 40px;
  font-size: 32px;
`;
const Title = styled.div`
margin: 40px 40px 0 70px;
  font-size: 32px;
`;

const AreaWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: white;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
`;

const BottomArea = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: flex-end;
`;
const BottomButtonBox = styled.div`
  padding: 0 70px;
`;
const WriteButton = styled(Button)`
  width: auto;
  margin-bottom: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  position: absolute;
  bottom: -30px;
  right: 70px;
`;

const SeachInput = styled(Input)`
  width: 180px;
`;

const SeachButton = styled(Button)`
  margin-left: 10px;
`;
const SortSelector = styled(Select)`
  margin-left: 20px;
`;
const SortSelectorOption = styled(Select.Option)``;

const TableBox = styled.div`
  margin: 70px 70px 15px 70px;
  width: 100%;
`;
const BoardTable = styled(Table)`
  width: 100%;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function BoardList({
  boardFindAll,
  boardFindAllTotal,
  boardFindAllError,
  boardFindAllLoading,
  onWrite,
  onPagination,
  user,
  onChangeSearch,
  onChangeSort,
  search,
  sort,
  onSubmit,
  onChangeSearchType,
  searchType,
  onInitSearch,
  sortedInfo,
  onChangeSortColumn,
}) {
  const columns = [
    {
      title: "카테고리",
      dataIndex: "category",
      key: "category",
      width: 170,
      sorter: (a, b) => a.category < b.category? -1 : a.category > b.category ? 1 : 0,
    },
    {
      title: "작성자",
      dataIndex: "author",
      key: "author",
      width: 150,
      sorter: (a, b) => a.author.username < b.author.username? -1 : a.author.username > b.author.username ? 1 : 0,
      render: (author) => {
        return <div key={author.email}>{author.username}</div>;
      },
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      width: 650,
      sorter: (a, b) => a.title < b.title? -1 : a.title > b.title ? 1 : 0,
      render: (title, data) => {
        return (
          <TitleLink key={data.author.email} to={`/board/${data._id}`}>
            {String(title).length > 40 ? `${title}...` : title}
          </TitleLink>
        );
      },
    },
    {
      title: "등록일",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 300,
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: (createdAt) => {
        return <div key={createdAt}>{date_to_str(new Date(createdAt))}</div>;
      },
    },
    {
      title: "조회수",
      dataIndex: "views",
      key: "views",
      sorter: (a, b) => a.views - b.views,
    },
  ];

  return (
    <Area>
      <TopArea>
          <Title>Board</Title>
        <SearchBox>
          <Form onSubmitCapture={onSubmit}>
            <SeachInput value={search} onChange={onChangeSearch}></SeachInput>
            <SeachButton htmlType="submit">검색</SeachButton>
          </Form>
          <SeachButton onClick={onInitSearch}>초기화</SeachButton>
          <SortSelector
            style={{ width: 200 }}
            placeholder="Search Selector"
            optionFilterProp="children"
            onChange={onChangeSearchType}
            value={searchType}
          >
            <SortSelectorOption value="title">제목</SortSelectorOption>
            <SortSelectorOption value="body">내용</SortSelectorOption>
            <SortSelectorOption value="username">작성자</SortSelectorOption>
            <SortSelectorOption value="category">카테고리</SortSelectorOption>
            {/* <SortSelectorOption value="category">카테고리</SortSelectorOption> */}
          </SortSelector>
          {/* <SortSelector
            style={{ width: 200 }}
            placeholder="Sort Selector"
            optionFilterProp="children"
            onChange={onChangeSort}
            value={sort}
          >
            <SortSelectorOption value=""></SortSelectorOption>
            <SortSelectorOption value="최신순">최신순</SortSelectorOption>
            <SortSelectorOption value="조회수">조회수</SortSelectorOption>
          </SortSelector> */}
        </SearchBox>
      </TopArea>
      <AreaWrapper>
        <TableBox>
          <BoardTable
          onChange={onChangeSortColumn}
            pagination={{
              total: boardFindAllTotal,
              pageSize: 8,
              onChange: onPagination,
            }}
            dataSource={boardFindAll}
            columns={columns}
          ></BoardTable>
        </TableBox>
      </AreaWrapper>
      <BottomArea>
        <BottomButtonBox>
          {user && (user.role.includes("c") || user.role.includes("super")) ? (
            <WriteButton onClick={onWrite}>글쓰기</WriteButton>
          ) : (
            <WriteButton disabled onClick={onWrite}>
              글쓰기
            </WriteButton>
          )}
        </BottomButtonBox>
      </BottomArea>
    </Area>
  );
}

export default BoardList;
