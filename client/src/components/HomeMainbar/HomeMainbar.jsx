import React from "react";
import "../HomeMainbar/HomeMainbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import {useSelector} from 'react-redux'


const HomeMainbar = () => {

const location = useLocation();
const user = 1;
const navigate = useNavigate()

const questionsList = useSelector(state => state.questionsReducer)

  // var questionsList = [
  //   {
  //     _id: 1,
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function?",
  //     questionBody:
  //       "A function is a block of code designed to perform a particular task. A JavaScript function is executed when 'something' invokes it (calls it).",
  //     questionTags: ["function", "programming", "c", "js"],
  //     userPosted: "Manoj",
  //     userId: 1,
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredon: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     _id: 2,
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 0,
  //     questionTitle:
  //       "How to unit testing a class that uses android.icu.text.* library with JUnit and Mockito in Android Studio? (in Java)",
  //     questionBody: "It meant to be",
  //     questionTags: ["android", "google"],
  //     userPosted: "Manoj",
  //     userId: 2,
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredon: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     _id: 3,
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 0,
  //     questionTitle: "Add quotes to number values in an array",
  //     questionBody:
  //       "You are over-complicating this, particularly by first converting the entire array with toString(). It's as simple as follows:",
  //     questionTags: ["java", "array", "string"],
  //     userPosted: "Manoj",
  //     userId: 3,
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredon: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  // ];



  const checkAuth = () => {
    if(user === null) {
      alert("Login or Signup to ask a question");
      navigate("./Auth");
    } else {
      navigate('./AskQuestion')
    }
  }

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
