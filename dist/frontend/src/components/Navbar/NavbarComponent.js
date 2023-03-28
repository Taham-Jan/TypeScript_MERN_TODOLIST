"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_bootstrap_1 = require("react-bootstrap");
const NavbarLoggedInView_1 = __importDefault(require("./NavbarLoggedInView"));
const NavbarLoggedOutView_1 = __importDefault(require("./NavbarLoggedOutView"));
const react_router_dom_1 = require("react-router-dom");
const Navbar_module_css_1 = __importDefault(require("../../styles/Navbar.module.css"));
const NavbarComponent = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }) => {
    return (<react_bootstrap_1.Navbar expand="sm" variant="" sticky="top" className={Navbar_module_css_1.default.parentNavbar}>
            <react_bootstrap_1.Container>
                <react_bootstrap_1.Navbar.Toggle aria-controls="main-navbar" className={Navbar_module_css_1.default.Hamburger}/>
                <react_bootstrap_1.Navbar.Collapse id="main-navbar">
                   
                <react_bootstrap_1.Nav.Item className={Navbar_module_css_1.default.Links}>

                        <react_bootstrap_1.Nav.Link as={react_router_dom_1.Link} to="/" className={Navbar_module_css_1.default.singleLink}>HOME</react_bootstrap_1.Nav.Link>
                        <react_bootstrap_1.Nav.Link as={react_router_dom_1.Link} to="privacy" className={Navbar_module_css_1.default.singleLink}>PRIVACY</react_bootstrap_1.Nav.Link>
                     
                        </react_bootstrap_1.Nav.Item>

                      <react_bootstrap_1.Nav.Item className={Navbar_module_css_1.default.rightButtons}>
                        {loggedInUser
            ? <NavbarLoggedInView_1.default user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
            : <NavbarLoggedOutView_1.default onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>}
                  </react_bootstrap_1.Nav.Item>
                

                </react_bootstrap_1.Navbar.Collapse>
            </react_bootstrap_1.Container>
        </react_bootstrap_1.Navbar>);
};
exports.default = NavbarComponent;
//# sourceMappingURL=NavbarComponent.js.map