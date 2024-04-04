import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";

export default function ShowBlogs() {
  const [obj, setObj] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const search = useSelector((state) => state.search.searchQuery);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        let url = `/api/showBlogs?page=${page}`;
        if (search) {
          url += `&search=${search}`;
        }
        const res = await fetch(url);
        const { data } = await res.json();
        if (!res.ok) {
          console.log(data.message);
        }
        setObj(data || {});
      } catch (err) {
        console.log(err);
      }
    };

    getAllBlogs();
  }, [page, search]);

  return (
    <>
      <div className="w-screen flex items-center mt-10">
        <button
          type="button"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 mx-4"
          onClick={(e) => {
            navigate("/");
          }}
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Go back</span>
        </button>
        <div className="flex justify-center mx-4 my-auto">
          {search ? (
            <span className="font-bold text-3xl">Results for "{search}"</span>
          ) : (
            <span className="font-bold text-3xl">All Blogs</span>
          )}
        </div>
      </div>
      <div className="flex w-full md:max-w-xl rounded shadow my-10 mx-8">
        {/* Your navigation links */}
      </div>
      <div className="flex flex-row">
        <div className="w-[150%] mx-8">
          {obj.blog && obj.blog.length > 0 ? (
            <>
              <Post blogs={obj.blog} />
              <Pagination
                page={page}
                limit={obj.limit || 0}
                total={obj.total || 0}
                setPage={(page) => setPage(page)}
              />
            </>
          ) : (
            <div className="my-10 ml-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                No Result Found!
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {search
                  ? "No results found. Try another search term."
                  : "No blogs available."}
              </p>
            </div>
          )}
        </div>
        <div className="w-1/2 mt-10 mx-10">
          <Dropdown label="Sort By" placement="bottom" color="gray">
            <Dropdown.Item>Recent</Dropdown.Item>
            <Dropdown.Item>Oldest</Dropdown.Item>
            <Dropdown.Item>All</Dropdown.Item>
            <Dropdown.Item>Most Liked</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </>
  );
}
