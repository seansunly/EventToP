import React from 'react'
import { Link } from 'react-router-dom';
import { ImFacebook2 } from "react-icons/im";

import {
  FacebookIcon,
  TwitterIcon,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";


export default function EvenstCardHome({ slug, title, img, about, date, description,id }) {
  const shareTo=window.location.href;
  const shareUrl = "http://github.com";
  const titles = "facebook";
  return (
    <>

    
      <Link to={`/eventDetail/${id}`}>
        <section className="flex justify-center ">
          <div className="w-full h-full sm:w-[650px] md:w-[758px] lg:w-[900px] xl:w-[1000px] min-h-5 flex-1 p-0 group">
            <div className="p-0 flex  mt-5  rounded-lg drop-shadow-2xl  bg-slate-100">
              <div className="flex justify-center rounded-lg flex-col md:flex-row">
                <div className=" w-full h-[100%]  md:w-[400px] md:h-[350px] lg:w-[300px] xl:w-[400px] xl:h-[300px] overflow-hidden ">
                  <img
                    src={img}
                    alt=""
                    className="h-full w-[400px] rounded-lg hover:rounded-lg transition-transform duration-300  object-cover group-hover:scale-110"
                  />
                </div>

                <div className="p-5 sm:px-7 w-full md:w-[350px] md:px-7 lg:w-[450px] lg:px-10 xl:w-[550px] xl:px-12">
                  <h5 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-5 overflow-hidden text-ellipsis -webkit-line-clamp-2 -webkit-box-orient-vertical">
                    {title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 mb-3 sm:mb-5">
                    {about}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 mb-3 sm:mb-5">
                    {date}
                  </p>
                  <div className="">
                    <FacebookShareButton
                      url={img}
                      quote={titles}
                      picture={img}
                      className="Demo__some-network__share-button flex"
                    >
                      <div className=" mr-5 text-blue-800">
                        share to facebook
                      </div>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Link>
    </>
  );
}
