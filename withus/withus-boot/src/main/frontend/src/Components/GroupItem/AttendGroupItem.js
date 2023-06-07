import React, { useState, useEffect } from "react";
import '../../Css/AttendGroupItem.css';
import boxiconImg from '../../img/boxicon.avif';
import axios from 'axios';
import Modal from '../Modal/Modals.js';
import AttendGroupOrder from "../Order/AttendGroupOrder.js";

function AttendGroupItem() {

  const [attendgroupList , SetGroupList] = useState([]);


  useEffect(()=> {
      axios.get('/attendgroupList').then((res)=>{
        SetGroupList(res.data)
        console.log(res)
      })
      .catch(error => console.log(error))
    },[])

    const [groupBuymodalOpen, setgroupBuyModalOpen] = useState(false);

    const opengroupBuyModal = () => {
      setgroupBuyModalOpen(true);
    };
    const closegroupBuyModal = () => {
      setgroupBuyModalOpen(false);
    };

      
  return (
    <div>
      <div className="line2"></div>
      <div className="groupBuy-header">
        <div className="groupBuy-header-content1">구호물품 공동기부하기</div>
        <div className="groupBuy-header-content2">팀 전체보기</div>
      </div>
      <div className="groupBox">      
        {
          attendgroupList.map(function(a,i){
            return(
                <div className="groupBox2">
                  <img class="boxicon" src={boxiconImg}></img>
                  <div className="groupitem-username">{attendgroupList[i].user_name}</div>
                  <div className="groupitem-count">({attendgroupList[i].totalGroupItem_count})</div>  
                  <div className="groupBuy-btnBox"><button className="groupBuyBtn" onClick={opengroupBuyModal}>주문참여</button></div>
                  <Modal open={groupBuymodalOpen} close={closegroupBuyModal} header="주문자 정보">
                    <AttendGroupOrder /> 
                  </Modal>
                </div>
              )          
          })
        }
      </div>
    </div>
  );
   
}


export default AttendGroupItem;