import styles from "../styles/Page.module.css";

interface PageProps {
    children?: React.ReactNode;
    width: number;
}

function Page(props: PageProps) {
    return (
        <div className={styles.page} style={{ width: props.width }}>
            {props.children}
        </div>
    );
}

export default Page;
