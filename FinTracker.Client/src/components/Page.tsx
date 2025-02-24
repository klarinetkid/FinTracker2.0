import styles from "../styles/Page.module.css";

interface PageProps {
    children?: React.ReactNode;
}
function Page(props: PageProps) {
    return <div className={styles.page}>{props.children}</div>;
}

export default Page;
