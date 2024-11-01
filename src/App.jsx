import React, { useEffect, useState } from "react";
import api from "./axios/api";


const App = () => {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState(null);
  const [editTodo, setEditTodo] = useState({
    title: "",
  });


	// GET Req
  const fetchTodos = async () => {
    const { data } = await api.get("/todos");
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };
  // POST Req
  const onSubmitHandler = async(todo) => {
    await api.post("/todos", todo);
    // re-render 
    setTodos([...todos, todo]);
  };
  
  // 만일 fetch를 사용했다면, 이렇게 JSON.stringify를 '직접' 해주어야 해요.
  // await fetch("http://localhost:3000/todos", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(todo),
  // });

  // DELETE Req
  const onClickDeleteButtonHandler = (todoId) => {
    api.delete(`/todos/${todoId}`);
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  // PATCH Req
  const onClickEditButtonHandler = (todoId, edit) => {
    api.patch(`/todos/${todoId}`, edit);
    const newTodos = todos.map(todo => {

      if (todo.id === todoId) {
        return {
          ...todo,
          title: edit.title
        }
      }
      return todo
    })
    setTodos(newTodos)
  };



	
	// 생성한 함수를 컴포넌트가 mount된 후 실행하기 위해 useEffect를 사용합니다.
  useEffect(() => {
		// effect 구문에 생성한 함수를 넣어 실행합니다.
    fetchTodos();
  }, []);

	// data fetching이 정상적으로 되었는지 콘솔을 통해 확인합니다.
  console.log("todos =>",todos);
  return (
    <>
      <form
        onSubmit={(e) => {
					// 👇 submit했을 때 브라우저의 새로고침을 방지합니다. 
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="수정하고싶은 Todo ID"
            onChange={(ev) => {
              setTargetId(ev.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정값 입력"
            onChange={(ev) => {
              setEditTodo({
                ...editTodo,
                title: ev.target.value,
              });
            }}
          />
          <button
						// type='button' 을 추가해야 form의 영향에서 벗어남
            type="button"
            onClick={() => onClickEditButtonHandler(targetId, editTodo)}
          >
            수정하기
          </button>
        </div>
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>{todo.title}
            <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(todo.id)}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;