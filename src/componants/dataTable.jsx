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
  
    let email,username;

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
      .get("http://localhost:2000/getallposts")
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
        `http://localhost:2000/getLevelForLanguage/`,{
          params:{
            lang_id:lang_id
          }
        }
      );
      return res.data.length;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  // Function to get username 
  async function get_user(email) {
    try {
      
      if(email) {
        const res = await axios.post(
          `http://localhost:2000/profile_info`,{
            email:email
          }
        );
        return res.data[0].username;
      }
      return '';
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
      let Hours, Minutes;
      let day, month, year;
      let a;

      // Process posts for current language
      posts?.forEach((val) => {
        if (val?.language_id === value?.id) {
          lang_count++;
          
          const dateObj = new Date(val.date);
         
          day = dateObj.getDate();             // Day of the month (1-31)
          month = dateObj.getMonth() + 1;     // Month (0-11, so add 1)
          year = dateObj.getFullYear();       // Full year (e.g., 2023)
          

          [Hours, Minutes] = val?.time?.split(":");

          lang_lastpostDate = [
            Number(day),
            Number(month),
            Number(year),
          ];
          lang_lastpostTime = [Number(Hours), Number(Minutes)];
          
          lang_lastposts = [
            val.id,
            val.email,  // last post user -> email
            val.language_id,
            val.level_id,
            lang_lastpostDate,
            lang_lastpostTime,
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
      let user_name = await get_user(lang_lastposts[1]);
      // console.lo
      Datas_.push({
        id:value.id,
        skill: value.name,
        level: level,
        posts: lang_count,
        lastpost_time: a,
        lastpost_id: lang_lastposts[0],
        lastpost_username: user_name,
        lastpost_email: lang_lastposts[1],
        lang_id: lang_lastposts[2],
        level_id: lang_lastposts[3],
        url: value.url,
      });
    }
    console.log(Datas_)

    return Datas_;
  };

  // Update table data when languages or posts change
  
  useEffect(() => {
    if (languges.length > 0) {
      prepareData().then((data) => {
        setTableData(data);
        console.log("Final Data_ :", data);
      });
    }
  }, [languges, posts]);

  console.log("tableData :", tableData);
  
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
            
          {tableData.filter((item,i)=>{
              console.log("item :",item)
              return !search || search.trim() === '' ?
              true :
              item?.skill?.toLowerCase().includes(search.toLowerCase());


              }).map((item, i) => (
           
           <tr key={i}>
              <td className="pskills">
                <Link to={`/${item?.id}`}>{item?.skill}</Link>
              </td>
              <td className="levposts">{item?.level}</td>
              <td className="levposts">{item?.posts}</td>
              <td className="lastpost">
                {item.lastpost_time !== "NaNYears ago" ? (
                  <ul className="lapost-list">
                    <li className="lapost-date">
                      <NavLink
                        to={`/${item?.lang_id}/${item?.level_id}/discussion?discussionId=${item?.lastpost_id}`}
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
                          {item.lastpost_username}
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