import styles from "../styles/PaginationNav.module.css";
import LocalPagination from "../types/LocalPagination";
import PaginatedResponse from "../types/PaginatedResponse";
import Button from "./Button";
import ButtonFill from "./ButtonFill";

interface PaginationNavProps<T> {
    pagination: LocalPagination<T> | PaginatedResponse<T>;
    onNavigate: (page: number) => void;
}
function PaginationNav<T>(props: PaginationNavProps<T>) {
    const { pagination, onNavigate } = props;

    return (
        <div className={styles.pageNav}>
            {pagination.totalPages > 1
                ? [...Array(pagination.totalPages).keys()].map((p) =>
                      pagination.currentPage === p ? (
                          <ButtonFill key={p} onClick={() => onNavigate(p)}>
                              {p + 1}
                          </ButtonFill>
                      ) : (
                          <Button key={p} onClick={() => onNavigate(p)}>
                              {p + 1}
                          </Button>
                      )
                  )
                : ""}
        </div>
    );
}

export default PaginationNav;
