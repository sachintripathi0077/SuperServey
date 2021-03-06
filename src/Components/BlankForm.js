import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";
import FormHeader from "./FormHeader";
import { postFormQuestions } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import axios from "axios";
import { incrementQuestionId } from "../Redux/actions";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BlankForm({
  postQuestionsList,
  existingQuestionsList,
  incrementQuestionId,
  questionId,
  headerContent,
}) {
  const navigate = useNavigate();
  const [questionList, setquestionList] = useState([]);

  useEffect(() => {
    if (existingQuestionsList !== undefined) {
      setquestionList(existingQuestionsList);
    }
  }, []);

  const addQuestion = () => {
    const questionArr = [...questionList];
    questionArr.push({
      id: questionId,
      type: "text",
      label: "",
    });
    setquestionList(questionArr);
    incrementQuestionId();
    //scrolling logic
    window.scrollTo(0, document.body.scrollHeight);
  };

  const deleteQuestion = (i) => {
    const list = [...questionList];
    list.splice(i, 1);
    setquestionList(list);
  };

  const updatedData = (options, label, questionType, index) => {
    const list = [...questionList];
    list[index] = {
      ...list[index],
      type: questionType,
      label,
      options,
    };
    setquestionList(list);
  };

  const onPreviewClick = () => {
    postQuestionsList(questionList);
    navigate(`/preview`);
  };

  const viewResponse = () => {
    navigate(`/responses`);
  };

  const onSaveClick = async () => {
    const form = {
      questionList,
      headerContent,
    };
    try {
      const response = await axios.post(
        "http://localhost:3080/savedForms",
        form
      );
    } catch (e) {
      console.log("error ", e);
    }
    toast("form saved");
  };

  return (
    <>
      &nbsp;
      <div className="container">
        &nbsp;
        <FormHeader />
        {questionList.map((question, i) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={i}
            deleteQuestion={() => deleteQuestion(i)}
            updatedData={updatedData}
          ></QuestionCard>
        ))}
      </div>
      {/* ---------------------------------------Toolbar Start ----------------------------------*/}
      {/* <div className="mynav">
        <button
          type="button"
          className="formtextbutton"
          id="mybtn"
          onClick={addQuestion}
        >
          <MdAddCircleOutline />
          Add Tile
        </button> */}
      <div className="mynav">
        <button
          type="button"
          className="btn btn-primary"
          // id="formtextbutton"
          id="previewbutton2"
          onClick={addQuestion}
        >
          <MdAddCircleOutline /> Add Question
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          id="previewbutton"
          onClick={onPreviewClick}
        >
          <MdOutlineRemoveRedEye /> Preview
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          id="previewbutton"
          onClick={onSaveClick}
        >
          <BiSave /> Save Form
        </button>
        <button
          onClick={viewResponse}
          id="previewbutton"
          className="btn btn-secondary"
        >
          Responses
        </button>
        {/* <button onClick={onPreviewClick} className="previewbutton">
          Preview
        </button> */}
      </div>
      <ToastContainer />
      {/* ---------------------------------------Toolbar END ----------------------------------*/}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    existingQuestionsList: state.questionsList,
    questionId: state.questionId,
    headerContent: state.headerContent,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postQuestionsList: (list) => dispatch(postFormQuestions(list)),
    incrementQuestionId: () => dispatch(incrementQuestionId()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlankForm);
