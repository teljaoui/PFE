import React from 'react'
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import SpecialProduct from '../components/SpecialProduct';
import Meta from '../components/Meta';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FeaturedCollection from '../components/FeaturedCollection';
import { ToastContainer } from 'react-toastify';
import { useEffect  } from 'react';


export const Home = ({Products , Categories}) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 2500,
    cssEase: "linear"
  };
  const renderDots = dots => {
    return (
      <ul style={{ position: "relative", top: "-25px", color: "#777777" }}>
        {dots}
      </ul>
    );
  };
  const advertisedProducts = Products.filter(product => product.Advertisement);

  return (
    <>
      <Meta title={"Home"} />
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <Slider {...settings} appendDots={renderDots}>
                {
                  advertisedProducts.map(
                    (product => (
                      <div className="main-banner position-relative" key={product.id}>
                        <img src={`http://127.0.0.1:8000/${product.Adimg}`} alt="" className="img-fluid rounded-3" />
                        <div className="main-banner-content position-absolute">
                          <h4>SUPERCHARGED FOR PROS.</h4>
                          <h5>{product.title.length > 15 ? product.title.substring(0, 15) + '...' : product.title}</h5>
                          <p>From {product.price} Dhs</p>
                          <Link to={`/product/${product.id}`} className="button">BUY NOW</Link>
                        </div>
                      </div>
                    ))
                  )
                }
              </Slider>
            </div>
            <div className="col-6 Best">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center ">
                <Link to="/store" className="small-banner position-relative">
                  <img src="images/catbanner-01.jpg" alt="" className="img-fluid rounded-3" />
                  <div className="small-banner-content position-absolute">
                    <h4>Best sale</h4>
                    <p>Shop now</p>
                  </div>
                </Link>
                <Link to="/store" className="small-banner position-relative">
                  <img src="images/catbanner-02.jpg" alt="" className="img-fluid rounded-3" />
                  <div className="small-banner-content position-absolute">
                    <h4>New arrival</h4>
                    <p>Find out now</p>
                  </div>
                </Link>
                <Link to="/store" className="small-banner position-relative">
                  <img src="images/catbanner-03.jpg" alt="" className="img-fluid rounded-3" />
                  <div className="small-banner-content position-absolute">
                    <h4>15% off</h4>
                    <p>Shop the last band <br /> styles and colors</p>
                  </div>
                </Link>
                <Link to="/store" className="small-banner position-relative">
                  <img src="images/catbanner-04.jpg" alt="" className="img-fluid rounded-3" />
                  <div className="small-banner-content position-absolute">
                    <h4>free engraving</h4>
                    <p>High-fidelity playback <br /> ultra-low distortion</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service.png" alt="" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0 fw-light">From all orders</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="" />
                  <div>
                    <h6>Daily Suprise Offers</h6>
                    <p className="mb-0 fw-light">Save upto 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0 fw-light">Shop whith an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="" />
                  <div>
                    <h6>Afforadable Prices</h6>
                    <p className="mb-0 fw-light">Get Factory Default Price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className="mb-0 fw-light">100% Protected Payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                {
                  Categories.map(
                    (categorie => (
                      <Link to={`/store/${categorie.title}`} className="d-flex align-items-center" key={categorie.id}>
                        <div>
                          <h6>{categorie.title.replace(/_/g, " ")}</h6>
                          <p>{categorie.quantités} Items</p>
                        </div>
                        <img src={`http://127.0.0.1:8000/${categorie.img}`} alt=""  width={110} />
                      </Link>
                    )
                    )
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner-wrapper card-wrapper ">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-09.jpg" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-10.jpg" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-11.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-13.png" alt="brand" width={70} />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-14.png" alt="brand" width={70} />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <FeaturedCollection Products={Products}/>
          </div>
        </div>
      </section>

      <section className="special-wrapper py-5 home-wrapper-2" id="special">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Product</h3>
            </div>
          </div>
          <div className="row">
            <SpecialProduct Products={Products}/>
          </div>
        </div>
      </section>
      <ToastContainer className="notif" />

    </>
  );
}
