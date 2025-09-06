import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Icon from "../Button/Icon";

const Table = ({
  columns,
  data,
  status,
  onDelete,
  onEdit,
  databstarget,
  model,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-orange-300 text-white">
          <tr>
            <th scope="col" className="px-4 py-2 text-left border-b">
              S.no
            </th>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 py-2 text-left border-b"
              >
                {column.label}
              </th>
            ))}
            {(onDelete || onEdit) && (
              <th scope="col" className="px-4 py-2 text-left border-b">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {status === "loading" && (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="px-4 py-2 text-center border-b"
              >
                <Skeleton count={10} height={70} />
              </td>
            </tr>
          )}
          {status === "failed" && (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="px-4 py-2 text-center border-b"
              >
                <p className="font-bold">{"Data not found"}</p>
              </td>
            </tr>
          )}
          {status === "succeeded" &&
            data.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-left border-b">{index + 1}</td>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-left border-b"
                  >
                    {column.accessor
                      ? column.accessor === "serialNumber"
                        ? index + 1
                        : column.formatter
                        ? column.formatter(item[column.accessor])
                        : item[column.accessor]
                      : ""}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-2 text-left border-b">
                    <div className="flex space-x-2">
                      {onEdit && (
                        <div
                          className="cursor-pointer"
                          onClick={() => onEdit(item._id)}
                          data-bs-toggle={model}
                          data-bs-target={databstarget}
                        >
                         
                         <Icon
                            children={"pencil-square"}
                            className="cursor-pointer text-orange-300 text-xl"
                            size="5"
                          />
                        </div>
                      )}
                      {onDelete && (
                        <div
                          className="cursor-pointer"
                          onClick={() => onDelete(item._id)}
                        >
                          <Icon
                            children={"trash"}
                            className="cursor-pointer text-red-500 text-xl"

                            size="5"
                          />
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
