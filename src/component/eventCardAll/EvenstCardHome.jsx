import React from 'react'
import { Link } from 'react-router-dom';

export default function EvenstCardHome({ slug, title, img, about, date, description,id }) {
  return (
    <>
        <Link to={`/eventDetail/${id}`}>
        <section className="flex justify-center ">
          <div className="w-full h-full sm:w-[650px] md:w-[758px] lg:w-[900px] xl:w-[1000px] min-h-5 flex-1 p-0 group">
            <div className="p-0 flex  mt-5  rounded-lg drop-shadow-2xl  bg-slate-50">
              <div className="flex justify-center rounded-lg flex-col md:flex-row">
                  <div className=" w-full h-full  md:w-[400px] md:h-[350px] lg:w-[300px] xl:w-[400px] xl:h-[300px] overflow-hidden ">
                    <img
                      src={img}
                      alt=""
                      className="h-full w-[400px] rounded-lg hover:rounded-lg   object-cover group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5 sm:px-7 w-full md:w-[350px] md:px-7 lg:w-[450px] lg:px-10 xl:w-[550px] xl:px-12">
                    <h5 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-5">
                      {title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mb-3 sm:mb-5">
                      {about}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mb-3 sm:mb-5">
                      {date}
                    </p>
                  </div>
                
              </div>
            </div>
          </div>
        </section>
      </Link>
    </>
  );
}
