import styles from '../styles/NotFoundPage.module.css'

const LoggedOutView = () => {
    return (

        <div id={styles.MainContainer}>
            <div className={styles.MainContainer}>
                <div className={styles.TextContent}>
                    {/* <h2>please sign in</h2> */}
                    <h1><span>P</span><span>L</span><span>E</span><span>A</span><span>S</span><span>E</span> <span>S</span><span>I</span><span>G</span><span>N</span><span>-</span><span>I</span><span>N</span></h1>
                    
                    {/* <h1><span>sI</span><span>G</span><span>N</span><span>-</span><span>I</span><span>N</span></h1> */}
                </div>
                {/* <h2>If you have any questions or concerns about our Privacy Policy, please contact us at the email provided in our application.</h2> */}
            </div>
        </div>
        );
}

export default LoggedOutView;