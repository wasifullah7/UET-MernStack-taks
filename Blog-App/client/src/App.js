import './App.css';

import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
  return (
    <div>
      <h1>Blog App</h1>
      <PostForm />
      <PostList />
    </div>
  );
}

export default App;
