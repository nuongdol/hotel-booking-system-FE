import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { FaBowlFood } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

//view date of web 
const Footer = () => {
    let today = new Date();

    return (
        // <footer className="by-dark text-light py-3 footer mt-lg-5">
        //     <Container>
        //         <Row>
        //             <Col xs={12} md={12} className="text-center">
        //                 <p>&copy; {today.getFullYear()} Booking Hotel</p>
        //             </Col> 

        //         </Row>
        //     </Container>

        // </footer>
        <>
            <div className="container">
                <div class="row">
                    <div class="col-sm-4">
                        <h3>Booking Hotel</h3>
                        <p>Download app <FaGooglePlay /></p>
                        <p>Download app <FaApple /></p>
                    </div>
                    <div class="col-sm-4">
                        <h3>Allowing us on </h3>
                        <p><FaFacebook /> https://www.facebook.com/</p>
                        <p><FaXTwitter /> https://x.com/home</p>
                        <p><FaInstagram /> https://www.instagram.com/</p>
                    </div>
                    <div class="col-sm-4">
                        <h3>Product</h3>
                        <p><FaHotel /> Hotel</p>
                        <p><FaBowlFood /> Food</p>
                    </div>
                </div>
            </div>
            <div className="text-center"> <p className='fw-bold fs-2'>&copy; {today.getFullYear()} Booking Hotel</p></div>
        </>

    )
}
export default Footer;