import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as todolistApi from '../api/todolist_api';
import LoggedOutView from '../components/LoggedOutView';
import LoginModal from '../components/LoginModal';
import NavbarComponent from '../components/Navbar/NavbarComponent';
import SignUpModal from '../components/SignUpModal';
import Spinner from '../components/Spinner';
import Todolist from '../components/Todolist';
import { User } from '../models/userModel';
import styles from '../styles/TodolistStyle.module.css';
import NotFoundPage from './NotFoundPage';
import PrivacyPage from './PrivacyPage';
import TodoListPage from './TodoListPage';
import useLocalStorage from 'react-use-localstorage';

import datetimeB from '../assets/datetimeB.svg';
import datetimeW from '../assets/datetimeW.svg';
import moon from '../assets/moon.svg';
import priorityB from '../assets/priorityB.svg';
import priorityW from '../assets/priorityW.svg';
import sun from '../assets/sun.svg';
import taskB from '../assets/taskB.svg';
import taskW from '../assets/taskW.svg';
import { FloatButton } from 'antd'


export const Homescreen = () => {

  // THEME
  const todoCover = require('../assets/TODO-LIST.jpg');
  const todoCoverDark = require('../assets/TODO-LIST-D.jpg');
  const [themeLogo, setThemeLogo] = useLocalStorage("themeLogo", moon);
  const [taskLogo, setTaskLogo] = useLocalStorage("taskLogo", taskW);
  const [priorityLogo, setpriorityLogo] = useLocalStorage('priorityLogo', priorityW);
  const [dateTimeLogo, setdateTimeLogo] = useLocalStorage('dateTimeLogo', datetimeW);
  const [todoHeader, setTodoHeader] = useLocalStorage("todoHeader", todoCover);
  const [theme, setTheme] = useLocalStorage("theme", "light-theme");

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    setThemeLogo(newTheme === "dark-theme" ? sun : moon);
    setTodoHeader(newTheme === "dark-theme" ? todoCoverDark : todoCover);
    setTaskLogo(newTheme === "dark-theme" ? taskB : taskW);
    setpriorityLogo(newTheme === "dark-theme" ? priorityB : priorityW);
    setdateTimeLogo(newTheme === "dark-theme" ? datetimeB : datetimeW);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  const [loggedInUser, SetloggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await todolistApi.fetchLoggedInUser();
        SetloggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, []);
  return (
    <>
    
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
               
          <div className={styles.letter}>

            <div className={styles.paper}>
              <div className={styles.papercontent}>
                <div className={styles.mainContent}>

                  {
                    showSignUpModal && <SignUpModal dialogClose={() => setShowSignUpModal(false)} onSignUpSuccessfull={(user) => { SetloggedInUser(user); setShowSignUpModal(false); }} />
                  }
                  {
                    showLoginModal && <LoginModal dialogClose={() => setShowLoginModal(false)} onLoginSuccessfull={(user) => { SetloggedInUser(user); setShowLoginModal(false); }} />
                  }
                  <div>

                    <img className={styles.letterimg} src={todoHeader} alt="ICON" />
                    <NavbarComponent
                      loggedInUser={loggedInUser}
                      onLoginClicked={() => setShowLoginModal(true)}
                      onLogoutSuccessful={() => SetloggedInUser(null)}
                      onSignUpClicked={() => setShowSignUpModal(true)}
                    />

                    <img src={themeLogo} id='moonlogo' alt=' ' onClick={() => toggleTheme()} />
                    <Routes>
                      <Route path="/" element={<TodoListPage loggedInUser={loggedInUser} dateTimeLogo={dateTimeLogo} priorityLogo={priorityLogo} taskLogo={taskLogo} />} />
                      <Route path="privacy" element={<PrivacyPage />} />
                      <Route path="/*" element={<NotFoundPage />} />
                    </Routes>

                  </div>


                </div>
                <br></br>
              </div>
            </div>
          </div>

        </Suspense>
      </BrowserRouter>
    </>
  )
}

