import {useParams, Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

 function DonationDetail(props) {

    let { id } = useParams();

    const [donation, setDonation] = useState("");

    function donationOrder () {
        /*백엔드로 값 전달*/
           axios(
                {
                url: '/donation/order',
                method: 'post',
                data: {
                 data1: donation.donation_price, data2: donation.donation_state, data3:donation.donation_id
                } , 
                baseURL: 'http://localhost:8080',
                //withCredentials: true,
                }
            ).then(function (response) {
                console.log(response.data);
            });

            alert("신청이 완료되었습니다!");
    }

    useEffect(()=>{
        axios.get("/donationList/detail/"+id).then((res)=>{
            if(res.data){
                console.log(res);
                setDonation(res);
            }else{
                alert("failed to");
            }
        });
    }, []);

    return(
        <div className="donationDetail">
        <span className="donationDetail">{donation.donation_id}</span>
        <span className="donationDetail">{donation.donation_name}</span>
        <button id="donation-order_btn"
        onClick={() => donationOrder()}>결제하기</button>
        </div>
        
    );
}
export default DonationDetail;
