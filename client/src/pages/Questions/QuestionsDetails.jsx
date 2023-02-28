import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import copy from 'copy-to-clipboard'

import arrowup from "../../assets/arrowup.svg";
import arrowdown from "../../assets/arrowdown.svg";
import "./Questions.css"
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswer from './DisplayAnswer';
import { postAnswer } from '../../actions/question'
import { deleteQuestion, voteQuestion } from '../../actions/question';


const QuestionsDetails = () => {

    const {id} = useParams();

    const questionsList = useSelector((state) => state.questionsReducer);
    // var questionsList = [
    //   {
    //     _id: "1",
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
    //         userAnswered: "Kumar",
    //         answeredOn: "jan 2",
    //         userId: 2,
    //       },
    //     ],
    //   },
    //   {
    //     _id: "2",
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
    //         userAnswered: "Kumar",
    //         answeredOn: "jan 2",
    //         userId: 2,
    //       },
    //     ],
    //   },
    //   {
    //     _id: "3",
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
    //         userAnswered: "Kumar",
    //         answeredOn: "jan 2",
    //         userId: 2,
    //       },
    //     ],
    //   },
    // ];

    const User = useSelector((state) => (state.currentUserReducer))

    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    console.log(location)
    const url = 'http:localhost:3000'

    const [Answer, setAnswer] = useState('')

    const handlePostAns = (e, answerLength) => {
      e.preventDefault()

      if(User == null) {
        alert('Login or Signup to answer a question')
        Navigate('/Auth')
      } else {
        if(Answer === '') {
          alert("Enter an answer before submitting")
        } else {
          dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id }))
        }
      }
    }

    const handleDelete = () => {
      dispatch(deleteQuestion(id, Navigate))
    }

    const handleShare = () => {
      copy(url + location.pathname)
      alert('Copied successfully : ' + url + location.pathname)
    }

    const handleUpVote = () => {
      dispatch(voteQuestion(id, 'upVote', User.result._id))
    }

    const handleDownVote = () => {
      dispatch(voteQuestion(id, "downVote", User.result._id));
    }

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        className="votes-icon"
                        src={arrowup}
                        alt="upvote"
                        width="18"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        className="votes-icon"
                        src={arrowdown}
                        alt="downvote"
                        width="18"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>

                      <div className="question-action-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="50%"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Answers Section */}
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}

                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browser other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default QuestionsDetails
