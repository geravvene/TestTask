/* eslint-disable no-underscore-dangle */
import Painting from "../Painting/Painting";
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
          <Painting
          key={item.id}
            item={item}
            locationName={
              locations.find((location) => location.id === item.locationId)
                ?.location ?? "Not Stated"
            }
            authorName={
              authors.find((author) => author.id === item.authorId)?.name ??
              "Not Stated"
            }
          />
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
