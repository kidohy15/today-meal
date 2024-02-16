import { useState } from "react";

const IMAGE_1_URL =
  // "https://plus.unsplash.com/premium_photo-1700575181270-87f37b2ebb4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  "https://mblogthumb-phinf.pstatic.net/MjAxNzAyMDlfMjMg/MDAxNDg2NjIxNjUxNTEw.zlDINyUybXuN6TMNmqPe9fSCqoJ7Zu2Lrj8hXVk1gc8g.sB7AK79hat1iG3LUztbCK-ZPPm2inTT0TPVA34ltydsg.JPEG.ottogitoday1/%EB%B0%B0%EB%84%88.jpg?type=w800";
const IMAGE_2_URL =
  // "https://images.unsplash.com/photo-1700451761286-67c601f012d8?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  "https://s3.ap-northeast-2.amazonaws.com/event-localnaeil/FileData/Article/201711/59dcaa12-d7e0-4f2f-8b84-9290b3622978.png";
const IMAGE_3_URL =
  "https://images.unsplash.com/photo-1577956239460-00b14ecd16d0?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const images = [IMAGE_1_URL, IMAGE_2_URL, IMAGE_3_URL];

export default function Carousel() {
  const [activeImage, setActiveImage] = useState(1);
  // const [imageData, setImageData] = useState([images]);
  console.log(activeImage);

  return (
    <div className="bg-black">
      <div className="carousel">
        <ul className="carousel__slides">
          {/* {imageData.map((image: any, i: any) => (
            <div key={i}>
              <input
                type="radio"
                name="radio-buttons"
                id="img-1"
                checked={activeImage === i}
                readOnly
              />
              <li className="carousel__slide-container">
                <div className="carousel__slide-img">
                  <img alt="scenery 1" src={image} />
                </div>
                <div className="carousel__controls">
                  <label
                    onClick={() => setActiveImage(3)}
                    className="carousel__slide-prev"
                  >
                    <span>&lsaquo;</span>
                  </label>
                  <label
                    onClick={() => setActiveImage(2)}
                    className="carousel__slide-next"
                  >
                    <span>&rsaquo;</span>
                  </label>
                </div>
              </li>
            </div>
          ))} */}
          <input
            type="radio"
            name="radio-buttons"
            id="img-1"
            checked={activeImage === 1}
            readOnly
          />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img alt="scenery 1" src={IMAGE_1_URL} />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(3)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(2)}
                className="carousel__slide-next"
              >
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input
            type="radio"
            name="radio-buttons"
            id="img-2"
            checked={activeImage === 2}
            readOnly
          />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img alt="scenery 2" src={IMAGE_2_URL} />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(1)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(3)}
                className="carousel__slide-next"
              >
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input
            type="radio"
            name="radio-buttons"
            id="img-3"
            checked={activeImage === 3}
            readOnly
          />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img alt="scenery 3" src={IMAGE_3_URL} />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(2)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(1)}
                className="carousel__slide-next"
              >
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <div className="carousel__dots">
            <label
              onClick={() => setActiveImage(1)}
              className="carousel__dot"
              id="img-dot-1"
            ></label>
            <label
              onClick={() => setActiveImage(2)}
              className="carousel__dot"
              id="img-dot-2"
            ></label>
            <label
              onClick={() => setActiveImage(3)}
              className="carousel__dot"
              id="img-dot-3"
            ></label>
          </div>
        </ul>
      </div>
    </div>
  );
}
