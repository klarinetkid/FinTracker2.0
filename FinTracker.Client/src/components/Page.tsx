import style from "../styles/Page.module.css";

interface PageProps {
    children: React.ReactNode;
    width: number;
}

function Page(props: PageProps) {
    return (
        <div className={style.page} style={{ width: props.width }}>
            {props.children}
        </div>
    );
}

export default Page;
