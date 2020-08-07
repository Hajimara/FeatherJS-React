import React from "react";
import styled from "styled-components";
import { Button, Upload, Spin, Table, Checkbox } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { date_to_str } from "../../lib/timeFormatter";

const Area = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background-color: white;
  min-width: 1000px;
  min-height: 750px;
`;

const TopArea = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: white;
  position: relative;
  margin-bottom: 20px;
`;

const TitleBox = styled.div`
  margin: 40px 40px 0 70px;
  font-size: 32px;
`;
const Title = styled.div`
  font-size: 32px;
`;

const AreaWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: white;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
`;

const ButtonBox = styled.div``;
const ButtonWrapper = styled.div``;
const ButtonStyled = styled(Button)`
  margin: 10px 10px 0 0;
`;
const LeftArea = styled.div`
  display: flex;
  width: 400px;
  background-color: white;
  position: relative;
  margin: 20px 70px;
  flex-direction: column;
  p {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const RightArea = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  position: relative;
  margin: 20px 70px;
  flex-direction: column;
  p {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function BackupComponent({
  boardFindAllTotal,
  findAllCommentTotal,
  fileCount,
  user,
  onFileRemove,
  setRestoreFile,
  restoreFile,
  onSubmit,
  restoreLoading,
  backupLoading,
  onBackupSubmit,
  boardFindAll,
  findAllComment,
  onChangeCheckBox,
  boardIdList,
}) {
  let columns = [
    {
      title: "작성자",
      dataIndex: "author",
      key: "author",
      width: 150,
      sorter: (a, b) =>
        a.author.username < b.author.username
          ? -1
          : a.author.username > b.author.username
          ? 1
          : 0,
      render: (author) => {
        return <div key={author.email}>{author.username}</div>;
      },
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      width: 650,
      sorter: (a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0),
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
      title: "백업 선택하기",
      dataIndex: "_id",
      key: "_id",
      width: 300,
      render: (_id) => {
        return (
          <div style={{ width: "100%" }} key={_id}>
            <Checkbox
              key={_id}
              data-id={_id}
              onChange={onChangeCheckBox}
              style={{ marginLeft: "30px" }}
              checked={boardIdList.includes(_id) ? true : false}
            ></Checkbox>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Area>
        <Spin
          spinning={
            (backupLoading && backupLoading === true) ||
            (restoreLoading && restoreLoading === true)
              ? true
              : false
          }
          tip={"loading..."}
        >
          <TopArea>
            <TitleBox>
              <Title>{"Backup & Restore"}</Title>
            </TitleBox>
          </TopArea>
          <AreaWrapper>
            <LeftArea>
              <div>{restoreLoading}</div>
              {boardFindAllTotal ? (
                <p>게시물 총 개수 : {boardFindAllTotal}개</p>
              ) : (
                <p>게시물 총 개수 : 0</p>
              )}
              <br />
              {findAllCommentTotal ? (
                <p>댓글 총 개수 : {findAllCommentTotal}개</p>
              ) : (
                <p>댓글 총 개수 : 0</p>
              )}
              <br />
              {fileCount ? (
                <p>파일 총 개수 : {fileCount}개</p>
              ) : (
                <p>파일 총 개수 : 0</p>
              )}
              <ButtonWrapper>
                <ButtonBox>
                  <ButtonStyled
                    disabled={
                      (restoreLoading || backupLoading) === true ? true : false
                    }
                    onClick={onBackupSubmit}
                  >
                    백업
                  </ButtonStyled>
                  <Upload
                    name="file"
                    fileList={restoreFile}
                    multiple={false}
                    beforeUpload={(file) => {
                      setRestoreFile([file]);
                      return false;
                    }}
                    onRemove={onFileRemove}
                  >
                    <ButtonStyled
                      disabled={
                        (restoreLoading || backupLoading) === true
                          ? true
                          : false
                      }
                    >
                      복구 파일 업로드
                    </ButtonStyled>
                  </Upload>
                  {restoreFile && String(restoreFile).toString() !== "" ? (
                    <ButtonStyled
                      disabled={
                        (restoreLoading || backupLoading) === true
                          ? true
                          : false
                      }
                      onClick={onSubmit}
                    >
                      복구 요청
                    </ButtonStyled>
                  ) : (
                    ""
                  )}
                </ButtonBox>
              </ButtonWrapper>
            </LeftArea>
            <RightArea>
              <Table
                columns={columns}
                dataSource={boardFindAll}
                pagination={{
                  total: boardFindAllTotal,
                  pageSize: 8,
                  // onChange: onPagination,
                }}
              ></Table>
            </RightArea>
          </AreaWrapper>
        </Spin>
      </Area>
    </>
  );
}

export default BackupComponent;
