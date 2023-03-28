import styles from '../styles/NotFoundPage.module.css'
const NotFoundPage = () => {
    return (
    <div id={styles.MainContainer}>
        <div className={styles.MainContainer}>
            <div className={styles.TextContent}>
                <h3>Oops! Page not found</h3>
                <h1><span>4</span><span>0</span><span>4</span></h1>
            </div>
            <h2>we are sorry, but the page you requested was not found</h2>
        </div>
    </div>
    );
}

export default NotFoundPage;