import React from "react";
import "./Service.css";

const serviceData = [
  {
    icon: "ri-apps-line",
    title: "App Development",
    desc: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final",
  },
  {
    icon: "ri-code-s-slash-line",
    title: "Web Design",
    desc: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final",
  },
  {
    icon: "ri-landscape-line",
    title: "Web Design",
    desc: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final",
  },
  {
    icon: "ri-rocket-line",
    title: "Graphics Design",
    desc: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final",
  },
];

const Service = () => {
  return (
    <section id="service">
      <div className="container">
        <div className="services__top-content">
          <h6 className="subtitle">Our Services</h6>
          <h2>Save time managing your bussiness with</h2>
          <h2 className="highlight"> our best service</h2>
        </div>

        <div className="service__item-wrapper">
          {serviceData.map((item, index) => (
            <div className="services__item" key={index}>
              <span className="service__icon">
                <i className={item.icon}></i>
              </span>
              <h3 className="service__title">{item.title}</h3>
              <p className="description">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
