"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const img1 =
  "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000642/img/basic/a2000642_main.jpg"
const img2 =
  "https://i0.wp.com/phoebescafe.com/wp-content/uploads/2015/05/NIKON%ED%8C%9F%ED%83%80%EC%9D%B4.jpg?resize=600%2C900&ssl=1"
const img3 =
  "https://www.semie.cooking/image/contents/recipe/kk/ye/jnmyplxm/127652387qeqr.jpg";
const img4 =
  "https://blog.kakaocdn.net/dn/tEO9y/btsoToCZErC/gRTYZ0MKwC0yhx3ImBH9oK/img.jpg";
const img5 =
  "https://recipe1.ezmember.co.kr/cache/recipe/2018/02/27/b5806f01ccb6f6d5d9aa94bdd6f4287e1.jpg";
const img6 =
  "https://gomean.co.kr/wp-content/uploads/2023/05/gm-mapo-tofu.jpg";
const img7 =
  "https://static.wtable.co.kr/image/production/service/recipe/1056/58782693-2f01-4e26-aae8-9e35dd1074d5.jpg?size=800x800";
const img8 =
  "https://recipe1.ezmember.co.kr/cache/recipe/2022/09/28/72dcbff6533146043c7d9c06a3e41fec1_m.jpg";
const img9 =
  "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/55oP/image/hTxn2Acc2Sneqn18cSKK-jyGHqw.jpg";
const img10 =
  "https://static.wtable.co.kr/image/production/service/recipe/1758/3c097a13-3fa7-41d6-9a62-cb5fd38db246.jpg?size=800x800"
const img11 =
  "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000644/img/basic/a2000644_main.jpg"
const img12 =
  "https://recipe1.ezmember.co.kr/cache/recipe/2022/04/01/c06fcf9c5ee0acc162d2e01de1453ec01.jpg"
const img13 =
  "https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/55oP/image/V00ogNI5g0y6RhtJ--AwBW74F_0.jpg"
const img14 =
  "https://recipe1.ezmember.co.kr/cache/recipe/2017/03/21/a640f519093bf7804bdc46379bf890031.jpg";
const img15 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6OT4UGCoyDTaINgNGf0i8Rk2dcDQZGXsG0w&usqp=CAU";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const SecondSlidePage2 = () => {
  // const slideNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [slideImages, setSlideImages] = useState(images);
  return (
    <div className="p-1 h-[220px]">
      <Swiper
        dir="rtl"
        slidesPerView={8}
        spaceBetween={1}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {slideImages.map((image: string, i: any) => (
          <SwiperSlide key={i} className="w-full w-min-[235px]">
            <div
              // w-[235px] h-[180px]
              className="w-full w-min-[235px] h-full bg-center bg-no-repeat overflow-hidden m-1"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SecondSlidePage2;
