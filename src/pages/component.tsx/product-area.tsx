import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Product } from "./types/product-types";
import { useQuery } from "@tanstack/react-query";
import { pages } from "next/dist/build/templates/app-page";

function ProductArea() {
  // const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (page: any) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/?page=${page}`);
      // Process the data and update your component state
      // ...

      console.log(response.data.products.data)
      setTotalPages(response.data.products.last_page);
      // setProducts();
      return response.data.products.data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({ queryKey: ["products", currentPage], queryFn: () => fetchData(currentPage) });



  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchData });

  //   useEffect(() => {
  //     fetchData(0);
  //   }, []);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const cpage = selected + 1;
    setCurrentPage(cpage);
    // fetchData(cpage); // Fetch data for the new page
  };

  return (
    <div>
      <section>
        <div className="container mt-5 ">
          <div className="row justify-content-center">
            {products?.map((product: Product, index: number) => (
              <div key={index} className="col-md-3 col-lg-3 col-xl-3 mb-5">
                <div className="card text-black">
                  <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                  <img
                    src={product.images[0].image}
                    className="card-img-top"
                    alt="Apple Computer"
                    style={{ height: "400px" }}
                  />
                  <div className="card-body">
                    <div className="text-center">
                      <h5 className="card-title">
                        {product.title.substring(0, 10)}
                      </h5>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between">
                        <span>Price</span>
                        <span>{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          pageCount={totalPages}
          pageRangeDisplayed={1} // Adjust as needed
          marginPagesDisplayed={3} // Adjust as needed
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active mb-4"
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </section>

      {/* Pagination UI */}
    </div>
  );
}

export default ProductArea;
