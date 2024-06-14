import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core';
import Posts from './components/Posts';
import Post from './components/Post';
import NewPost from './components/NewPost';
import NavBar from './components/NavBar';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <>
        <ToastContainer />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/posts/:postID" element={<Post />} />
            <Route path="*" element={<div>Post not found</div>} />
          </Routes>
        </BrowserRouter>
      </>
    </MantineProvider>
  );
};

export default App;

// FROM SA5
// import React from 'react';
// import {
//   BrowserRouter, Routes, Route, NavLink, useParams,
// } from 'react-router-dom';
// import Counter from './components/counter';
// import Controls from './components/controls';

// import './style.scss';

// const Nav = () => {
//   return (
//     <nav>
//       <ul>
//         <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
//         <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink></li>
//         <li><NavLink to="/test/id1" className={({ isActive }) => (isActive ? 'active' : '')}>Test id1</NavLink></li>
//         <li><NavLink to="/test/id2" className={({ isActive }) => (isActive ? 'active' : '')}>Test id2</NavLink></li>
//         <li><NavLink to="/counter" className={({ isActive }) => (isActive ? 'active' : '')}>Counter</NavLink></li>

//       </ul>
//     </nav>
//   );
// };

// const Welcome = () => {
//   return (
//     <div>
//       Welcome
//       {/* <Counter />
//       <Controls /> */}

//     </div>
//   );
// };

// const About = () => {
//   return <div>All there is to know about me</div>;
// };

// const Test = () => {
//   const { id } = useParams();
//   return <div>ID: {id}</div>;
// };

// const FallBack = () => {
//   return <div>URL Not Found</div>;
// };

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div>
//         <Nav />
//         <Routes>
//           <Route path="/" element={<Welcome />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/test/:id" element={<Test />} />
//           <Route path="*" element={<FallBack />} />
//           <Route path="/test/:id" element={<Test />} />
//           <Route path="/counter" element={<><Counter /><Controls /></>} />

//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;