import React ,{ useRef, useState } from 'react';
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
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_xmarvj6', 'template_77mts5g', form.current, {
        publicKey: '-yADHJ8qBIDGIbIKm',
      })
      .then(
        () => {
          toast.success("Email Send successfully", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          setEmail('');
          setPhone('');
          setName('');
          setMessage('');
        },
        (error) => {
          toast.error("error on Send Email", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          console.log(error.text);
        },
      );
  };
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <ToastContainer className="notif" />
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
                  <form  ref={form} onSubmit={sendEmail} className="d-flex flex-column gap-15">
                    <div>
                      <input type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                    </div>
                    <div>
                      <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    </div>
                    <div>
                      <input type="tel" className="form-control" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile Number" required />
                    </div>
                    <div>
                      <textarea id="" className="w-100 form-control" cols="30" value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows="4" placeholder="Comments" required></textarea>
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
                      <li><Link to="https://www.google.com/maps?ll=34.023098,-6.8404&z=18&t=m&hl=fr&gl=MA&mapclient=embed&cid=7762538454212012576" target="_blank0"><AiFillHome /><span>Kissariyat Wad Dahb N°8 , Bab Elahd , Rabat</span> </Link></li>
                      <li><Link to="tel:+212627883606" target="_blank0"><BiSolidPhoneCall /><span>+212627883606</span></Link></li>
                      <li><Link to="mailto:abderrahim_270@hotmail.com" target="_blank0"><MdEmail /><span>abderrahim_270@hotmail.com</span></Link></li>
                      <li><Link to="https://www.facebook.com/mariobarkati.co" target="_blank0"><BsFacebook /> <span>tim tech</span></Link></li>
                      <li><Link to="https://wa.me/message/ESRMW5WZ6BTPI1" target="_blank0"><IoLogoWhatsapp /> <span>+212652583234</span></Link></li>
                      <li><Link to="" target="_blank0"><BsTelegram /> <span>tim teck</span></Link></li>
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
