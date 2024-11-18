import React from "react";
import { Table } from "react-bootstrap";
import ButtonAction from "../Global/ButtonAction";

const TableExpense = ({ data, HandleEdit, HandleDelete }) => {
  return (
    <>
      <div className="overflow-x-auto m-10">
        <Table
          striped
          bordered
          hover
          responsive="sm"
          className="min-w-full bg-white border border-gray-300"
        >
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border text-center">Id</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Details</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center" id={item.id}>
                  {index + 1}
                </td>
                <td className="px-4 py-2 border">{item.category}</td>
                <td className="px-4 py-2 border">{item.date}</td>
                <td className="px-4 py-2 border">${item.price.toFixed(2)}</td>
                <td
                  className="px-4 py-2 border break-words"
                  style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                >
                  {item.details}
                </td>
                <td className="px-4 py-2 border">
                  <ButtonAction
                    Variant="warning"
                    Handle={() => HandleEdit(item.id)}
                    Text="Edit"
                  />
                  <ButtonAction
                    Variant="danger"
                    Handle={() => HandleDelete(item.id)}
                    Text="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TableExpense;
