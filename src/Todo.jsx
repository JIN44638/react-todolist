import { useState } from "react";

export function Todo() {
  // 입력창에 적은 할일
  const [task, setTask] = useState("");
  //할일 목록을 저장하는 배열
  const [taskList, setTaskList] = useState([]);
  // 현재 수정 중인 항목의 아이디
  const [editId, setEditId] = useState(null);
  // 수정 중 입력한 텍스트
  const [editText, setEditText] = useState("");
  // 할일 추가 함수
  function handleAdd() {
    // console.log(task);
    if (task.trim() === "") return; //공백이면 추가하지 않음
    const newTask = {
      id: Date.now(), //고유한 아이디 생성
      text: task,
      date: new Date().toLocaleString(), //현재시간 저장
      done: false,
    };
    // console.log("새 할일 객체:", newTask);
    setTaskList([...taskList, newTask]); //기존 목록에 추가 [{}]
    setTask(""); //입력창 비우기
    // console.log(taskList);
  }
  // 체크박스로 완료 상태 변경 함수
  function toggleDone(id) {
    // console.log(id);
    // taskList 배열을 순회하면서 각 항목을 검사합니다.
    setTaskList(
      taskList.map((t) =>
        t.id === id
          ? {
              ...t, //기존 항목의 다른 속성은 그대로 두고
              done: !t.done, //done 값을 true => false 반전 시킨다.
            }
          : t
      )
    );
  }
  //수정 시작 함수
  function handleEditStart(id, currentText) {
    // console.log(id,currentText);
    setEditId(id); //지금 수정하려는 항목의 id를 저장해두고
    setEditText(currentText);
  }
  // 수정 저장 함수
  function handleEditSave(id) {
    // console.log(id,editText);
    if (editText.trim() === "") return; //빈칸이면 저장하지 않고 함수 종료한다
    setTaskList(taskList.map((t) => (t.id === id ? { ...t, text: editText } : t)));
    setEditId(null);
    setEditText("");
  }
  // 삭제 기능
  function handleDelete(id) {
    setTaskList(taskList.filter((t) => t.id !== id));
  }
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
      <h1>TODO LIST</h1>
      <input
        style={{ padding: "10px", fontSize: "16px", width: "70%" }}
        type="text"
        placeholder="할일을 입력하세요"
        value={task}
        onChange={(e) => {
          // console.log(e.target.value);

          setTask(e.target.value);
        }}
      />
      <button style={{ padding: "10px", marginLeft: "10px" }} onClick={handleAdd}>
        추가
      </button>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: "20px",
          textAlign: "left",
        }}>
        {taskList.map(({ id, text, date, done }) => (
          <li
            key={id}
            style={{
              marginBottom: "12px",
              background: done ? "#d4edda" : "#f8d7da",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <div>
              <input type="checkbox" checked={done} onChange={() => toggleDone(id)} style={{ marginRight: "10px" }} />
              {editId === id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => {
                      console.log("수정중 입력 값:", e.target.value);

                      setEditText(e.target.value);
                    }}
                    style={{ padding: "5px", fontSize: "14px", width: "70%" }}
                  />
                  <button
                    onClick={() => handleEditSave(id)}
                    style={{
                      marginLeft: "5px",
                      padding: "5px 8px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}>
                    저장
                  </button>
                </>
              ) : (
                <>
                  <strong style={{ textDecoration: done ? "line-through" : "none" }}>{text}</strong> <br />
                  <small style={{ color: "#666" }}>{date}</small>
                </>
              )}
            </div>
            <div>
              {!editId !== id && (
                <>
                  <button
                    onClick={() => handleEditStart(id, text)}
                    style={{
                      background: "orange",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "5px 8px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}>
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "5px 8px",
                      cursor: "pointer",
                    }}>
                    삭제
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
