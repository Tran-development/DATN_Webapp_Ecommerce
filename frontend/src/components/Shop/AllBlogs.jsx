import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlog, getAllBlogs, getAllBlogsShop } from "../../redux/actions/blog";
import Loader from "../Layout/Loader";

const AllBlogs = () => {
  const {blogs, isLoading} = useSelector((state) => state.blogs);
  const { seller } = useSelector((state) => state.seller);

console.log(blogs, seller);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs(seller._id));
    dispatch(getAllBlogsShop(seller._id))
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
      .then(() => {
        // console.log(id);
        dispatch(getAllBlogs(seller._id))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const columns = [
    { field: "id", headerName: "Blog Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Title",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "category",
      headerName: "Category",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "status",
      headerName: "Status",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const blog_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/blog/${blog_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
            onClick={() => handleDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  blogs &&
  blogs.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        description: item.description,
        category: item.category,
        status: item.status
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllBlogs;
