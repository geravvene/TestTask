import { TPainting } from "../../../types";
import Card from "../../ReUseComponents/Card/Card";
import style from "./painting.module.scss";

interface IPainting {
  authorName: string;
  locationName: string;
  item: TPainting;
}

function Painting({ authorName, locationName, item }: IPainting) {
  return (
    <Card
      name={item.name}
      description={[
        {
          id: 1,
          property: "Author",
          value: authorName,
        },
        {
          id: 2,
          property: "Created",
          value: item.created,
        },
        {
          id: 3,
          property: "Location",
          value: locationName,
        },
      ]}
      className={style.painting}
    >
      <img
        alt={item.name}
        src={`https://test-front.framework.team${item.imageUrl}`}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = `https://test-front.framework.team${item.imageUrl}`;
        }}
      />
    </Card>
  );
}

export default Painting;
