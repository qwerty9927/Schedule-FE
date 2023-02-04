import './App.css';
import Core from './components/core/index'
import NotFound from './components/core/views/NotFound'

function App() {
  alert("Hiện tại phòng học đã bị thay đổi không còn chính xác. \nXin quay lại sau khi thông báo này mất!")
  return (
    // <Core />
    <NotFound />
  );
}

export default App;
