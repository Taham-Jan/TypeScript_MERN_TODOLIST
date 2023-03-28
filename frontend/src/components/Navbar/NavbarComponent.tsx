import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../../models/userModel";
import NavbarLoggedInView from "./NavbarLoggedInView";
import NavbarLoggedOutView from "./NavbarLoggedOutView";
import { Link } from "react-router-dom";
import styles from '../../styles/Navbar.module.css';



interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavbarComponent = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    return (

        <Navbar expand="sm" variant="" sticky="top"   className={styles.parentNavbar}>
            <Container>
                <Navbar.Toggle aria-controls="main-navbar" className={styles.Hamburger} />
                <Navbar.Collapse id="main-navbar">
                   
                <Nav.Item className={styles.Links}>

                        <Nav.Link as={Link} to="/" className={styles.singleLink} >HOME</Nav.Link>
                        <Nav.Link as={Link} to="privacy" className= {styles.singleLink}>PRIVACY</Nav.Link>
                     
                        </Nav.Item>

                      <Nav.Item className={styles.rightButtons}>
                        {
                             
                            loggedInUser
                            
                                ? <NavbarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                                : <NavbarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                                
                        }
                  </Nav.Item>
                

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default NavbarComponent;