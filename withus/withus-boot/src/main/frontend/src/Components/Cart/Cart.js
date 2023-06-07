import styles from "../../Css/Cart.module.css";
import groupItem_image14 from '../../img/groupitem_image14.png';
import groupItem_image11 from '../../img/groupitem_image11.PNG';
import groupItem_image12 from '../../img/groupitem_image12.jpg';
import groupItem_image13 from '../../img/groupitem_image13.jpg';
import React, { useState, useEffect } from "react";
import axios from 'axios';
function Cart() {
  const [list , SetList] = useState([]);
  const photos = [groupItem_image11, groupItem_image12,groupItem_image13, groupItem_image14]

  useEffect(()=> {
    axios.get('/cart/' + sessionStorage.getItem("id")).then((res)=>{
      SetList(res.data)
      console.log(res)
    })
    .catch(error => console.log(error))
  },[])   
  

  const [checkedItems, setCheckedItems] = useState([]);
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckedItems(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  console.log(checkedItems);


  const [isChecked, setIsChecked] = useState(null)


  const handleAllCheck = (checked) => {
    if(checked){
      const checkedItemsArray = [];
      list.forEach(list => checkedItemsArray.push(list.groupItem_id) )
      setCheckedItems(checkedItemsArray)

    }else{
      setCheckedItems([]);
    }
  };

  const [total, setTotal] =useState(0);

  return (
    <>
    
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <div className={styles.cart_title_wrap}>
        <div className={styles.tab_title}>
          <input type="checkbox"
          onChange={(e) => {
            handleAllCheck(e.currentTarget.checked)}}
          checked={checkedItems.length === list.length ? true: false}
             />
          <span>상품정보</span>
          <span>수량</span>
          <span>상품금액</span>

          <p>전체선택</p>
        </div>
      </div>
      {list.length ===0 ? (
        <div className={"style.not"}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 구호물품을 장바구니에 담아보세요!</p>
        </div>
      ) :
      (
          list.map(function(a,i){
             let quantity = list[i].quantity;
              const handleQuantity = (type) => {
                if(type === "plus"){
                  quantity=quantity+1;
                  console.log(quantity);
                    const list2 = Array.from(list);
                    list2[i].quantity = quantity;
                    SetList(list2);
  
                    console.log(quantity);
                }else{
                  if(quantity === 1) return;
                  quantity=quantity-1;
                   console.log(quantity);
                  const list3 = Array.from(list);
                  list3[i].quantity = quantity;
                  SetList(list3);
                }
              }
              let totals = 0;
              for(let j=0;j<checkedItems.length;j++){
                if(list[i].groupItem_id==checkedItems[j].groupItem_id){
                  totals+=list[i].groupItem_price*quantity;
                  setTotal(totals);
                }
              }
              console.log(total)
              

            return(
              
      <section className={styles.cart_product_list}>
        <input type="checkbox"
        onChange={(e) => handleSingleCheck(e.target.checked, list[i].groupItem_id)}
        checked={checkedItems.includes(list[i].groupItem_id) ? true:false}
        
         />
        <div className={styles.cart_product_wrap}>
          <div className={styles.cart_product_image}>
            <img src={photos[list[i].groupItem_id-11]} alt="product-img" />
          </div>
          
        
          <div className={styles.cart_product_info}>
            <p className={styles.product_name}>{list[i].groupItem_name}</p>
            <p className={styles.price}>{list[i].groupItem_price}</p>
            <p className={styles.delivery}>택배배송 / 무료배송</p>
            </div>
        </div>

        <div className={styles.cart_product_count}>
          <img
            className={styles.minus}
            src="/icon-minus-line.svg"
            alt="minus"
            onClick={() => handleQuantity("minus")}
          />

          <div className={styles.count}>
            <span>{quantity}</span>
          </div>
          <img
            className={styles.plus}
            src="/icon-plus-line.svg"
            alt="plus"
            onClick={() => handleQuantity("plus")}
          />
        </div>

        <div className={styles.cart_product_price}>
          <p className={styles.total_price}></p>
          <button className={styles.btn_submit}>주문하기</button>
        </div>

        <div className={styles.product_remove}>
          <img src="/icon-delete.svg" alt="delete" />
        </div>
      </section>
      )
            })
          
      ) }
      <div className={styles.total}>
        <div className={styles.total_price}>
          <p className={styles.cart_product_total_price}>총 상품금액</p>
          <p className={styles.cart_product_price}>0</p>
        </div>
        <div className={styles.pay_minus}>
          <img src="/icon-minus-line.svg" alt="minus" />
        </div>
        <div className={styles.sale}>
          <p className={styles.cart_product_sale}>상품 할인</p>
          <p className={styles.cart_product_sale_price}>0원</p>
        </div>
        <div className={styles.pay_plus}>
          <img src="/icon-plus-line.svg" alt="plus" />
        </div>
        <div className={styles.delivery}>
          <p className={styles.cart_product_delivery}>배송비</p>
          <p className={styles.cart_product_delivery_price}>0원</p>
        </div>

        <div className={styles.payment}>
          <p className={styles.cart_prouct_payment}>결제 예정 금액</p>
          <p className={styles.cart_prouct_payment_price}>{total}</p>
        </div>
      </div>
    </>
  );
};

export default Cart;