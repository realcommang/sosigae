import '../../Css/GroupItem.css';
import styles from "../../Css/Product.module.css";
import groupItem_image from '../../img/groupItem_image.jpg';
import groupItem_image1 from '../../img/groupitem_image14.png';
import groupItem_image2 from '../../img/groupitem_image11.PNG';
import groupItem_image3 from '../../img/groupitem_image12.jpg';
import groupItem_image4 from '../../img/groupitem_image13.jpg';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-bootstrap/Pagination'; //페이지네이션

function GroupItemView(){
  const [list , SetList] = useState([]);
  const paging = 1;
    
  const photos = [groupItem_image1, groupItem_image2,groupItem_image3, groupItem_image4]

  const convertPrice = (price) =>{
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }
  useEffect(()=> {
    axios.get('/groupItem').then((res)=>{
      SetList(res.data)
      console.log(res)
    })
    .catch(error => console.log(error))
  },[])       

  return (
    <div id="groupItem_view_main">
      {
        list.map(function(a,i){
            return(
              <div className={styles.product}>  
                <Link to={'/groupItem/detail/'+list[i].groupItem_id} className="/groupItem">  
                  <div className={styles.product_image}>       
                    <img className="groupItem_image" src={photos[i]}></img>
                  </div>
                </Link>
                <div className={styles.product_name}>
                  <span className={styles.store}>{list[i].groupItem_name}</span>
                </div>
                <div className={styles.product_price}>
                  <span className={styles.price}>{convertPrice(list[i].groupItem_price)}</span>
                  <span className={styles.unit}>원</span>
                </div>

                <div className="groupItem_num">
                  <span>{list[i].groupItem_num}</span>
                </div>
              </div>              
            )           
        })
      }
    </div>   
  );
}

// function PaginatedItems({ itemsPerPage }) {
//   // We start with an empty list of items.
//   const [currentItems, setCurrentItems] = useState(null);
//   const [pageCount, setPageCount] = useState(0);
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + itemsPerPage;
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     setCurrentItems(list.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(list.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % list.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <GroupItemView currentItems={currentItems} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// }

// // Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById('container')
// );

//export default PaginatedItems(5);
export default GroupItemView;