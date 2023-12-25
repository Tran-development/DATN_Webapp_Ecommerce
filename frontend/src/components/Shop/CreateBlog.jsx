import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createblog } from "../../redux/actions/blog";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const CreateBlog = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.blogs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  // const [startDate, setStartDate] = useState(null);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();



  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Blog created successfully!");
      navigate("/dashboard-blogs");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    if (transcript) {
      setDescription(transcript);
    } else {
      setDescription(null)
    }
  }, [transcript]);


  if (!browserSupportsSpeechRecognition) {
    return null
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    const data = {
      name,
      description,
      category,
      tags,
      images,
      shopId: seller._id,
      // start_Date: startDate?.toISOString(),
      // Finish_Date: endDate?.toISOString(),
    };
    dispatch(createblog(data));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Blog</h5>
      {/* create blog form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your blog title..."
          />
        </div>
        <br />
        <div className="h-[230px]">
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          {/* <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your blog product description..."
          ></textarea> */}
          <ReactQuill
            theme="snow"
            className="mt-3 h-[150px]"
            name="description"
            height="400px"
            value={description}
            onChange={(content) => setDescription(content)}
          // onChange={formik.handleChange("description")}
          // value={formik.values.description}
          />
          <h2 className="pt-12">You can use your voice to write description !</h2>
          <div className="w-full flex gap-5">
            <button className='mt-2 mb-4 cursor-pointer appearance-none text-center block w-1/2 px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' onClick={startListening}>Start Listening</button>
            <button className='mt-2 mb-4 cursor-pointer appearance-none text-center block w-1/2 px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' onClick={SpeechRecognition.stopListening}>Stop Listening</button>
          </div>
        </div>

        <br />
        <br />
        <div className="pt-12">
          <label className="pb-4">
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
            placeholder="Enter your blog tags..."
          />
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
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
