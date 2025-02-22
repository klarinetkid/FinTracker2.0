import LocalPagination from "../types/LocalPagination";
import PaginatedResponse from "../types/PaginatedResponse";
import Button from "./Button";
import ButtonFill from "./ButtonFill";
import Row from "./Row";

interface PaginationNavProps<T> {
    pagination: LocalPagination<T> | PaginatedResponse<T>;
    onNavigate: (page: number) => void;
}
function PaginationNav<T>(props: PaginationNavProps<T>) {
    return (
        <Row
            justifyContent="center"
            gap={10}
            style={{ flexWrap: "wrap", marginTop: 20 }}
        >
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
        </Row>
    );
}

export default PaginationNav;
