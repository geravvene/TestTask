/* eslint-disable no-underscore-dangle */
import Card from "../../ReUseComponents/Card/Card";
import Pagination from "../../ReUseComponents/Pagination/Pagination";
import { TPainting, TParams, IPaintingList } from "../../../types";
import style from "./paintings.module.scss";

interface IPaintings extends IPaintingList {
  data: TPainting[];
  params: TParams;
  setParams: React.Dispatch<React.SetStateAction<TParams>>;
  isDark: boolean;
  pagesAmount: number;
}

function Paintings({
  data,
  authors,
  locations,
  params,
  setParams,
  pagesAmount,
  isDark = false,
}: IPaintings) {
  return !data.length ? (
    <p>Do not found</p>
  ) : (
    <>
      <div className={style.grid}>
        {data.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            description={[
              {
                id: 1,
                property: "Author",
                value:
                  authors.find((author) => author.id === item.authorId)?.name ??
                  "Not Stated",
              },
              {
                id: 2,
                property: "Created",
                value: item.created,
              },
              {
                id: 3,
                property: "Location",
                value:
                  locations.find((location) => location.id === item.locationId)
                    ?.name ?? "Not Stated",
              },
            ]}
            className={style.painting}
          >
            <img
              alt={item.name}
              src={`https://test-front.framework.team${item.imageUrl}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = `https://test-front.framework.team${item.imageUrl}`
                e.currentTarget.onerror = null;
              }}
            />
          </Card>
        ))}
      </div>
      <Pagination
        className=""
        pagesAmount={pagesAmount}
        currentPage={Number(params._page)}
        onChange={(currentPage) => {
          setParams({ ...params, _page: String(currentPage) });
        }}
        isDarkTheme={isDark}
      />
    </>
  );
}
export default Paintings;
