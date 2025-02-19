import LocalPagination from "../types/LocalPagination";
import Button from "./Button";
import ButtonFill from "./ButtonFill";
import Row from "./Row";

interface PaginationNavProps<T> {
    pagination: LocalPagination<T>;
}
function PaginationNav<T>(props: PaginationNavProps<T>) {
    return (
        <Row
            justifyContent="center"
            style={{ flexWrap: "wrap", gap: 10, marginTop: 20 }}
        >
            {props.pagination.pageCount > 1
                ? [...Array(props.pagination.pageCount).keys()].map((p) =>
                      props.pagination.currentPage === p ? (
                          <ButtonFill
                              key={p}
                              onClick={() => props.pagination.setCurrentPage(p)}
                          >
                              {p + 1}
                          </ButtonFill>
                      ) : (
                          <Button
                              key={p}
                              onClick={() => props.pagination.setCurrentPage(p)}
                          >
                              {p + 1}
                          </Button>
                      )
                  )
                : ""}
        </Row>
    );
}

export default PaginationNav;
