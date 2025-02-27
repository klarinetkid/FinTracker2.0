import { useEffect, useState } from "react";
import AppSettings from "../../appsettings.json";
import Page from "../../components/Page";
import StatusIndicator from "../../components/StatusIndicator";
import Table from "../../components/Table";
import MetadataService from "../../services/MetadataService";
import styles from "../../styles/AboutPage.module.css";

type AboutInfoType = Awaited<ReturnType<typeof MetadataService.getAboutInfo>>;

function AboutPage() {
    const [info, setInfo] = useState<AboutInfoType>();

    useEffect(() => {
        MetadataService.getAboutInfo().then(setInfo);
    }, []);

    return (
        <Page className={styles.page}>
            <h1>About</h1>

            {info ? (
                <Table className={styles.table}>
                    <tbody>
                        <tr>
                            <td>Client version</td>
                            <td>{AppSettings.appVersion}</td>
                        </tr>
                        <tr>
                            <td>API version</td>
                            <td>{info.apiVersion}</td>
                        </tr>
                        <tr>
                            <td>Budgets</td>
                            <td>{info.counts.budgets.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Categories</td>
                            <td>{info.counts.categories.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Import Formats</td>
                            <td>
                                {info.counts.importFormats.toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td>Memos</td>
                            <td>{info.counts.memos.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Transactions</td>
                            <td>{info.counts.transactions.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <StatusIndicator status="loading" />
            )}
        </Page>
    );
}

export default AboutPage;
