import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";

const BlogCard = ({ active, data }) => {
    // console.log(data);
    // const { allBlogs, isLoading } = useSelector((state) => state.blogs);
    // const { seller } = useSelector((state) => state.seller);

    // const maxLenght = 100;

    // const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(getAllBlogsShop(seller._id))
    // }, [dispatch]);

    return (
        <div className="w-full h-[400px] overflow-hidden bg-white rounded-lg shadow-sm relative cursor-pointer mb-5">
            <Link>
                <img
                    src={`${data.images && data.images[0]?.url}`}
                    alt=""
                    className="w-full h-[190px] mb-2 object-cover"
                />
            </Link>
            <div className="w-full ml-3 lg:[w-50%] flex flex-col justify-center">
                <span className="mb-3 font-[700] text-[14px] text-[#44a55e]">
                    {data.tags}
                </span>
                {/* <h4 className='text-[18px] font-[600] font-Roboto text-[#333]'>{data.name}</h4> */}
                <h4 className="pb-2 font-[500]">
                    {data.name.length > 60 ? data.name.slice(0, 60) + "..." : data.name}
                </h4>
                {/* <p>{data.description}</p> */}
                {/* <div dangerouslySetInnerHTML={{ __html: data.description.length > maxLenght ? data.description.slice(0, maxLenght) + " ..." : data.description }}></div> */}

                <div className="flex gap-2">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                        <h5 className="text-[15px] text-organic-600"><span className="text-gray-500">by</span> {data.shop.name}</h5>
                    </Link>
                    - <span className="text-gray-500">{format(data?.createdAt)}</span>
                </div>

                {/* <CountDown data={data} /> */}
                <br />
                <div className="flex items-center mb-2">
                    <Link to={`/blog/${data._id}`}>
                        <div className={`${styles.button} text-[#fff]`}>Read More</div>
                    </Link>
                    {/* <div className={`${styles.button} text-[#fff] ml-5`} }>Add to cart</div> */}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
