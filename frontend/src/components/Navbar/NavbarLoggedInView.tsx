import { User } from "../../models/userModel";
import * as ListApi from '../../api/todolist_api';
import { Navbar } from "react-bootstrap";
import btnstyles from '../../styles/Button.module.css';
import styles from '../../styles/Navbar.module.css';

interface NavbarLoggedInUserProps {
    user: User,
    onLogoutSuccessful: () => void,
}
const NavbarLoggedInView = ({ user, onLogoutSuccessful }: NavbarLoggedInUserProps) => {

    async function logout() {
        try {
            await ListApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    return (
       <>
            <Navbar.Text style={{color:"var(--secondary-color)"}}>
                Signed in as: {user.username}
            </Navbar.Text>
            <div className={btnstyles.DialogButtons} >
                <button  onClick={logout} className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`}>
                    {/* < style={{ fontSize: " 2.3rem", paddingRight: "15px" }} /> */}
                    LOGOUT
                    </button>
            </div>
            
            </>
    );
}

export default NavbarLoggedInView;