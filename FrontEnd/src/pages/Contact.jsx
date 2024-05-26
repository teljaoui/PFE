import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { AiFillHome } from "react-icons/ai";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BsFacebook } from "react-icons/bs";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsTelegram } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const Contact = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <div className="contact-wrapper py-5 home-wrapper-2 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d744.2832785170091!2d-6.840242754725677!3d34.023162379056984!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76d2889dcfc4f%3A0x6bba1398ae9dea20!2z2YLZitiz2KfYsdmK2Kkg2YjYp9ivINin2YTYsNmH2Kg!5e0!3m2!1sfr!2sma!4v1711794804328!5m2!1sfr!2sma" height="300" className="border-0 w-100" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="conatct-title mb-4">Contact</h3>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <input type="text" className="form-control" placeholder="Name" required />
                    </div>
                    <div>
                      <input type="email" className="form-control" placeholder="Email" required />
                    </div>
                    <div>
                      <input type="tel" className="form-control" placeholder="Mobile Number" required />
                    </div>
                    <div>
                      <textarea name="" id="" className="w-100 form-control" cols="30" rows="4" placeholder="Comments" required></textarea>
                    </div>
                    <div>
                      <button type="submit" className="button">Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="conatct-title mb-4">Get In Touch With Us</h3>
                  <div>
                    <ul className="ps-0">
                      <li><Link to="https://www.google.com/maps?ll=34.023098,-6.8404&z=18&t=m&hl=fr&gl=MA&mapclient=embed&cid=7762538454212012576" target="_blank0"><AiFillHome /><span>25F5+6RQ, Rabat</span> </Link></li>
                      <li><Link to="tel:+212652583234"><BiSolidPhoneCall /><span>+212652583234</span></Link></li>
                      <li><Link to="mailto:timtech@gmail.com"><MdEmail /><span>timtech@gmail.com</span></Link></li>
                      <li><Link to=""><BsFacebook /> <span>tim tech</span></Link></li>
                      <li><Link to=""><BiLogoInstagramAlt /> <span>tim_tech</span></Link></li>
                      <li><Link to=""><IoLogoWhatsapp /> <span>+212652583234</span></Link></li>
                      <li><Link to=""><BsTelegram /> <span>tim teck</span></Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
