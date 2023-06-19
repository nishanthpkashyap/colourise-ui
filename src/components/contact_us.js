import React from "react";

export function ContactUs()
{
    return (
        <div className="content contactUs" id={"contactUs"}>
            <h1>Contact Us</h1>
            {/* <p>Please feel free to Contact us by calling us or by email or by writing a post. Phone number, email and our address is given below. Thank you.</p> */}
            <div className="details">
                <div className="phno">
                    <h4>Phone Number</h4>
                    <div>+91 9658741236</div>
                    <div>+91 8874521023</div>
                </div>
                <div className="email">
                    <h4>Email</h4>
                    <div>customer_support@colouriseme.in</div>
                    <div>submit_queries@colouriseme.in</div>
                </div>
                <div className="address">
                    <h4>Address</h4>
                    <div>#49, 4th cross, 7th main, Shankarnagar, Mahalaxmi layout, Bangalore - 560096</div>
                </div>
            </div>
        </div>
    )
}