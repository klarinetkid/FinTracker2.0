import styles from "../styles/NotFoundPage.module.css";
import Page from "./Page";

function NotFoundPage() {
    return (
        <Page><h1 className={styles.notfound}>404</h1>
        </Page>
    );
}

export default NotFoundPage;
