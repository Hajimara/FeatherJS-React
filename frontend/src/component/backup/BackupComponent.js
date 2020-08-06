import React from "react";
import styled from "styled-components";
import { Button, Upload, Spin } from "antd";
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
const MiddleArea = styled.div`
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
}) {
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
            <MiddleArea>
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
                  <ButtonStyled onClick={onBackupSubmit}>백업</ButtonStyled>
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
                    <ButtonStyled>복구 파일 업로드</ButtonStyled>
                  </Upload>
                  {restoreFile && String(restoreFile).toString() !== "" ? (
                    <ButtonStyled onClick={onSubmit}>복구 요청</ButtonStyled>
                  ) : (
                    ""
                  )}
                </ButtonBox>
              </ButtonWrapper>
            </MiddleArea>
          </AreaWrapper>
        </Spin>
      </Area>
    </>
  );
}

export default BackupComponent;
