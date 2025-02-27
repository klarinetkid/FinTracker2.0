import styles from "../styles/Page.module.css";
import { classList } from "../utils/HtmlHelper";

interface PageProps {
    children?: React.ReactNode;
    className?: string;
}
function Page({ children, className }: PageProps) {
    return <div className={classList(styles.page, className)}>{children}</div>;
}

export default Page;
