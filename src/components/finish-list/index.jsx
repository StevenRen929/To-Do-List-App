import React, { useEffect, useState } from "react";
import "./index.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { useNavigate } from "react-router-dom";

export default function FinshList({
  finishedItems,
  revertComplete,
  deleteEvent,
}) {
  const navigate = useNavigate();

  finishedItems = finishedItems || [];

  return (
    <div className="finsh-list-container">
      <ul className="list-group">
        {finishedItems.map((event, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex flex-wrap justify-content-between align-items-center"
            >
              <b className=" col-sm-1  col-md-1">event Name:</b>{" "}
              <p className="col-sm-1 col-md-2">{event.toDo} </p>
              <b className="col-sm-1  col-md-1"> finish Date: </b>{" "}
              <p className="col-sm-1 col-md-2">{event.finishDate}</p>
              <button
                className="revert-btn col-sm-1  col-md-1"
                aria-label="revert event"
                onClick={() => revertComplete(event.id)}
              >
                <KeyboardReturnOutlinedIcon />
              </button>
              <button
                className="delete-btn col-sm-1  col-md-1"
                aria-label="delete event"
                onClick={() => deleteEvent(event.id)}
              >
                <DeleteForeverIcon />
              </button>
              <button
                className="detail-btn col-sm-1  col-md-1"
                aria-label="delete event"
                onClick={() => {
                  navigate(`/todo-detail/${event.id}`);
                }}
              >
                Detail
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
