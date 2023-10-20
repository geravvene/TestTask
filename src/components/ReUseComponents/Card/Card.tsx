import { useState } from "react";
import cn from "classnames/bind";
import style from "./card.module.scss";
import { TDescriptionLine } from "../../../types";

const cx = cn.bind(style);

interface ICard {
  name: string;
  description: TDescriptionLine[];
  children: React.ReactNode;
  className: string;
}

function Card({ name, description, children, className }: ICard) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={cx("card", className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
      <div className={cx("info", { active })}>
        {name}
        {description.map((line) => (
          <p key={line.id}>
            {`${line.property}:`}
            <span>{line.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
export default Card;
