import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useTodoLayerValue } from './context/TodoContext';
import TodoList from './components/TodoList';
import { useLocation, useNavigate } from 'react-router-dom';

const App = () => {
  const [todoContent, setTodoContent] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [state, dispatch] = useTodoLayerValue();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      dispatch({ type: 'INITIALIZE_TODOS', payload: savedTodos });
    }
    setTimestamp(new Date().toISOString().slice(0, 16));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
  }, [location.search]);

  const addTodo = (e) => {
    e.preventDefault();
    if (todoContent) {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          id: uuidv4(),
          content: todoContent,
          description: todoDescription,
          timestamp,
          isCompleted: false,
        },
      });
      setTodoContent("");
      setTodoDescription("");
      setTimestamp(new Date().toISOString().slice(0, 16));
    }
  };

  const handleTimestampChange = (e) => {
    setTimestamp(e.target.value);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    navigate(`?search=${encodeURIComponent(term)}`);
  };

  const filteredTodos = state.todos.filter(todo =>
    todo.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Row className="justify-content-md-center mt-5">
      <Col className="col-12 col-md-6">
        <Card
          text="white"
          className="mb-2"
          style={{ backgroundColor: '#10101d', padding: '.5em' }}
        >
          <Card.Header className="fw-bold" style={{ fontSize: '20px' }}>
            <center>TO DO LIST</center>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={addTodo}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search tasks"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Task</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task"
                  value={todoContent}
                  onChange={(e) => setTodoContent(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={todoDescription}
                  onChange={(e) => setTodoDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Timestamp</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={timestamp}
                  onChange={handleTimestampChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Todo
              </Button>
            </Form>
            <div className="mt-3">
              <TodoList todos={filteredTodos} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default App;
