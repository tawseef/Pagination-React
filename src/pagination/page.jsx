// eslint-disable-next-line react-hooks/rules-of-hooks
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Pagination() {
  const [fullData, setFullData] = useState([]);
  const [dispData, setDispData] = useState([]);
  const [lastIndex, setLastIndex] = useState(10);
  const [firstIndex, setFirstIndex] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setFullData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const getNextPage = () => {
    setPageNum((prev) => prev + 1);
    setFirstIndex((prev) => prev + 10);
    setLastIndex((prev) => prev + 10);
  };

  const getPrevPage = () => {
    setPageNum((prev) => prev - 1);
    setFirstIndex((prev) => prev - 10);
    setLastIndex((prev) => prev - 10);
  };

  const filterData = fullData.filter((ele, ind) => {
    if (ind < lastIndex && ind >= firstIndex) {
      return ele;
    }
  });

  useEffect(() => {
    setDispData(filterData);
  }, [dispData, firstIndex, lastIndex]);

  return (
    <>
      <h1>Employee Data Table</h1>
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {dispData.map((ele) => {
          return (
            <tr>
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.role}</td>
            </tr>
          );
        })}
      </table>
      <button
        onClick={() => {
          if (firstIndex > 0) getPrevPage();
        }}
      >
        Previous
      </button>
      <strong> {pageNum} </strong>
      <button
        onClick={() => {
          if (pageNum < Math.round(fullData.length / 10)) getNextPage();
        }}
      >
        Next
      </button>
    </>
  );
}
