import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { useState } from "react";
import ResizeObserver from "react-resize-observer";

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function GifsUpload({ customGifUplaod, setGifModalOpen }: any) {
  const [keyword, setKeyword] = useState("trending");
  // const keyword = "trending";
  const fetchGifs = (offset: number) => {
    return giphyFetch.search(keyword ? keyword : "trending", {
      offset,
      limit: 10,
    });
    // return giphyFetch.trending({ offset, limit: 10, rating: "g" });
  };
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <div className="modal-container" onClick={(e: any) => e.stopPropagation()}>
      <div className="modal-content">
        <div className="search-gif-container">
          <input type="text" className="search-gif" onChange={(e) => setKeyword(e.target.value)} placeholder="Seach GIFs"/>
        </div>
        <div
          className="custom-grid-container"
          >
          <Grid
            key={keyword}
            onGifClick={(gif: any, e: any) => {
              e.preventDefault();
              e.stopPropagation();
              customGifUplaod(`https://i.giphy.com/${gif.id}.gif`);
              setGifModalOpen(false);
            }}
            fetchGifs={fetchGifs}
            width={width / 1.5}
            columns={4}
            gutter={6}
            noLink
            hideAttribution
          />
        </div>
          <ResizeObserver
            onResize={({ width }) => {
              setWidth(width);
              // setHeight(height)
            }}
          />
      </div>
    </div>
  );
}

export default GifsUpload;
