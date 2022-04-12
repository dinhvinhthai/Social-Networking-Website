import React, { useContext, useState } from "react";
import Nav from "../../component/nav/Nav";
import {
  RiPagesLine,
  RiCalendarEventLine,
  RiMessengerLine,
} from "react-icons/ri";
import { ImNewspaper } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import "./SearchResults.scss";
import { SearchResultContext } from "../../context/SearchContext";
import SearchResultTag from "./button/btnSendRequest";
import { Link } from "react-router-dom";

function SearchResults() {
  const [searchResult, setSearchResult] = useContext(SearchResultContext);
  const userIdCurrent = JSON.parse(localStorage.getItem("userInfo"))._id;
  let usertest;
  return (
    <div>
      <Nav></Nav>
      <div className="Search-Results">
        <div className="Filters">
          <p>Kết quả tìm kiếm</p>
          <span>Bộ lọc</span>
          <div className="items">
            <div className="icon">
              <ImNewspaper />
            </div>
            <span>Tất cả</span>
          </div>
          <div className="items">
            <div className="icon">
              <BiNews />
            </div>
            <span>Bài viết</span>
          </div>
          <div className="items">
            <div className="icon">
              <FaUsers />
            </div>
            <span>Mọi người</span>
          </div>
          <div className="items">
            <div className="icon">
              <RiPagesLine />
            </div>
            <span>Trang</span>
          </div>
          <div className="items">
            <div className="icon">
              <RiCalendarEventLine />
            </div>
            <span>Tuyển dụng</span>
          </div>
        </div>

        <div className="Results">
          <div className="Peoples">
            <p>Mọi người</p>
            {searchResult?.data?.map((people) => {
              return (
                <div className="People_tag" key={people._id}>
                  <div className="img-info">
                    {people?.photos?.avatar?.length !== 0? (
                        <img
                      src={`http://localhost:5000/images/${
                        people?.photos?.avatar[
                          people?.photos?.avatar?.length - 1
                        ]
                      }`}
                      className="avt"
                    ></img>
                    ) : (
                        <img
                          className="avt"
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
                    )}
                  
                    <div className="people_info">
                      <Link to={`/profile/${people._id}`} className="link">
                        <p>{people.userName}</p>
                      </Link>
                      {people.friends.includes(userIdCurrent) ? (
                        <span>bạn bè</span>
                      ) : (
                        ""
                      )}
                      <span>
                        {people.friends
                          ? people.friends.length
                          : "0 người theo dõi"}{" "}
                        người theo dõi
                      </span>
                      {/* <span> {people.address ? people.address.city : ""}</span> */}
                    </div>
                  </div>
                  {people._id === userIdCurrent ? (
                    ""
                  ) : people.friends.includes(userIdCurrent) ? (
                    <button className="icon">
                      <RiMessengerLine></RiMessengerLine>
                    </button>
                  ) : people.friendsRequest.includes(userIdCurrent) ? (
                    <button type="button" className="icon2">
                      <FaUserPlus />
                    </button>
                  ) : (
                    <SearchResultTag id={people._id}></SearchResultTag>
                  )}
                </div>
              );
            })}
            <button>Xem tất cả</button>
          </div>

          {/* <div className="Post">
            <p>Bài viết</p>
            <button>Xem tất cả</button>
          </div>

          <div className="Page">
            <p>Trang</p>
            <button>Xem tất cả</button>
          </div>

          <div className="Event">
            <p>Thông tin việc làm</p>
            <button>Xem tất cả</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
