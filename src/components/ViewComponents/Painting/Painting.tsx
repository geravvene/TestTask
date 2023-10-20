import { useQuery } from "@tanstack/react-query";
import { TPainting } from "../../../types";
import Card from "../../ReUseComponents/Card/Card";
import style from "./painting.module.scss";
import DataService from "../../../services/data.service";

interface IPainting {
  authorName: string;
  locationName: string;
  item: TPainting;
}

function Painting({ authorName, locationName, item }: IPainting) {
  const { data } = useQuery(["painting", item.id], () =>
    DataService.getImg(`https://test-front.framework.team${item.imageUrl}`),
  );
  console.log(data);
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
        src={URL.createObjectURL(new Blob([data]))}
        loading="lazy"
        onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
      />
    </Card>
  );
}

export default Painting;
