import React from 'react'

export default function EventDetailCard({ slug, title, img, about, date, description, id }) {
    console.log("hello ",id)
  return (
    <div>
      <div className="w-full">
        <img
          src={img}
          alt=""
          className="w-full mb-0 xl:max-w-full "
        />
      </div>
      <section className="flex justify-center p-12 bg-slate-100 md:p-2 rounded-3xl ">
        <div className="max-w-[1000px] w-full  sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px]">
          <h3 className="mb-5 mt-5 text-xl md:text-2xl ">{title}</h3>
          <p className="mb-5 text-base md:text-lg">{description}</p>
        </div>
      </section>
    </div>
  );
}
