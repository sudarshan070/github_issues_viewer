import React from "react";
import { Pagination } from "semantic-ui-react";

function Paginate({ activePage, setActivePage, issues }) {
  const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
  };
  return (
    <>
      {issues > 10 ? (
        <div className="pagination-container">
          <Pagination
            boundaryRange={1}
            size="tiny"
            siblingRange={1}
            totalPages={Math.ceil(issues / 10)}
            onPageChange={handlePageChange}
            activePage={activePage}
            firstItem={null}
            prevItem={null}
            nextItem={null}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default Paginate;
