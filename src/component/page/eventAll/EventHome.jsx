import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { seleteAllEvents,fetchevents } from '../../../reducs/feature/eventSlcie/eventSlices'
import EvenstCardHome from '../../eventCardAll/EvenstCardHome';

export default function EventHome() {

    const events=useSelector(seleteAllEvents);

    const dispach=useDispatch();
    useEffect(()=>{
        dispach(fetchevents());
    },[])
    // console.log("hello tyeww ",events)
  return (
    <div>
      <h1>this is vent page </h1>
      <section></section>
        {events.map((event, index) => {
          return (
            <>
              <div className=" flex justify-center">
                <div>
                  <EvenstCardHome
                    key={index}
                    slug={event.slug}
                    title={event.title}
                    img={event.thumbnail}
                    about={event.about}
                    date={event.date}
                    description={event.description}
                    id={event.id}
                  />
                </div>
              </div>
            </>
          );
        })}
     
    </div>
  );
}
