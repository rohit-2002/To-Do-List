import React, { useState } from "react";
import { useTodoLayerValue } from "../context/TodoContext";
import { Col, Row } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { HiOutlineTrash, HiCheck } from "react-icons/hi";

const SingleTodo = ({ todo }) => {
  const [, dispatch] = useTodoLayerValue();
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(todo.content);
  const [expanded, setExpanded] = useState(false);

  const removeTodo = (todoId) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: todoId,
    });
  };

  const completeTodo = (todoId) => {
    dispatch({
      type: "COMPLETE_TODO",
      payload: todoId,
    });
  };

  const updateTodo = ({ todoId, newValue }) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: {
        todoId,
        newValue,
      },
    });
    setEditable(false);
  };

  return (
    <li className="task-list-item mt-2 px-3 py-2">
      <Row className="w-100 align-items-center">
        <Col xs={12} md={9} className="d-flex align-items-center">
          <input
            className="checkbox"
            checked={todo.isCompleted}
            type="checkbox"
            onChange={() => completeTodo(todo.id)}
          />
          {editable ? (
            <input
              type="text"
              value={content}
              autoFocus
              className="edit-input"
              onKeyUp={(e) =>
                e.key === "Enter" &&
                updateTodo({
                  todoId: todo.id,
                  newValue: content,
                })
              }
              onChange={(event) => setContent(event.target.value)}
            />
          ) : (
            <span
              onClick={() => setExpanded(!expanded)}
              className={
                todo.isCompleted ? "task-name completed" : "task-name"
              }>
              {todo.content}
            </span>
          )}
        </Col>
        <Col
          xs={12}
          md={3}
          className="d-flex justify-content-end align-items-center">
          {editable ? (
            <HiCheck
              className="action-btn check-btn"
              onClick={() =>
                updateTodo({
                  todoId: todo.id,
                  newValue: content,
                })
              }
            />
          ) : (
            <>
              <BiEdit
                className="action-btn edit-btn"
                onClick={() => setEditable(true)}
              />
              <HiOutlineTrash
                className="action-btn delete-btn"
                onClick={() => removeTodo(todo.id)}
              />
            </>
          )}
        </Col>
      </Row>
      {expanded && (
        <div className="todo-details mt-2">
          <p>{todo.description || "No description"}</p>
          <p>{new Date(todo.timestamp).toLocaleString()}</p>
        </div>
      )}
    </li>
  );
};

export default SingleTodo;
