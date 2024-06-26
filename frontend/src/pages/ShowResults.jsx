import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import Pagination from "../components/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown, TextInput } from "flowbite-react";
import { Question } from "../components/Question";
import { AiOutlineSearch } from "react-icons/ai";
import { setSearchQuery } from "../app/Search/SearchSlice";
import { setPage, setSort, setActiveTab } from "../app/Sort/SortSlice";

export default function ShowBlogs() {
  const [obj, setObj] = useState({});
  // const [page, setPage] = useState(1);
  // const [sort, setSort] = useState("");
  //  const [activeTab, setActiveTab] = useState("Blogs");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchQuery);
  const sort = useSelector((state) => state.sort.sort);
  const page = useSelector((state) => state.sort.page);
  const activeTab = useSelector((state) => state.sort.activeTab);

  // useEffect(() =>{
  //   setActiveTab(activetb);
  // })
  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    dispatch(setSearchQuery(inputValue));
    console.log("search", search);
  };
  const getAllResults = async () => {
    try {
      let url = `/api/show${activeTab}?page=${page}&sort=${sort}`;
      if (search) {
        url += `&search=${search}`;
      }
      const res = await fetch(url);
      const { data } = await res.json();
      console.log("show", data);
      if (!res.ok) {
        console.log(data.message);
      }
      setObj(data || {});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllResults(); // Fetch data again with updated search query
    window.scrollTo(0, 0);
  }, [activeTab, page, search, sort]);

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
    console.log("working?", activeTab);
    dispatch(setPage(1)); // Reset page number when tab changes
  };

  return (
    <>
      <div className="w-[60%] my-10 mx-4 ">
        <TextInput
          type="text"
          placeholder="Search.."
          rightIcon={AiOutlineSearch}
          className="lg:flex w-[60%] lg:w-[120%] md:w-[100%] sm:w-[60%]"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="w-full flex items-center mt-10">
        <button
          type="button"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 mx-4"
          onClick={() => {
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
          {console.log("srch change", search)}
          {obj && search ? (
            <span className="font-bold text-3xl">Results for "{search}"</span>
          ) : activeTab === "Questions" ? (
            <span className="font-bold text-3xl">All Questions</span>
          ) : (
            <span className="font-bold text-3xl">All Blogs</span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-wrap mx-4 rounded shadow my-10 gap-4 h-20 sm:h-10">
          <button
            onClick={() => handleTabChange("Blogs")}
            className={`w-fit h-fit flex justify-center font-medium px-5 py-2 rounded-full border ${
              activeTab === "Blogs"
                ? "bg-slate-600 text-white"
                : "bg-white text-gray-800 border-gray-200 hover:bg-gray-200"
            }`}
          >
            Blogs
          </button>

          <button
            onClick={() => handleTabChange("Questions")}
            className={`w-fit h-fit flex justify-center rounded-full font-medium px-5 py-2 border ${
              activeTab === "Questions"
                ? "bg-slate-600 text-white"
                : "bg-white text-gray-800 border-gray-200 hover:bg-gray-200"
            }`}
          >
            Questions
          </button>
          <div className=" flex md:mx-10 w-fit h-fit">
            <Dropdown
              className="flex"
              label="Sort By"
              placement="bottom"
              color="gray"
            >
              <Dropdown.Item
                onClick={() => dispatch(setSort(""))}
                className={sort === "" ? "bg-blue-500 text-white" : ""}
              >
                Recent
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => dispatch(setSort("oldest"))}
                className={sort === "oldest" ? "bg-blue-500 text-white" : ""}
              >
                Oldest
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => dispatch(setSort("most_liked"))}
                className={
                  sort === "most_liked" ? "bg-blue-500 text-white" : ""
                }
              >
                Most Liked
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <div className="w-auto mx-8">
          {obj === null ? (
            <>
              <div className="my-10 ml-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Loading
                </h5>
              </div>
            </>
          ) : activeTab === "Questions" ? (
            obj.questions && obj.questions.length > 0 ? (
              <>
                <Question data={obj.questions} />
                <Pagination
                  page={page}
                  limit={obj.limit || 0}
                  total={obj.total || 0}
                  setPage={(page) => dispatch(setPage(page))}
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
                    : "No questions available."}
                </p>
              </div>
            )
          ) : obj.blog && obj.blog.length > 0 ? (
            <>
              <Post blogs={obj.blog} />
              <Pagination
                page={page}
                limit={obj.limit || 0}
                total={obj.total || 0}
                setPage={(page) => dispatch(setPage(page))}
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
      </div>
    </>
  );
}
