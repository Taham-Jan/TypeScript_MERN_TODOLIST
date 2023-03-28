import btnstyles from '../../styles/Button.module.css';
import styles from '../../styles/Navbar.module.css';

interface NavbarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}
const NavbarLoggedOutView = ({ onLoginClicked, onSignUpClicked }: NavbarLoggedOutViewProps) => {
    return (<>
        <div className={btnstyles.DialogButtons} >
            <button onClick={onSignUpClicked} className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`}>
                {/* <AddNewTodo style={{ fontSize: " 2.3rem", paddingRight: "15px" }} /> */}
                SIGNUP
                </button>
                <button onClick={onLoginClicked} className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`}>
                {/* <AddNewTodo style={{ fontSize: " 2.3rem", paddingRight: "15px" }} /> */}
                LOGIN
                </button>
              

    </div>  </>);
}

export default NavbarLoggedOutView;