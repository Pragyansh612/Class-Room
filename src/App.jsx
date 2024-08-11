import React from 'react';
import Nav from './assets/components/navbar';
import PrincipleNav from './assets/components/principleNav';
import TeacherNav from './assets/components/teacherNav'
import StudentNav from './assets/components/studentNav'
import Home from './assets/pages/Home';
import PrincipleLogin from './assets/pages/principle/Login';
import PrincipleHome from './assets/pages/principle/home';
import PrincipleCreate from './assets/pages/principle/create';
import TeacherLogin from './assets/pages/teacher/Login'
import TeacherHome from './assets/pages/teacher/Home2'
import TeacherCreate from './assets/pages/teacher/Create'
import StudentLogin from './assets/pages/student/Login'
import StudentHome from './assets/pages/student/Home3'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Nav/><Home/></>,
    },
    {
      path: "/principle/login",
      element: <><Nav/><PrincipleLogin/></>,
    },
    {
      path: "/principle/home",
      element: <><PrincipleNav/><PrincipleHome/></>,
    },
    {
      path: "/principle/create",
      element: <><PrincipleNav/><PrincipleCreate/></>,
    },
    {
      path: "/teacher/login",
      element: <><Nav/><TeacherLogin/></>,
    },
    {
      path: "/teacher/home",
      element: <><TeacherNav/><TeacherHome/></>,
    },
    {
      path: "/teacher/create",
      element: <><TeacherNav/><TeacherCreate/></>,
    },
    {
      path: "/student/login",
      element: <><StudentNav/><StudentLogin/></>,
    },
    {
      path: "/student/home",
      element: <><StudentNav/><StudentHome/></>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
