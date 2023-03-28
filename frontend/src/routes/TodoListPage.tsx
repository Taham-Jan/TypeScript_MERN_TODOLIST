import LoggedOutView from "../components/LoggedOutView";
import Todolist from "../components/Todolist";
import { User } from "../models/userModel";

interface TodoListPageProps {
    loggedInUser:User|null,
  
	taskLogo: string,
	priorityLogo: string,
	dateTimeLogo: string,

}

const TodoListPage = ({loggedInUser,dateTimeLogo,priorityLogo,taskLogo}:TodoListPageProps) => {
    return (
    <>                  {
        loggedInUser ? <Todolist dateTimeLogo={dateTimeLogo} priorityLogo={priorityLogo} taskLogo={taskLogo} /> : <LoggedOutView />
    }
    </>
    );
}

export default TodoListPage;