import DataTable from "react-data-table-component";
import LoaderTable from "../loader/LoaderTable";
import {
  nextPaginationIcon,
  previuosPaginationIcon,
} from "../../../assets/Icons";

const CustomTable = ({
  tableClass,
  columns,
  userList,
  loading,
  totalRows,
  handlePerRowsChange,
  onRowClicked,
  handlePageChange,

  ...rest
}: any) => {
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#006CAE",
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "white",
        fontSize: "12px",
      },
    },
    rows: {
      style: {
        fontFamily: "Poppins",
        margin: "5px 0px",
        fontSize: "12px",
      },
    },
    tableWrapper: {
      style: {
        borderRadius: "10px",
        overflow: "hidden",
      },
    },
  };

  return (
    <div
      className={`w-full  overflow-scroll  cursor-pointer customTable ${
        tableClass && tableClass
      }`}
    >
      <DataTable
        columns={columns}
        data={userList}
        pagination
        customStyles={customStyles}
        onRowClicked={onRowClicked}
        progressPending={loading}
        paginationServer
        progressComponent={<LoaderTable />}
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        persistTableHead={true}
        fixedHeaderScrollHeight="550px"
        noDataComponent={<div className="py-5 my-5">No Data Found</div>}
        highlightOnHover={true}
        fixedHeader
        selectableRowsHighlight
        paginationComponent={({ currentPage, rowsPerPage, onChangePage }) => (
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => onChangePage(currentPage - 1, totalRows)}
              disabled={currentPage === 1}
              className="font-normal text-xs gap-2 text-gray py-2 px-4 rounded inline-flex items-center"
            >
              {previuosPaginationIcon}
              Previous
            </button>

            <div className="flex gap-2 mx-4">
              {[...Array(Math.ceil(totalRows / rowsPerPage)).keys()].map(
                (pageNumber) => (
                  <button
                    key={pageNumber + 1}
                    onClick={() => onChangePage(pageNumber + 1, totalRows)}
                    className={`text-gray font-normal rounded items-center w-[25px]
                       h-[25px] flex justify-center ${
                         currentPage === pageNumber + 1
                           ? "bg-secondaryBlue text-white py-[7px] px-[5px] rounded-[3px]"
                           : "bg-transparent"
                       }`}
                  >
                    {pageNumber + 1}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => onChangePage(currentPage + 1, totalRows)}
              disabled={currentPage === Math.ceil(totalRows / rowsPerPage)}
              className="font-normal text-xs gap-2 text-gray py-2 px-4 rounded inline-flex items-center bg-[#F3F4F6]"
            >
              Next
              {nextPaginationIcon}
            </button>
          </div>
        )}
        {...rest}
      />
    </div>
  );
};

export default CustomTable;
