import React, { useEffect, useState } from "react";
import "./dataTable.css";
import Img1 from "../assets/download (1).jpeg";
import Img2 from "../assets/image(1).png";
import Img3 from "../assets/OIP.jpeg";
import Img4 from "../assets/OIP (6).jpeg";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import FindDate from "./FindDate";
import Cookies from "js-cookie";
import "../Account_Pages/Recentreply.css";
import { jwtDecode } from "jwt-decode";

export const DataTable = ({ searchh }) => {
  const [languges, setLanguges] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const search = searchh;

  let email, username;
  const jwt_token = Cookies.get("token");
  if (jwt_token) {
    const decode_payload = jwtDecode(jwt_token);
    email = decode_payload.email;
    username = decode_payload.username;
  }

  // Get current date and time
  let showdate = new Date();
  let displayTodaysDate =
    showdate.getDate() +
    "/" +
    (showdate.getMonth() + 1) +
    "/" +
    showdate.getFullYear();
  let displayTime =
    showdate.getHours() +
    ":" +
    showdate.getMinutes() +
    ":" +
    showdate.getSeconds();
  const [currentDate, currentMonth, currentYear] = displayTodaysDate.split("/");
  const [currentHours, currentMinutes, currentsec] = displayTime.split(":");

  let arr1 = [Number(currentDate), Number(currentMonth), Number(currentYear)];
  let arr3 = [Number(currentHours), Number(currentMinutes)];

  // Fetch posts
  useEffect(() => {
    axios
      .get("http://localhost:2000/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Fetch languages
  useEffect(() => {
    axios
      .get("http://localhost:2000/getLanguages")
      .then((res) => {
        setLanguges(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to get level count
  async function find_level_count(lang_id) {
    try {
      const res = await axios.get(
        `http://localhost:2000/getLevelCount/${lang_id}`
      );
      return res.data.length;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  // Process and prepare data
  const prepareData = async () => {
    let Datas_ = [];

    for (const value of languges) {
      let lang_count = 0;
      let lang_lastposts = [];
      let lang_lastpostDate;
      let lang_lastpostTime;
      let fetchDate, fetchMonth, fetchYear;
      let Hours, Minutes;
      let a;

      // Process posts for current language
      posts?.forEach((val) => {
        if (val?.language === value?.url) {
          lang_count++;
          
          if (val?.date && typeof val.date === 'string') {
            [fetchDate, fetchMonth, fetchYear] = val.date.split("/");
          }
          [Hours, Minutes] = val.time.split(":");

          lang_lastpostDate = [
            Number(fetchDate),
            Number(fetchMonth),
            Number(fetchYear),
          ];
          lang_lastpostTime = [Number(Hours), Number(Minutes)];
          
          lang_lastposts = [
            val.username,
            val.email,
            lang_lastpostDate,
            lang_lastpostTime,
            val.id,
            val.language,
            val.level,
          ];

          // Calculate time difference
          a = FindDate({
            arr2: lang_lastpostDate,
            arr4: lang_lastpostTime,
          });
        }
      });

      // Wait for level count
      const level = await find_level_count(value.id);

      Datas_.push({
        skill: value.name,
        level: level,
        posts: lang_count,
        lastpost_time: a,
        lastpost_name: lang_lastposts[0],
        lastpost_email: lang_lastposts[1],
        lastpost_id: lang_lastposts[4],
        lastpost_lang: lang_lastposts[5],
        lastpost_level: lang_lastposts[6],
        url: value.url,
      });
    }

    return Datas_;
  };

  // Update table data when languages or posts change
  useEffect(() => {
    if (languges.length > 0 && posts.length > 0) {
      prepareData().then((data) => {
        setTableData(data);
        console.log("Final Data_ :", data);
      });
    }
  }, [languges, posts]);

  return (
    <div className="maintable">
      <table className="bodytable">
        <thead>
          <tr>
            <th className="pskillshead">PS Skills</th>
            <th className="levpostshead">Levels</th>
            <th className="levpostshead">Posts</th>
            <th className="pskillslastpost">Last Post</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, i) => (
            <tr key={i}>
              <td className="pskills">
                <Link to={`/${item?.url}`}>{item?.skill}</Link>
              </td>
              <td className="levposts">{item?.level}</td>
              <td className="levposts">{item?.posts}</td>
              <td className="lastpost">
                {item.lastpost_time !== "NaNYears ago" ? (
                  <ul className="lapost-list">
                    <li className="lapost-date">
                      <NavLink
                        to={`/${item?.lastpost_lang}/${item?.lastpost_level}/discussion?discussionId=${item?.lastpost_id}`}
                        style={{ textDecoration: "none", color: " #00357d" }}
                      >
                        {item?.lastpost_time}
                      </NavLink>
                    </li>
                    <li className="lapost-author">
                      <NavLink
                        to={`/Account?name=${item?.lastpost_email}`}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        <img src={Img1} alt="abc" />
                        <span className="non-image">
                          {item.lastpost_name}
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li className="notposted">{"No posts"}</li>
                    <li className="notposted">{"available !"}</li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};