import { useEffect, useMemo, useRef, useState } from "react";
import CustomTable from "./CustomTable";
import { useNavigate } from "react-router-dom";

export default function CustomDataTable({
  userList,
  loading,
  handlePerRowsChange,
  handlePageChange,
  totalRows,
  columns,
  baseRoute,
}: any) {
  const [dropdownOpen, setDropdownOpen] = useState<any>(false);
  const navigate=useNavigate()
  const memoizedColumns = useMemo(() => columns, [columns]);
  const dropdown = useRef<any>(null);
  const trigger = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="w-full">
      <CustomTable
        tableClass="styledTable"
        columns={memoizedColumns}
        userList={userList}
        loading={loading}
        totalRows={totalRows}
        handlePerRowsChange={handlePerRowsChange}
        handlePageChange={handlePageChange}
        onRowClicked={(data: any) => {
          if(baseRoute==""){
            return;
          }
          const path =
            baseRoute && data?.id
              ? `${baseRoute}/${data?.id}`
              : baseRoute
                ? `${baseRoute}`
                : data?.id
                  ? `${data?.id}`
                  : "";
          if (path) {
            navigate(path, { state: data, replace: true });
          }
        }}
      />
    </div>
  );
}
