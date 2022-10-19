import React from "react";
import Slider from "react-slick";
import ava01 from "../../../assets/img/ava-1.jpg";
import "./Chat.css";

const Chat = () => {
    const settings = {
        dots: false,
        inifinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true
    }
  return (
    <section>
      <div className="container">
        <div className="slider__content-top">
            <h6 className="subtitle">Chats</h6>
            <h2>Trusted by more than{" "}
                <span className="highlight">5,000 costumers</span>
            </h2>
        </div>
        <div className="slider__wrapper">
          <Slider {...settings}>
            <div className="slider__item">
              <p className="description">
                Lorem ipsum may be used as a placeholder before final copy is
                available. It is also used to temporarily replace text in a
                process called greeking, which allows designers to consider the
                form of a webpage or publica
              </p>

              <div className="customer__details">
                <div className="customer__img">
                  <img src={ava01} alt="" />
                </div>

                <div>
                  <h5 className="customer__name">Jhon Doeker</h5>
                    <p className="description">CEO, Workshop</p>
                </div>
              </div>
            </div>
            <div className="slider__item">
              <p className="description">
                Lorem ipsum may be used as a placeholder before final copy is
                available. It is also used to temporarily replace text in a
                process called greeking, which allows designers to consider the
                form of a webpage or publica
              </p>

              <div className="customer__details">
                <div className="customer__img">
                  <img src={ava01} alt="" />
                </div>

                <div>
                  <h5 className="customer__name">Jhon Doeker</h5>
                    <p className="description">CEO, Workshop</p>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Chat;
