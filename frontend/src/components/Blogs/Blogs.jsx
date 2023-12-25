import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/styles'
import BlogCard from "./BlogCard";

const Blogs = () => {
    const { allBlogs, isLoading } = useSelector((state) => state.blogs);

    return (
        <div>
            {
                !isLoading && (
                    <div className={`${styles.section}`}>
                        <div className={`${styles.heading}`}>
                            <h1>Our Blogs</h1>
                        </div>

                        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12 border-0">
                            {allBlogs.length !== 0 ? (
                                allBlogs.map((blog) => (
                                   <BlogCard key={blog.id} data={blog} />
                                ))
                            ) : (
                                <h4>No Blogs available!</h4>
                            )}
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default Blogs