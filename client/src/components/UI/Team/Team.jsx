import React from "react";
import "./Team.css";
import Team01 from "../../../assets/img/team-01.png";
import Team02 from "../../../assets/img/team-02.png";
import Team03 from "../../../assets/img/team-03.png";
import Team04 from "../../../assets/img/team-04.png";

const teamMember = [
  {
    imgUrl: Team01,
    name: "Courtny Hurry",
    position: "Product Developer",
  },
  {
    imgUrl: Team02,
    name: "Courtny Hurry",
    position: "Product Developer",
  },
  {
    imgUrl: Team03,
    name: "Courtny Hurry",
    position: "Product Developer",
  },
  {
    imgUrl: Team04,
    name: "Courtny Hurry",
    position: "Product Developer",
  },
];

const Team = () => {
  return (
    <section className="our__team">
      <div className="container">
        <div className="team__content">
          <h6 className="subtitle">Our Team</h6>
          <h2>
            Meet with <span className="highlight">our team</span>
          </h2>
        </div>

        <div className="team__wrapper">
          {teamMember.map((item, index) => (
            <div className="team__item" key={index}>
              <div className="team__img">
                <img src={item.imgUrl} alt="" />
              </div>
              <div className="team__details">
                <h4>{item.name}</h4>
                <p className="description">{item.position}</p>

                <div className="team__member-social">
                  <span>
                    <i className="ri-linkedin-line"></i>
                  </span>
                  <span>
                    <i className="ri-twitter-line"></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Team;
