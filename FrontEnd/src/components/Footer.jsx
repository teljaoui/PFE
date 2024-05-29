import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import ScrollToTopButton from './ScrollToTopButton ';
import { AiFillHome } from 'react-icons/ai';

export const Footer = ({Categories}) => {
  return (
    <>
      <ScrollToTopButton />
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="/images/newsletter.png" alt="newsletter" width={22} />
                <h3 className="mb-0 text-white fs-5">Sign Up for Newsletter</h3>
              </div>
            </div>
            <div className="col-5">
              <div class="input-group">
                <input
                  className="form-control py-1"
                  type="text"
                  placeholder="Your Email Adress..."
                />
                <span className="input-group-text py-2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <h6 className="text-white mb-4">Contact Us</h6>
              <div className="py-2">
                <Link to="https://www.google.com/maps?ll=34.023098,-6.8404&z=18&t=m&hl=fr&gl=MA&mapclient=embed&cid=7762538454212012576" className="text-white" target="_blank0"><AiFillHome /><span> 25F5+6RQ, Rabat</span> </Link>
                <a href="tel:+212652583234" className="mt-4 d-block mb-3 text-white">
                  Tel: +212652583234
                </a>
                <a href="mailto:timtech@gmail.com" className="mt-4 d-block mb-3 text-white">
                  Email: timtech@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-15">
                  <Link to="" className="text-white fs-4">
                    <FaFacebook />
                  </Link>
                  <Link to="" className="text-white fs-4">
                    <IoLogoWhatsapp />
                  </Link>
                  <Link to="" className="text-white fs-4">
                    <FaInstagram />
                  </Link>
                  <Link to="" className="text-white fs-4">
                    <BsLinkedin />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h6 className="text-white mb-4">Account</h6>
              <div className="footer-link d-flex flex-column">
                <Link to="/login" className="text-white py-2 mb-1">Login in My Account</Link>
                <Link to="/wishlist" className="text-white py-2 mb-1">Favorite Wishlist</Link>
                <Link to="/contact" className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-3">
              <h6 className="text-white mb-4">Quick Links</h6>
              <div className="footer-link d-flex flex-column">
                {
                  Categories.map(
                    (categorie => (
                      <Link to={`/store/${categorie.title}`} key={categorie.id} className="text-white py-2 mb-1">
                        {categorie.title.replace(/_/g, " ")}
                      </Link>
                    ))
                  )
                }
              </div>
            </div>
            <div className="col-3">
              <h6 className="text-white mb-4">Trademarks</h6>
              <div className="d-flex flex-wrap">
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-01.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-02.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-03.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-04.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-05.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-06.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-07.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-08.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-09.jpg" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-10.jpg" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-11.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-12.jpg" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-13.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
                <Link to="/" className="text-white py-2 m-1">
                  <img src="/images/brand-14.png" alt="" width={40} height={30} className="bg-white p-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-5">
              <p className="text-start mb-0 text-white">&copy; {new Date().getFullYear()} Powered by Developer Corner{" Teljaoui"}</p>
            </div>
            <div className="col-6">
              <p className="text-end mb-0 text-white payment">
                <img src="/images/payment.png" alt="" width={28} height={17} className="m-1" />
                <img src="/images/payment2.png" alt="" width={28} height={17} className="m-1" />
                <img src="/images/payment3.png" alt="" width={28} height={17} className="bg-white p-1 m-1" />
                <img src="/images/payment4.png" alt="" width={28} height={17} className="bg-white m-1" />
                <img src="/images/payment5.png" alt="" width={28} height={17} className="bg-white p-1 m-1" />
              </p>
            </div>
          </div>
        </div>
      </footer>


    </>
  );
}
