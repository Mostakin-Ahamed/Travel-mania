import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// 

import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import useTourTypes from '../../../../Hooks/useTourTypes';
import TourCard from '../../../../Components/TourCard';
import { Link } from 'react-router-dom';


const TourismAndTravel = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [tour] = useTourTypes()
    const packages = tour.slice(0, 3);
    const [guides, setGuides] = useState([])
    useEffect(() => {
        fetch('https://travel-mania-server.vercel.app/allGuides')
            .then(res => res.json())
            .then(data => setGuides(data))

    })
    return (
        <div>
            <div className=' mx-auto lg:w-10/12  justify-center mb-16 '>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Our Package</Tab>
                        <Tab>Meet Our Tour Guides</Tab>
                    </TabList>
                    <TabPanel>
                        <Swiper pagination={true} modules={[Pagination]} className="mySwiper h-72">
                            <SwiperSlide><img className='w-full h-full object-cover' src="/slide1.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide><img className='w-full h-full object-cover' src="/slide2.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide><img className='w-full h-full object-cover' src="/slide3.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide><img className='w-full h-full object-cover' src="/slide4.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide><img className='w-full h-full object-cover' src="/slide5.jpg" alt="" />
                            </SwiperSlide>
                            <SwiperSlide><img className='w-full h-full object-cover' src="/slide6.jpg" alt="" />
                            </SwiperSlide>
                        </Swiper>
                    </TabPanel>
                    <TabPanel>
                        <div className=' grid md:grid-cols-1 grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-10'>
                            {
                                packages.map(item => <TourCard key={item._id} item={item}></TourCard>)
                            }
                        </div>
                        <div className='flex justify-center mb-5'>
                            <Link to={'/allTours'}><button className='btn btn-outline '>All Packages</button></Link>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >

                            {
                                guides.map(guide => <SwiperSlide key={guide._id} >
                                    <div className="hero min-h-full ">
                                        <div className="hero-content flex-col lg:flex-row">
                                            {/* <img src={guide.photo} className="max-w-sm object-cover avatar shadow-2xl mr-8" /> */}
                                            <div className="avatar mr-10">
                                                <div className="w-64 rounded-full">
                                                    <img src={guide.photo} />
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-3xl font-bold">Name: {guide.name}</h1>
                                                <h1 className="text-2xl font-bold">Email: {guide.email}</h1>
                                                <h1 className="text-xl font-bold">Phone: {guide.phone_number}</h1>
                                                <p className="py-6 text-lg">Price per hour: $ {guide.price_per_hour}</p>
                                                <button className="btn btn-primary">Show Details</button>
                                            </div>
                                        </div>
                                    </div></SwiperSlide>)
                            }
                        </Swiper>

                    </TabPanel>
                </Tabs>

            </div>
            <hr className='border-dashed border-gray-400' />
        </div>


    );
};

export default TourismAndTravel;