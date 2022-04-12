import React from "react";
import { useEffect, useState,useContext } from "react";
import { AiOutlineDelete, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiSearch, BiUserPlus } from "react-icons/bi";
import { MdOutlineGroups } from "react-icons/md";
import "./SettingConversation.scss";
import PartnerInfo from "../partnerInfo/PartnerInfo";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
function SettingConversation({myConversation}) {
  const [me] = useContext(UserContext);
  const [anotherUser, setAnotherUser] = useState(""); 
    // xóa hội thoại
  const deleteConver = () => {
    axios
      .delete(`http://localhost:5000/api/conversations/delete/${myConversation?._id}`,
    {
       headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
            window.location.reload();
     })
      .catch((err) => {
        console.log(err.response);
      });
  }
  console.log(anotherUser);
  //add another user to conversation

  return (
     <div className="setting_conversation">
          <div className="partner_info">
              {myConversation?.members?.length > 2 ? (
            <div className="group_info">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
              className="mess_cent_avt"
              
            ></img>
            <div className="members">
            <p>{myConversation.conversationName}</p>
            <span>{ myConversation.members.length} thành viên</span>
              </div>
            </div>
          ) : (
            <div>
                {myConversation?.members?.map((partners, index) => (
                  partners === me?._id ? "" : (
                    <div key={index}>
                    <PartnerInfo partners={partners}></PartnerInfo>
                    </div>
                   
                )))}            
            </div>
          )}
          </div>
        <div className="add">
              <BiUserPlus></BiUserPlus>
              <span>Thêm bạn vào hội thoại này</span>
          </div>
          
        <div className="add">
          <AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>
              <span>Tạo nhóm với người này</span>
        </div>
        <div className="add">
         <MdOutlineGroups></MdOutlineGroups>
              <span>Thêm vào nhóm</span>
          </div>
          <div className="add"
          onClick={() =>deleteConver()}>
          <AiOutlineDelete></AiOutlineDelete>
              <span>Xóa lịch sử trò chuyện</span>
          </div>
    </div>
  )
}

export default SettingConversation