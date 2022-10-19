import React, { useEffect } from "react";
import Axioo from "../images/axioo.png";
import Aston from "../images/aston.png";
import Honda from "../images/honda.png";
import Schneider from "../images/schneider.png";
import Shopee from "../images/shopee.png";
import Suzuki from "../images/suzuki.png";
import Hilton from "../images/hilton.png";
import Pln from "../images/pln.png";
import Oracle from "../images/oracle.png";

function Partner() {
  useEffect(() => {
    const root = document.documentElement;
    const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
      "--marquee-elements-displayed"
    );
    const marqueeContent = document.querySelector("ul.marquee-content");

    root.style.setProperty(
      "--marquee-elements",
      marqueeContent.children.length
    );

    for (let i = 0; i < marqueeElementsDisplayed; i++) {
      marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
    }
  }, []);
  const list = [
    { id: 1, image: Axioo },
    { id: 2, image: Aston },
    { id: 3, image: Honda },
    { id: 4, image: Schneider },
    { id: 5, image: Shopee },
    { id: 6, image: Suzuki },
    { id: 7, image: Hilton },
    { id: 8, image: Pln },
    { id: 9, image: Oracle },
  ];
  const Logos = list.map((item) => {
    return (
      <li>
        <img src={item.image} alt={item.image} className="border-0" />
      </li>
    );
  });
  return (
    <div>
      <div class="marquee">
        <ul class="marquee-content my-2">{Logos}</ul>
      </div>
    </div>
  );
}

export default Partner;
