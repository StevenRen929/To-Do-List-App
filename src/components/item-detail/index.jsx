import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import formatDateToIso from "../format-method/formatDateToIso";
import GetTimeDiff from "./get-time-diff";
import Warning from "./warning";
import "./index.css";

export default function ItemDetail(props) {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const [timeRemain, setTimeRemain] = useState(null);
  const [haveTimeDiff, sethaveTimeDiff] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("eventsList"));
    const item = data.find((item) => item.id === id); //get particular item from event list
    console.log(item);
    setPostDetail(item);
    if (!item.Complete) {
      sethaveTimeDiff(true);
    }
  }, [id]);

  if (!postDetail) {
    return <div>404 Not found</div>;
  }

  console.log(postDetail.Subtasks.lenght);

  return (
    <div className="task-detail-container">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Time Created: </th>
            <td> {postDetail.createTime}</td>
          </tr>
          <tr>
            <th scope="row">Deadline: </th>
            <td>{formatDateToIso(postDetail.dueDate)}</td>
          </tr>
          <tr>
            <th scope="row">Subtasks</th>
            <td>
              <ul className="list-group">
                {postDetail.Subtasks.length > 0 ? (
                  postDetail.Subtasks.map((subtask, index) => (
                    <li className="list-group-item" key={index}>
                      <strong>
                        {`subtask${index + 1}: `}
                        {subtask.subTitle}
                      </strong>
                      :<br />
                      <em>description:</em>
                      <br />
                      {subtask.description}
                    </li>
                  ))
                ) : (
                  <li>No Subtask</li>
                )}
              </ul>
            </td>
          </tr>
          <tr>
            <th scope="row">Event Status: </th>
            <td>
              {postDetail.Complete ? (
                <span>Completed</span>
              ) : (
                <span>Not Completed</span>
              )}
            </td>
          </tr>
          {haveTimeDiff && (
            <tr>
              <th scope="row">Time Remain:</th>
              <td>
                <GetTimeDiff
                  dueDate={new Date(postDetail.dueDate)}
                  setTimeRemain={setTimeRemain}
                ></GetTimeDiff>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <Warning
          timeRemain={timeRemain}
          Complete={postDetail.Complete}
        ></Warning>
      </div>
    </div>
  );
}
