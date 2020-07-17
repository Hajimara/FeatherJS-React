import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { Button, Input, Select, Upload, List, Spin, Progress } from "antd";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import { CloseSquareOutlined } from "@ant-design/icons";
const Area = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background-color: white;
  min-width: 1000px;
  min-height: 700px;
  margin-bottom: 40px;
`;

const ProgressBar = styled(Progress)`
  position: absolute;
  top:50%;
  left:45%;
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
const Title = styled.h1``;

const AreaWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  background-color: white;
  flex-direction: column;
  margin: 0 70px;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
  position:relative;
`;
const WriteTitleBox = styled.div`
  margin: 20px 0 0 0;
  /* border-radius: 3px; */
  width: auto;
  height: 32px;
  display: flex;
`;

const WriteTitleText = styled.div``;

const WriteTitle = styled(Input)`
  padding: 0 15px;
  width: 100%;
  height: 100%;
`;

const WriteFileBox = styled.div`
  margin: 20px 0 0 0;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.125); */
  /* border-radius: 3px; */
  width: 100%;
  height: 10%;
`;
const WriteFile = styled.div`
  width: 100%;
  height: 100%;
`;

const WriteBodyBox = styled.div`
  margin: 20px 0 0 0;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  width: 100%;
  height: auto;
  min-height: 350px;
`;
const WriteBody = styled.div`
.ql-editor {
  padding : 20px;
}
  p {
    font-size: 14px;
    letter-spacing: 0.3px;
  }
`;

const WriteButtonBox = styled.div`
  margin: 20px 0 0 0;
  border-radius: 3px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  /* position: relative; */
`;
const WriteButtonWrapper = styled.div`
  /* position: absolute;
  top: 0;
  right: 20px; */
`;
const WriteButton = styled(Button)`
margin-bottom: 20px;
`;

const Selector = styled(Select)`
  margin-left: 20px;
  height: 40px;

`;
const SelectorOption = styled(Select.Option)`

`;

const FileInput = styled(Input)`
  width: 100%;
  height: 100%;
`;
const ListLine = styled.div`
  display: flex;
  align-items: center;
  ${(props) =>
    props.active &&
    css`
      opacity: 0.3;
      /* box-shadow: 1px 1px 2px 2px #ea907a; */
    `}

  :hover {
    opacity: 0.8;
    color: rgba(0, 0, 0, 0.7);
    text-decoration: none;
  }
`;

const LinkTag = styled.a`
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  padding: 5px 0;
`;

const IconBox = styled.div`
  margin: 5px;
`;

function Write({
  title,
  body,
  onChangeField,
  onSubmit,
  handleCategory,
  isUpdate,
  boardFindOne,
  boardFindOneError,
  boardFindOneLoading,
  category,
  onFileChange,
  fileList,
  setFileList,
  deleteFileId,
  onDeleteId,
  onFileRemove,
  writeLoading,
}) {
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      placeholder: "내용은 최소 10~2000자 까지 입력해주세요",
      modules: {
        // 더 많은 옵션
        // https://quilljs.com/docs/modules/toolbar/ 참고
        toolbar: [
          // [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "link"]
        ],
      },
    });

    // quill에 text-change 이벤트 핸들러 등록
    // 참고: https://quilljs.com/docs/api/#events
    const quill = quillInstance.current;
    console.log(quill);

    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "body", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
    if (boardFindOne) {
      quillInstance.current.root.innerHTML = boardFindOne.body;
    }
  }, [body]);

  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };

  return (
    <Area>
      <TopArea>
        <TitleBox>
          <Title>Write</Title>
        </TitleBox>
       
      </TopArea>
      <AreaWrapper>
      {/* <ProgressBar
      type='circle'
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={50}
      status="active"
    /> */}
      <Spin spinning={writeLoading && writeLoading === true ? true : false} tip={'loading...'}>
        <WriteTitleBox>
          <WriteTitle
            value={title}
            onChange={onChangeTitle}
            placeholder={"제목은 4~60자 이내로 적어주세요."}
          />
          {boardFindOne ? (
            <Selector
              style={{ width: 200 }}
              placeholder="Category Selector"
              optionFilterProp="children"
              onChange={handleCategory}
              defaultValue={
                boardFindOne && boardFindOne.category === "공지"
                  ? "공지"
                  : boardFindOne.category === "QnA"
                  ? "QnA"
                  : null
              }
            >
              <SelectorOption value={"공지"}>공지</SelectorOption>
              <SelectorOption value={"QnA"}>QnA</SelectorOption>
            </Selector>
          ) : (
            <Selector
              style={{ width: 200 }}
              placeholder="Category Selector"
              optionFilterProp="children"
              onChange={handleCategory}
            >
              <SelectorOption value={"공지"}>공지</SelectorOption>
              <SelectorOption value={"QnA"}>QnA</SelectorOption>
            </Selector>
          )}
        </WriteTitleBox>
        <WriteFileBox>
          <WriteFile>
            <Upload
              type={"files"}
              // onChange={onFileChange}
              id="file"
              multiple={true}
              beforeUpload={(file) => {
                setFileList(fileList.concat(file));
                return false; // 파일 선택시 바로 업로드 하지 않고 후에 한꺼번에 전송하기 위함
              }}
              // fileList={fileList}
              // defaultFileList={[...fileList]}
              onRemove={onFileRemove}
            >
              <div style={{display:'flex', justifyContent:  'center',  width: '100%', margin: '0 auto'}}>
              <div><p style={{textAlign: 'center', padding: '15px'}} className="ant-upload-text">
                파일을 업로드 해주세요. <Button>업로드</Button> <br/>
              </p></div>
              </div>
             
              {/* <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p> */}
            </Upload>
            {boardFindOne && boardFindOne.file && !JSON.stringify(boardFindOne.file).includes('[]')? (
              <List
                dataSource={boardFindOne.file}
                renderItem={(item) => {
                  if(item.isDeleted){
                    return;
                  }
                  
                  return (
                  <ListLine
                    active={
                      String(deleteFileId).includes(item._id) ? true : false
                    }
                    key={item._id}
                  >
                    <span
                      className={
                        "ant-upload-list-item-name ant-upload-list-item-name-icon-count-1"
                      }
                    >
                      <LinkTag
                        href={`http://localhost:3030/board/${item._id}?serverFileName=${item.serverFileName}`}
                      >
                        {item.originalFileName}
                      </LinkTag>{" "}
                    </span>
                    {/* <LinkTag
                      href={`http://localhost:3030/board/${item._id}?serverFileName=${item.serverFileName}`}
                    >
                      {item.originalFileName}
                    </LinkTag>  */}
                    <IconBox>
                      <CloseSquareOutlined
                        data-id={item._id}
                        onClick={onDeleteId}
                      />
                    </IconBox>
                    {/* <span >삭제</span> */}
                  </ListLine>
                )}}
              ></List>
            ) : (
              ""
            )}
          </WriteFile>
        </WriteFileBox>
        <WriteBodyBox>
          <WriteBody>
            <div ref={quillElement} />
          </WriteBody>
        </WriteBodyBox>
        <WriteButtonBox>
          <WriteButtonWrapper>
            <WriteButton onClick={onSubmit}>등록</WriteButton>
          </WriteButtonWrapper>
        </WriteButtonBox></Spin>
      </AreaWrapper>
    </Area>
  );
}

export default Write;
