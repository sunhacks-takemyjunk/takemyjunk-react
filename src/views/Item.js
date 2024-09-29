import "./Item.css";
import { React, useState, useEffect, useContext } from "react";

function Item() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBuyNow = (dataObj) => {
    dataObj = dataObj;

    setTimeout(() => {}, 3000);
  };

  const getItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://88aq2m65f3.execute-api.us-east-1.amazonaws.com/dev/fetch_db?tableName=takemyjunk-listing&desired=listID,img_url,item_info,item_name,item_price"
      );
      const data = await response.json();
      setItem(data.data || []); // Ensure data.data is an array
    } catch (error) {
      console.error("Error fetching items:", error);
      setItem([]); // Set item to an empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="Item">
      <header className="App-header">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <br/>
                <label
                  htmlFor="my-drawer"
                  className="btn btn-primary drawer-button"
                >
                  Filters
                </label>
              </div>
              <div className="drawer-side z-20">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-6 w-80 min-h-full bg-base-200 text-base-content z-10">
                  {/* Sidebar content here */}
                  <li>
                    <h2>Filters</h2>
                  </li>
                  <li>
                    <input
                      type="number"
                      placeholder="Minimum Price"
                      className="input input-bordered max-w-xs m-2"
                      id="min-price-filter"
                    />
                  </li>
                  <li>
                    <input
                      type="number"
                      placeholder="Maximum Price"
                      className="input input-bordered max-w-xs m-2"
                      id="max-price-filter"
                    />
                  </li>
                  <li>
                    <button className="btn btn-primary m-2 p-3.5">
                      Apply Filters
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-primary m-2 p-3.5">
                      Remove Filters
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {item.length > 0 ? (
              item.map((dataObj, index) => {
                // flex w-1/[Number of images per row]
                return (
                  <div className="flex w-1/3 flex-wrap" key={index}>
                    <div className="w-screen p-1 md:p-2">
                      <div className="flex card h-full w-90 bg-base-100 shadow-xl m-2">
                        <figure>
                          <img src={dataObj.img_url} alt="ItemIMG" />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">{dataObj.item_name}</h2>
                          <h3>${dataObj.item_price}</h3>
                          <p className="text-sm">{dataObj.item_info}</p>
                          <div className="card-actions justify-end">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleBuyNow(dataObj)}
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="text-center text-2xl">No items found</h2>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Item;