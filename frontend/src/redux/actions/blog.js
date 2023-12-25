import axios from "axios";
import { server } from "../../server";

// create blog
export const createblog = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "blogCreateRequest",
    });

    const { d } = await axios.post(`${server}/blog/create-blog`, data);
    dispatch({
      type: "blogCreateSuccess",
      payload: d.blog,
    });
  } catch (error) {
    dispatch({
      type: "blogCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all blogs of a shop
export const getAllBlogsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllblogsShopRequest",
    });

    const { data } = await axios.get(`${server}/blog/get-all-blogs/${id}`);
    dispatch({
      type: "getAllblogsShopSuccess",
      payload: data.blogs,
    });
  } catch (error) {
    dispatch({
      type: "getAllblogsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete blog of a shop
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteblogRequest",
    });

    const { data } = await axios.delete(
      `${server}/blog/delete-shop-blog/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteblogSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteblogFailed",
      payload: error.response.data.message,
    });
  }
};

// get all blogs
export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllblogsRequest",
    });

    const { data } = await axios.get(`${server}/blog/get-all-blogs`);
    dispatch({
      type: "getAllblogsSuccess",
      payload: data.blogs,
    });
  } catch (error) {
    dispatch({
      type: "getAllblogsFailed",
      payload: error.response.data.message,
    });
  }
};
