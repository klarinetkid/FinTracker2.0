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
    return (
        <div className={styles.pageNav}>
            {props.pagination.totalPages > 1
                ? [...Array(props.pagination.totalPages).keys()].map((p) =>
                      props.pagination.currentPage === p ? (
                          <ButtonFill
                              key={p}
                              onClick={() => props.onNavigate(p)}
                          >
                              {p + 1}
                          </ButtonFill>
                      ) : (
                          <Button key={p} onClick={() => props.onNavigate(p)}>
                              {p + 1}
                          </Button>
                      )
                  )
                : ""}
        </div>
    );
}

export default PaginationNav;
