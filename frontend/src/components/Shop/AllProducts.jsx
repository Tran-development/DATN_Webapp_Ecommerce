import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct, editProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { RxCross1 } from "react-icons/rx";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "../../styles/styles";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [proId, setProId] = useState("");


  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleEdit = (id) => {
    const selectedProduct = products.find((product) => product._id === id);

    setSelectedProduct(selectedProduct);

    setOpen(true);
  };

  useEffect(() => {
    // Nếu có sản phẩm được chọn, điền thông tin vào các trường
    if (selectedProduct) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setCategory(selectedProduct.category);
      setTags(selectedProduct.tags);
      setOriginalPrice(selectedProduct.originalPrice);
      setDiscountPrice(selectedProduct.discountPrice);
      setStock(selectedProduct.stock);
      setImages(selectedProduct.images.map((image) => image.url));
    }
  }, [selectedProduct]);

  const clearForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setTags("");
    setOriginalPrice("");
    setDiscountPrice("");
    setStock("");
    setImages([]);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .then(() => {
        // console.log(id);
        dispatch(getAllProductsShop())
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedProduct) {
        console.error("Invalid product id");
        return;
      }

      // Gửi request chỉnh sửa sản phẩm
      await dispatch(editProduct(
        selectedProduct._id,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        images.map(image => ({ url: image }))
      ));

      dispatch(getAllProductsShop(seller._id));

      setOpen(false);
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };



  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
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
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button style={{ background: "#3379b6", color: "#fff" }}>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Action",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex gap-3">
            <Button onClick={() => setProId(params.id) || setOpenDelete(true)} style={{ background: "#ef3a57", color: "#fff" }}>
              <AiOutlineDelete size={20} />
            </Button>
            <Button onClick={() => handleEdit(params.id)} style={{ background: "#2ca457", color: "#fff" }}>
              <AiOutlineEdit size={20} />
            </Button>
          </div>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
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
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Edit Product
                </h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      cols="30"
                      required
                      rows="8"
                      type="text"
                      name="description"
                      value={description}
                      className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter your product description..."
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name=""
                      id="upload"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                      <label htmlFor="upload">
                        <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                      </label>
                      <div className="w-1/2">
                        {images &&
                          images.map((i) => (
                            <img
                              src={i}
                              key={i}
                              alt=""
                              className="h-[120px] w-[120px] object-cover m-2"
                            />
                          ))}
                      </div>
                      {/* <button className='mt-2 cursor-pointer appearance-none text-center block w-1/2 px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' onClick={SpeechRecognition.stopListening}>Generate description !</button> */}
                    </div>
                    <br />
                  </div>
                  <div>
                    <label className="pb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Choose a category">Choose a category</option>
                      {categoriesData &&
                        categoriesData.map((i) => (
                          <option value={i.title} key={i.title}>
                            {i.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Enter your product tags..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Original Price</label>
                    <input
                      type="number"
                      name="price"
                      value={originalPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Enter your product price..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Price (With Discount) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={discountPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="Enter your product price with discount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={stock}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Enter your product stock..."
                    />
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Update"
                      className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {openDelete && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpenDelete(false)} />
            </div>
            <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
              Are you sure you wanna delete this product?
            </h3>
            <div className="w-full flex items-center justify-center">
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                onClick={() => setOpenDelete(false)}
              >
                No
              </div>
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                onClick={() => setOpenDelete(false) || handleDelete(proId)}
              >
                Yes
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
