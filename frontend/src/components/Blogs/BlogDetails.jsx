import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";




const BlogDetails = ({ data }) => {
  const [select, setSelect] = useState(0);
  const { products } = useSelector((state) => state.products);
  const { allBlogs, isLoading } = useSelector((state) => state.blogs);

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const totalRatings = 0
  products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const avg = totalRatings / totalReviewsLength || 0;
  const averageRating = avg.toFixed(2);
  // console.log(data);

  const handleNavigateToBlog = (blogId) => {
    dispatch(navigate(`/blog/${blogId}`))
    // window.location.reload();
  }

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex gap-10">
              <div className="w-full 800px:w-[70%] pt-5">
                <h1 className={`${styles.productTitle} text-[40px] mb-2`}>{data.name}</h1>
                <div className="flex gap-2">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <h5 className="text-[15px] text-organic-600"><span className="text-gray-500">by</span> {data.shop.name}</h5>
                  </Link>
                  - <span className="text-[15px] text-organic-600">
                    {data.tags}
                  </span>
                </div>
                <span className="text-gray-500 mb-3">{format(data?.createdAt)}</span>
                <img
                  src={`${data && data.images[select]?.url}`}
                  alt=""
                  className="w-[100%] mt-6"
                />
                <div className="p-12" dangerouslySetInnerHTML={{ __html: data.description }}></div>

              </div>
              <div className="w-full 800px:w-[30%] pt-5">
                <h3 className="text-[22px] font-medium mt-[130px]">Read More</h3>

                <ul className="ml-5 mt-3 w-full list-disc">
                  {allBlogs && allBlogs.map((item) => (
                    <li className="text-organic-600" key={item._id}>
                      <Link
                        to={`/blog/${item._id}`}
                        onClick={() => handleNavigateToBlog(item._id)}
                        className="text-[18px] text-organic-600 font-semibold hover:underline transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};


export default BlogDetails;
