import {useParams } from "react-router-dom";
import styles from '../../Css/GroupItemDetail.module.css';
import '../../Css/GroupItem.css';
import '../../Css/Order.css'
import Modal from '../Modal/Modals.js';
import AttendGroupItem from './AttendGroupItem.js';
import Order from "../Order/Order.js";
import groupItem_image14 from '../../img/groupitem_image14.png';
import groupItem_image11 from '../../img/groupitem_image11.PNG';
import groupItem_image12 from '../../img/groupitem_image12.jpg';
import groupItem_image13 from '../../img/groupitem_image13.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

 function GroupItemDetail(props) {

    let { id } = useParams();
    const photos = [groupItem_image11, groupItem_image12, groupItem_image13, groupItem_image14]

    const [groupItem, setGroupItem] = useState("");

    useEffect(()=>{
        axios.get("/groupItem/detail/"+id).then((response)=>{
            if(response.data){
                console.log(response.data);
                setGroupItem(response.data);
            }else{
                alert("failed to");
            }
        });
    }, []);

    //가격 형식
    const convertPrice = (price) =>{
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }

    //수량
    const [count, setCount] = useState(1);
    const handleQuantity = (type) => {
      if(type === "plus"){
        setCount(count+1)
      }else{
        if(count === 1) return;
        setCount(count - 1);
      }
    }

    


    function insertBtn_click() {
      /*백엔드로 값 전달*/
          axios(
              {
              url: '/cart/insert',
              method: 'post',
              data: {
               data1: id, data2:sessionStorage.getItem("id"), data3:count
              } , 
              baseURL: 'http://localhost:8080',
              //withCredentials: true,
              }
          ).then(function (response) {
              console.log(response.data);
          });

          document.location.href = "/cart/"+sessionStorage.getItem("id");
      }
      
    

    //공동구매참여 모달창
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const openModal1 = () => {
    setModalOpen1(true);
  };
  const closeModal1 = () => {
    setModalOpen1(false);
  };

  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };

    return(
      <div>
        <div className={styles.groupItemDetailmain}>
            <div className={styles.product_img}>
              <img className="groupItem_image" src={photos[id-11]}></img>
            </div>
            <div className={styles.groupItemInfo}>
              <div className={styles.product_name}>{groupItem.groupItem_name}</div>
              <div className={styles.seller_store}>{groupItem.groupItem_detail}</div>
              <div className={styles.price}>
                {convertPrice(groupItem.groupItem_price*groupItem.groupItem_rate/100+"")}
                <span className={styles.unit}>원</span>
              </div>
              <div className={styles.groupItemtext}>{groupItem.groupItem_price}원에서 {groupItem.groupItem_rate}% 할인된 금액에 후원해보세요!</div>  
              <div className={styles.line}></div>
              <div className={styles.delivery}>
                <div className={styles.deliveryAddress1}>배송지</div>
                <div className={styles.deliveryAddress2}>초록우산 어린이재단</div>
              </div>

              <div className={styles.line}></div>
              <div className={styles.aloneBuy}>혼자 구호물품 기부하기</div>
              <div className={styles.amount}>
                <img
                  className={styles.minus}
                  src="/icon-minus-line.svg"
                  alt="minus"
                  onClick={() => handleQuantity("minus")}
                />
  
                <div className={styles.count}>
                  <span>{count}</span>
                </div>
  
                <img
                  className={styles.plus}
                  src="/icon-plus-line.svg"
                  alt="plus"
                  onClick={() => handleQuantity("plus")}
                />
              </div>   
              <div className={styles.sum}>  
                  <div className={styles.total}>총 수량</div> 
                  <div className={styles.total_count}>{count}개</div>
                  <div className={styles.total}>상품 총 금액</div> 
                  <div className={styles.total_price}>{convertPrice(groupItem.groupItem_price*groupItem.groupItem_rate/100*count)}</div>
                  <div className={styles.total_unit}>원</div>
              </div>  
              <div className={styles.btn}>
              <button className={styles.btn_buy}  onClick={openModal1}>주문하기</button>
                <Modal open={modalOpen1} close={closeModal1} header="주문자 정보">
                  <main> {props.children} </main>
                  <Order groupItem_id={groupItem.groupItem_id} price={groupItem.groupItem_price*groupItem.groupItem_rate/100*count} groupItem_count={count}/>      
                </Modal>

              <button className={styles.btn_cart} onClick={openModal2}>장바구니</button>
              <Modal open={modalOpen2} close={closeModal2} header="장바구니 추가">
                  <main> {props.children} </main>
                  장바구니에 추가하시겠습니까?   
                  <div id="order_bottom">
                <button id="order_btn" type="submit" 
                onClick={() => insertBtn_click()}
                >추가</button>
            </div>  
                </Modal>
            </div>
          </div>
        </div>
        <div className={styles.groupItemInfo2}>
          <AttendGroupItem/>
        </div>
      </div>
    );
}
export default GroupItemDetail;
