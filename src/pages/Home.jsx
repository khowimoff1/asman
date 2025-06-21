import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { IoIosArrowDown } from "react-icons/io";
import { useRef, useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Pagination,
  Autoplay,
  A11y,
  Navigation,
} from "swiper/modules";
import "swiper/css/pagination";
import { Data } from "../Data";
import ContactForm from "../components/Contact";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Squash as Hamburger } from "hamburger-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

const Home = () => {
  const { t } = useTranslation();
  const languages = localStorage.getItem("i18nextLng");
  const languageChange = (e) => {
    const slectedLanguage = e.target.value;
    i18n.changeLanguage(slectedLanguage);
    window.location.reload();
  };
  const [isFocused, setIsFocused] = useState(false);
  // aos
  useEffect(() => {
    AOS.init({ duration: 800, mirror: true });
  }, []);

  // paginton
  const paginationRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  useEffect(() => {
    if (paginationRef.current) {
      setSwiperReady(true);
    }
  }, []);

  const news = [
    {
      id: 1,
      img: "/Images/01-DTTo3D4n.jpg",
      title: "news.1",
      description: "news.1text",
    },
    {
      id: 2,
      img: "/Images/02-BdWSi26K.jpg",
      title: "news.2",
      description: "news.2text",
    },
  ];

  // accardion
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1279px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1279px)");
    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    setIsMobile(mediaQuery.matches);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // modal
  const [selectedItem, setSelectedItem] = useState(null);
  const closeModal = () => setSelectedItem(null);

  // conatct
  const [modalContact, setModalContact] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "").replace(/^998/, "");
    let formatted = "+998";
    if (digits.length > 0) formatted += " (" + digits.slice(0, 2);
    if (digits.length >= 2) formatted += ")";
    if (digits.length >= 3) formatted += " " + digits.slice(2, 5);
    if (digits.length >= 6) formatted += "-" + digits.slice(5, 7);
    if (digits.length >= 8) formatted += "-" + digits.slice(7, 9);
    return formatted;
  };
  const handleChange2 = (e) => {
    const raw = e.target.value;
    const formatted = formatPhoneNumber(raw);
    setPhone(formatted);
  };
  const isPhoneValid = phone.replace(/\D/g, "").length === 12;
  const isFormValid = name.trim().length >= 3 && isPhoneValid;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = "8097191501:AAFSH7489SOVvqTz6KLyRZyq2iPGSQBAk4o";
    const chatId = "5235241793";

    const text = `
      📩 Yangi murojaat:
      👤 Ism: ${name}
      📞 Telefon: ${phone}
      📝 Xabar: ${message}
      `;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });

      setName("");
      setPhone("");
      setMessage("");
      toast.success(t("contact.success"));
    } catch (error) {
      toast.error(t("contact.error"));
    } finally {
      setIsSubmitting(false);
      setModalContact(false);
    }
  };

  // -----------------

  const images = [
    { src: "/Images/02-CPnyTav4.png" },
    { src: "/Images/06-BAhuY4kk.png" },
    { src: "/Images/07-BARouibF.png" },
    { src: "/Images/08-DAOkn6-W.png" },
  ];
  const [open2, setOpen2] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <header
        className="w-full  mx-auto max-w-[88rem] py-4 pl-10 flex justify-between items-center z-20 relative max-xl:bg-zinc-900/70"
        data-aos="fade-down"
      >
        <NavLink to="/">
          <img
            src={
              isMobile
                ? "/Images/logo-white-2PIdZK-S.png"
                : "/Images/logo-black-BroJ19rH.png"
            }
            alt="logo"
            width={96}
            height={45}
            className={`${isMobile ? "" : "h-[45px]"}`}
          />
        </NavLink>
        <nav className="flex items-center gap-4 text-sm tracking-wider font-extralight">
          <ul
            className={`lg:flex items-center gap-6 hidden ${
              isMobile ? "text-white" : "text-zinc-500"
            }`}
          >
            <li
              className={`${
                isMobile ? "text-[#c3bdbd]" : "text-[rgb(54_51_145)]"
              }`}
            >
              <NavLink to="/">{t("header.home")}</NavLink>
            </li>
            <li>
              <NavLink to="/about">{t("header.about")}</NavLink>
            </li>
            <li>
              <NavLink to="/products">{t("header.products")}</NavLink>
            </li>
            <li>
              <NavLink to="/photogallery">{t("header.photogallery")}</NavLink>
            </li>
            <li>
              <NavLink to="/news">{t("header.news")}</NavLink>
            </li>
            <li>
              <NavLink to="/contacts">{t("header.contacts")}</NavLink>
            </li>
          </ul>
          <div className="relative w-20 ml-auto mr-5">
            <select
              name="lang"
              onChange={languageChange}
              value={languages}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-8 px-2 text-sm text-gray-700 transition bg-gray-100 rounded-lg shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="uz">Uz</option>
              <option value="ru">Ru</option>
              <option value="eng">Eng</option>
            </select>
            <IoIosArrowDown
              className={`absolute top-2 right-2 transition-transform duration-150 ${
                isFocused ? "rotate-180" : ""
              }`}
            />
          </div>
          <div className="relative lg:hidden">
            <div className="top-4">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                color="white"
                size={28}
              />
            </div>
            {isOpen && (
              <div
                className="fixed left-0 w-full h-screen overflow-hidden bg-transparent"
                onClick={() => setOpen(false)}
              >
                <div className="fixed left-0 right-0 top-[5rem] bg-zinc-900/70 p-2 z-40">
                  <ul className="grid gap-2">
                    <li className="w-full rounded-xl">
                      <NavLink
                        to="/"
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                      >
                        <span className="flex gap-1 text-lg">Home</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          className="text-2xl"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z" />
                        </svg>
                      </NavLink>
                    </li>

                    <li className="w-full rounded-xl">
                      <NavLink
                        to="/about"
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                        onClick={() => setOpen(false)}
                      >
                        <span className="flex gap-1 text-lg">About us</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 256 256"
                          className="text-2xl"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M128,20A108,108,0,0,0,31.85,177.23L21,209.66A20,20,0,0,0,46.34,235l32.43-10.81A108,108,0,1,0,128,20Zm0,192a84,84,0,0,1-42.06-11.27,12,12,0,0,0-6-1.62,12.1,12.1,0,0,0-3.8.62l-29.79,9.93,9.93-29.79a12,12,0,0,0-1-9.81A84,84,0,1,1,128,212Z" />
                        </svg>
                      </NavLink>
                    </li>

                    {/* Products */}
                    <li className="w-full rounded-xl">
                      <NavLink
                        to="/products"
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                        onClick={() => setOpen(false)}
                      >
                        <span className="flex gap-1 text-lg">Products</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          className="text-2xl"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 21V3H21V21H19ZM9 15H15V18H9V15ZM8 13C7.44772 13 7 13.4477 7 14V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V14C17 13.4477 16.5523 13 16 13H8ZM5 9H15V6H5V9ZM3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5V10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10V5Z" />
                        </svg>
                      </NavLink>
                    </li>

                    {/* Gallery */}
                    <li className="w-full rounded-xl">
                      <NavLink
                        to="/gallery"
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                        onClick={() => setOpen(false)}
                      >
                        <span className="flex gap-1 text-lg">Photogallery</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          className="text-2xl"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 21V3H21V21H19ZM9 15H15V18H9V15ZM8 13C7.44772 13 7 13.4477 7 14V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V14C17 13.4477 16.5523 13 16 13H8ZM5 9H15V6H5V9ZM3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5V10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10V5Z" />
                        </svg>
                      </NavLink>
                    </li>

                    {/* News */}
                    <li className="w-full rounded-xl">
                      <NavLink
                        to="/news"
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                        onClick={() => setOpen(false)}
                      >
                        <span className="flex gap-1 text-lg">News</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          className="text-2xl"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 21V3H21V21H19ZM9 15H15V18H9V15ZM8 13C7.44772 13 7 13.4477 7 14V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V14C17 13.4477 16.5523 13 16 13H8ZM5 9H15V6H5V9ZM3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5V10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10V5Z" />
                        </svg>
                      </NavLink>
                    </li>

                    {/* Contacts */}
                    <li className="w-full rounded-xl">
                      <NavLink
                        to="/contacts"
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                        onClick={() => setOpen(false)}
                      >
                        <span className="flex gap-1 text-lg">Contacts</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          className="text-2xl"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fill="none" d="M0 0h24v24H0V0z" />
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4zm0 22h16v2H4zm8-10a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0 0 5zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 7.49C17 13.9 13.69 13 12 13s-5 .9-5 2.99V17h10v-1.01zm-8.19-.49c.61-.52 2.03-1 3.19-1 1.17 0 2.59.48 3.2 1H8.81z" />
                        </svg>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-[88rem] w-full ">
        <section className="flex max-xl:min-h-svh xl:my-3 xl:h-[clamp(55rem,95vh,60rem)]">
          <div className="relative max-w-full mx-auto -top-20">
            <div className="md:h-full h-[100%]" data-aos="zoom-out">
              <div
                className="absolute z-10 lg:bottom-44 md:px-10 xl:w-[55%] lg:w-[60%] xl:px-20 md:bottom-20 bottom-[10rem] md:w-[70%] px-4 aos-init aos-animate"
                data-aos="fade-right"
              >
                <div className="mb-6 xl:mb-20">
                  <h1 className="text-3xl font-semibold xl:leading-[1.4!important] text-white sm:text-4xl md:text-5xl lg:leading-[1.1!important] md:leading-[1.4!important] leading-[1.4!important]">
                    {t("home.swiper1")}
                  </h1>
                </div>
                <p className="text-base text-white sm:text-lg lg:pr-10 font-poppins">
                  {t("home.swiper2")}
                </p>
                <div className="flex gap-4 mt-6">
                  <NavLink to="/products">
                    <button className="px-5 py-2 text-sm font-medium text-white transition-all bg-transparent border border-yellow-300 hover:bg-yellow-400 rounded-3xl">
                      {t("home.swiper3")}
                    </button>
                  </NavLink>
                  <NavLink to="/products">
                    <button className="px-5 py-2 text-sm font-medium text-white transition-all bg-yellow-400 hover:bg-opacity-80 rounded-3xl">
                      {t("home.swiper4")}
                    </button>
                  </NavLink>
                </div>
              </div>
              {swiperReady && (
                <Swiper
                  modules={[EffectFade, Pagination, Autoplay]}
                  effect="fade"
                  autoplay={{ delay: 4000 }}
                  loop={false}
                  pagination={{
                    clickable: true,
                    el: paginationRef.current,
                  }}
                  onSwiper={(swiper) => {
                    if (swiper.params?.pagination && paginationRef.current) {
                      swiper.params.pagination.el = paginationRef.current;
                      swiper.pagination.init();
                      swiper.pagination.update();
                    }
                  }}
                  className="w-full h-full overflow-hidden lg:rounded-none xl:rounded-3xl banner-clip"
                >
                  <SwiperSlide>
                    <div className="relative w-full h-full">
                      <img
                        src="/Images/02-CPnyTav4.png"
                        alt="Slide 1"
                        className="object-cover w-full h-full lg:rounded-none xl:rounded-3xl "
                      />
                      <div className="absolute inset-0 bg-black/30 lg:rounded-none xl:rounded-3xl " />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative w-full h-full">
                      <img
                        src="/Images/01-BOGOJiGn.png"
                        alt="Slide 2"
                        className="object-cover w-full h-full lg:rounded-none xl:rounded-3xl "
                      />
                      <div className="absolute inset-0 bg-black/30 lg:rounded-none xl:rounded-3xl " />
                    </div>
                  </SwiperSlide>
                </Swiper>
              )}
              <div
                ref={paginationRef}
                className="custom-pagination absolute left-1/2 -translate-x-1/2 -top-[70px] z-20 max-md:hidden"
              ></div>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-between px-4 py-0 md:py-8 md:flex-row">
          <div data-aos="fade-right">
            <h1 className="font-normal text-7xl md:text-9xl">
              {t("main.asman")}
            </h1>
            <div className="mt-10">
              <h5 className="text-3xl font-normal">
                {t("main.Decorative coatings manufacturer")}
              </h5>
              <div className="mt-3 border-b-stone-300 md:w-[69%] border-t-[1px] md:pr-0 pr-3">
                <p className="pt-3 text-base tracking-wide text-zinc-400">
                  {t("main.our main advantage")}
                </p>
              </div>
            </div>
          </div>
          <div
            className="lg:w-[70%] lg:pr-[110px] md:pr-[20px] md:mt-0 mt-5 pr-5"
            data-aos="fade-left"
          >
            <p className="font-normal tracking-wide text-start lg:text-base text-neutral-800">
              {t("main.the asman")} <br />{" "}
              <span>{t("main.the asman span")}</span>
            </p>
            <p className="mt-10 font-normal tracking-wide text-start lg:text-base text-neutral-800">
              {t("main.under")}
            </p>
          </div>
        </section>
        <section className="px-4 py-6 md:py-16">
          <h1 className="font-medium text-[3rem]" data-aos="fade-right">
            {t("main.ours")}{" "}
            <span className="text-[rgb(54_51_145)]">{t("main.products")}</span>
          </h1>
          <div
            className="flex justify-end w-full border-b-[1px] border-[rgb(54_51_145)] pb-2 mb-8"
            data-aos="fade-left"
          >
            <NavLink to={"/products"}>
              <button className="text-[rgb(54_51_145)] text-lg font-medium tracking-wide flex items-center">
                {t("main.view")}{" "}
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </NavLink>
          </div>
          <div className="grid gap-5 grid-cols-[repeat(auto-fit,_15rem)] justify-evenly">
            {Data.map((item, index) => (
              <article
                className="max-w-[16rem]"
                key={index}
                onClick={() => setSelectedItem(item)}
                data-aos="zoom-in"
                data-aos-delay={index * 75}
              >
                <div className="relative z-10 cursor-pointer product-image">
                  <img
                    loading="lazy"
                    src={item.image}
                    alt={item.title}
                    className="absolute-cover mx-auto w-[90%] object-scale-down"
                  />
                </div>
                <div className="relative border -top-5 rounded-xl border-zinc-500/20">
                  <div className="px-2 pt-6 pb-1 sm:px-3 sm:pt-8">
                    <p className="text-sm font-medium line-clamp-1 text-stone-900 md:text-lg">
                      {t(item.title)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {selectedItem && (
            <div
              className="fixed inset-0 z-50 flex items-end justify-center w-screen h-screen overflow-x-auto sm:items-center bg-black/50"
              role="dialog"
              aria-modal="true"
            >
              <div className="relative w-full max-w-4xl mx-1 my-1 sm:mx-6 sm:my-16 max-h-[calc(100%-8rem)] bg-white rounded-2xl shadow-md flex flex-col">
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="absolute z-10 p-2 rounded-full top-1 right-1 hover:bg-gray-100 active:bg-gray-200"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    height="30"
                    width="30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 48C140.559 48 48 140.559 48 256c0 115.436 92.559 208 208 208 115.435 0 208-92.564 208-208 0-115.441-92.564-208-208-208zm104.002 282.881l-29.12 29.117L256 285.117l-74.881 74.881-29.121-29.117L226.881 256l-74.883-74.881 29.121-29.116L256 226.881l74.881-74.878 29.12 29.116L285.119 256l74.883 74.881z" />
                  </svg>
                </button>
                <div className="grid flex-1 gap-4 px-6 py-2 pt-8 overflow-y-auto max-md:px-4 lg:gap-8 sm:flex">
                  <div className="flex-[14rem] flex-grow-0">
                    <div className="relative mb-2 min-h-[18rem] w-full">
                      <img
                        src={selectedItem.image}
                        alt={t(selectedItem.title)}
                        loading="lazy"
                        className="absolute inset-0 object-scale-down w-full h-full rounded-2xl"
                      />
                    </div>
                    <div className="text-xl font-medium text-center text-stone-900">
                      {t(selectedItem.title)}
                    </div>
                  </div>
                  <div className="flex-1 pt-3 space-y-2 text-sm">
                    {selectedItem?.DescriptionT &&
                      selectedItem?.Description && (
                        <div className="mb-2">
                          <span className="font-semibold">
                            {t(selectedItem.DescriptionT)}:
                          </span>
                          <span className="pl-1">
                            {t(selectedItem.Description)}
                          </span>
                        </div>
                      )}
                    {selectedItem?.CharacteristicT &&
                      selectedItem?.Characteristic && (
                        <div className="mb-2">
                          <span className="font-semibold">
                            {t(selectedItem.CharacteristicT)}:
                          </span>
                          <span className="pl-1">
                            {t(selectedItem.Characteristic)}
                          </span>
                        </div>
                      )}
                    {selectedItem?.ApplyT && selectedItem?.Apply && (
                      <div className="mb-2">
                        <span className="font-semibold">
                          {t(selectedItem.ApplyT)}:
                        </span>
                        <span className="pl-1">{t(selectedItem.Apply)}</span>
                      </div>
                    )}
                    {selectedItem?.MethodsT && selectedItem?.Methods && (
                      <div className="mb-2">
                        <span className="font-semibold">
                          {t(selectedItem.MethodsT)}:
                        </span>
                        <span className="pl-1">{t(selectedItem.Methods)}</span>
                      </div>
                    )}
                    {selectedItem?.UsageT && selectedItem?.Usage && (
                      <div className="mb-2">
                        <span className="font-semibold">
                          {t(selectedItem.UsageT)}:
                        </span>
                        <span className="pl-1">{t(selectedItem.Usage)}</span>
                      </div>
                    )}
                    {selectedItem?.InstructionsT &&
                      selectedItem?.Instructions && (
                        <div className="mb-2">
                          <span className="font-semibold">
                            {t(selectedItem.InstructionsT)}:
                          </span>
                          <span className="pl-1">
                            {t(selectedItem.Instructions)}
                          </span>
                        </div>
                      )}
                    {selectedItem?.ConsumptionT &&
                      selectedItem?.Consumption && (
                        <div className="mb-2">
                          <span className="font-semibold">
                            {t(selectedItem.ConsumptionT)}:
                          </span>
                          <span className="pl-1">
                            {t(selectedItem.ConsumptionT)}
                          </span>
                        </div>
                      )}
                    {selectedItem?.ContentT && selectedItem?.Content && (
                      <div className="mb-2">
                        <span className="font-semibold">
                          {t(selectedItem.ContentT)}:
                        </span>
                        <span className="pl-1">{t(selectedItem.Content)}</span>
                      </div>
                    )}
                    {selectedItem?.SolventT && selectedItem?.Solvent && (
                      <div className="mb-2">
                        <span className="font-semibold">
                          {t(selectedItem.SolventT)}:
                        </span>
                        <span className="pl-1">{t(selectedItem.Solvent)}</span>
                      </div>
                    )}
                    {selectedItem?.FlammabilityT &&
                      selectedItem?.Flammability && (
                        <div className="mb-2">
                          <span className="font-semibold">
                            {t(selectedItem.FlammabilityT)}:
                          </span>
                          <span className="pl-1">
                            {t(selectedItem.Flammability)}
                          </span>
                        </div>
                      )}
                    {selectedItem?.ApplicationT &&
                      selectedItem?.Application && (
                        <div className="mb-2">
                          <span className="font-semibold">
                            {t(selectedItem.ApplicationT)}:
                          </span>
                          <span className="pl-1">
                            {t(selectedItem.Application)}
                          </span>
                        </div>
                      )}
                    {selectedItem?.BestT && selectedItem?.Best && (
                      <div className="mb-2">
                        <span className="font-semibold">
                          {t(selectedItem.BestT)}:
                        </span>
                        <span className="pl-1">{t(selectedItem.Best)}</span>
                      </div>
                    )}
                    {selectedItem?.StorageT && selectedItem?.Storage && (
                      <div className="mb-2">
                        <span className="font-semibold">
                          {t(selectedItem.StorageT)}:
                        </span>
                        <span className="pl-1">{t(selectedItem.Storage)}</span>
                      </div>
                    )}
                    {selectedItem?.ManufacturerT &&
                      selectedItem?.Manufacturer && (
                        <div className="mb-2">
                          <span className="font-semibold">
                            {t(selectedItem.ManufacturerT)}:
                          </span>
                          <span className="pl-1">
                            {t(selectedItem.Manufacturer)}
                          </span>
                        </div>
                      )}
                    {selectedItem?.CompleteT && selectedItem?.Complete && (
                      <div className="mb-2">
                        <span className="font-semibold">
                          {t(selectedItem.CompleteT)}:
                        </span>
                        <span className="pl-1">{t(selectedItem.Complete)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <footer className="flex justify-end gap-2 p-3">
                  <button
                    onClick={() => (setModalContact(true), closeModal())}
                    className="w-full px-8 py-2 text-sm font-medium text-white shadow-md bg-main hover:bg-main/90 rounded-2xl md:w-1/2"
                  >
                    {t("footer.Contact")}
                  </button>
                </footer>
              </div>
            </div>
          )}
          {modalContact && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center w-screen h-[100dvh] bg-black/50 overflow-x-auto">
              <section
                role="dialog"
                className="relative z-50 flex flex-col w-full max-w-md mx-1 my-1 overflow-hidden bg-white shadow-md sm:mx-6 sm:my-16 rounded-2xl"
                aria-modal="true"
              >
                <button
                  onClick={() => setModalContact(false)}
                  aria-label="Close"
                  className="absolute z-10 p-2 rounded-full top-1 right-1 hover:bg-gray-100 active:bg-gray-200"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
                <form
                  onSubmit={handleSubmit}
                  className="grid flex-1 gap-4 px-6 py-2"
                >
                  <div className="py-4 text-center">
                    <h2 className="text-2xl font-medium md:text-3xl">
                      {t("contact.start")}
                    </h2>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <div className="flex flex-col w-full group">
                        <div className="relative inline-flex flex-col items-start justify-center w-full gap-0 px-3 py-2 transition-colors duration-150 border border-gray-300 shadow-sm rounded-xl hover:border-gray-400 focus-within:border-black min-h-10 h-14">
                          <label
                            htmlFor="name"
                            className={`absolute z-10 text-sm text-gray-500 transition-all duration-200 transform scale-100 pointer-events-none top-4 left-3 group-focus-within:scale-90 group-focus-within:-translate-y-4 group-focus-within:text-gray-700 ${
                              name !== "" ? "-translate-y-4 scale-90" : ""
                            }`}
                          >
                            {t("contact.name")}
                          </label>
                          <div className="box-border inline-flex items-center w-full h-full">
                            <input
                              id="name"
                              type="text"
                              required
                              value={name}
                              className="w-full pt-5 text-sm font-normal bg-transparent outline-none"
                              placeholder=" "
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col w-full group">
                        <div className="relative inline-flex flex-col items-start justify-center w-full gap-0 px-3 py-2 transition-colors duration-150 border border-gray-300 shadow-sm rounded-xl hover:border-gray-400 focus-within:border-black min-h-10 h-14">
                          <label
                            htmlFor="phone"
                            className={`absolute z-10 text-sm text-gray-500 transition-all duration-200 transform scale-100 pointer-events-none top-4 left-3 group-focus-within:scale-90 group-focus-within:-translate-y-4 group-focus-within:text-gray-700 ${
                              phone !== "" ? "-translate-y-4 scale-90" : ""
                            }`}
                          >
                            {t("contact.phone")}
                          </label>
                          <div className="box-border inline-flex items-center w-full h-full">
                            <input
                              type="text"
                              value={phone}
                              onChange={handleChange2}
                              className="w-full text-sm font-normal bg-transparent outline-none"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col w-full group">
                        <div className="relative inline-flex flex-col items-start justify-center w-full gap-0 px-3 py-2 transition-colors duration-150 border border-gray-300 shadow-sm rounded-xl hover:border-gray-400 focus-within:border-black">
                          <label
                            htmlFor="message"
                            className={`absolute z-10 text-sm text-gray-500 transition-all duration-200 transform scale-100 pointer-events-none top-4 left-3 group-focus-within:scale-90 group-focus-within:-translate-y-4 group-focus-within:text-gray-700 ${
                              message !== "" ? "-translate-y-4 scale-90" : ""
                            }`}
                          >
                            {t("contact.message")}
                          </label>
                          <div className="box-border inline-flex items-start w-full">
                            <textarea
                              id="message"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="w-full pt-5 text-sm font-normal bg-transparent outline-none resize-none"
                              placeholder=" "
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      {/* {errors.message && (
                  <span className="block mt-1 text-sm text-red-600/50">
                    {errors.message.message}
                  </span>
                )} */}
                    </div>
                  </div>
                  <div className="my-2 text-center text-neutral-500 max-md:grid">
                    <span className="pr-4">{t("contact.call")}</span>
                    <a
                      target="_blank"
                      className="m-1 text-blue-500 underline justify-self-center max-md:p-1"
                      href="tel:+998954041100"
                    >
                      +998 95 404 11 00
                    </a>
                  </div>
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-main text-white hover:bg-main/90 h-11 px-8 min-w-[16rem] max-w-[28rem] rounded-2xl shadow-md ${
                      !isFormValid || isSubmitting
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    {isSubmitting ? t("contact.sending") : t("contact.send")}
                  </button>
                </form>
              </section>
            </div>
          )}
        </section>
        <section className="px-4 py-6 md:py-16">
          <h1 className="font-medium text-[3rem]" data-aos="fade-right">
            {t("main.About")}{" "}
            <span className="text-[rgb(54_51_145)]">{t("main.us")}</span>
          </h1>
          <div className="flex flex-col items-start justify-between w-full mt-8 md:flex-row">
            <div className="md:w-[49%] w-full" data-aos="fade-right">
              <img
                src="/Images/03-BgINri9Y.png"
                alt="about1"
                className="h-[20rem] w-full rounded-lg object-cover md:h-[32rem]"
              />
              <p className="p-2 tracking-[0.019em] max-md:text-sm text-lg font-[350]">
                {t("main.aText")}
              </p>
              <NavLink to={"/about"}>
                <button className="px-4 py-2 mt-3 text-white bg-custom-indigo rounded-3xl hover:bg-indigo-700">
                  {t("main.Detailed")}
                </button>
              </NavLink>
            </div>
            <div
              className="md:w-[49%] w-full flex flex-col-reverse md:flex-col md:mt-0 mt-8"
              data-aos="fade-left"
            >
              <p className="p-2 tracking-[0.01em] max-md:text-sm text-lg font-[350]">
                {t("main.aText2")}
              </p>
              <img
                src="/Images/04-CK7plEPU.png"
                alt="about1"
                className="h-[20rem] w-full rounded-lg object-cover md:h-[32rem]"
              />
            </div>
          </div>
        </section>
        <section className="px-4 py-6 md:py-12">
          <h1 className="font-medium text-[3rem]" data-aos="fade-right">
            {t("choose.why")}{" "}
            <span className="text-[rgb(54_51_145)]">{t("choose.why1")}</span>
          </h1>
          <div className="grid gap-3 mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <div
              className="flex flex-col items-center p-3 border shadow-sm text-card-foreground rounded-3xl md:px-5 md:py-10"
              data-aos="zoom-in"
              data-aos-delay="0"
            >
              <button
                className="bg-main w-[96px] h-[96px] rounded-full flex items-center justify-center hover:opacity-80"
                type="button"
              >
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  role="img"
                >
                  <path
                    d="M33.8333 0.25H4.66667C2.375 0.25 0.5 2.125 0.5 4.41667V33.5833C0.5 35.875 2.375 37.75 4.66667 37.75H33.8333C36.125 37.75 38 35.875 38 33.5833V4.41667C38 2.125 36.125 0.25 33.8333 0.25ZM33.8333 33.5833H4.66667V4.41667H33.8333V33.5833ZM31.7292 12.75L28.7917 9.79167L15.0625 23.5208L9.6875 18.1667L6.72917 21.1042L15.0625 29.4167L31.7292 12.75Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <div className="pt-4 text-center lg:p-8">
                <p className="text-xl font-semibold">{t("choose.1")}</p>
                <p className="pt-4 leading-7 text-neutral-400">
                  {t("choose.1text")}
                </p>
              </div>
            </div>
            <div
              className="flex flex-col items-center p-3 border shadow-sm text-card-foreground rounded-3xl md:px-5 md:py-10"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <button
                className="bg-main w-[96px] h-[96px] rounded-full flex items-center justify-center hover:opacity-80"
                type="button"
              >
                <svg
                  width="41"
                  height="42"
                  viewBox="0 0 41 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  role="img"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.25 8C8.86929 8 7.75 9.11929 7.75 10.5V31.5C7.75 32.8807 8.86929 34 10.25 34H31.25C32.6307 34 33.75 32.8807 33.75 31.5V10.5C33.75 9.11929 32.6307 8 31.25 8H10.25ZM5.75 10.5C5.75 8.01472 7.76472 6 10.25 6H31.25C33.7353 6 35.75 8.01472 35.75 10.5V31.5C35.75 33.9853 33.7353 36 31.25 36H10.25C7.76472 36 5.75 33.9853 5.75 31.5V10.5Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5 15.75C14.5 15.1977 14.9477 14.75 15.5 14.75H26C26.5523 14.75 27 15.1977 27 15.75V26.25C27 26.8023 26.5523 27.25 26 27.25H15.5C14.9477 27.25 14.5 26.8023 14.5 26.25V15.75ZM16.5 16.75V25.25H25V16.75H16.5Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5 0.75C16.0523 0.75 16.5 1.19772 16.5 1.75V7C16.5 7.55228 16.0523 8 15.5 8C14.9477 8 14.5 7.55228 14.5 7V1.75C14.5 1.19772 14.9477 0.75 15.5 0.75Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26 0.75C26.5523 0.75 27 1.19772 27 1.75V7C27 7.55228 26.5523 8 26 8C25.4477 8 25 7.55228 25 7V1.75C25 1.19772 25.4477 0.75 26 0.75Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5 34C16.0523 34 16.5 34.4477 16.5 35V40.25C16.5 40.8023 16.0523 41.25 15.5 41.25C14.9477 41.25 14.5 40.8023 14.5 40.25V35C14.5 34.4477 14.9477 34 15.5 34Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26 34C26.5523 34 27 34.4477 27 35V40.25C27 40.8023 26.5523 41.25 26 41.25C25.4477 41.25 25 40.8023 25 40.25V35C25 34.4477 25.4477 34 26 34Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.75 15.75C33.75 15.1977 34.1977 14.75 34.75 14.75H40C40.5523 14.75 41 15.1977 41 15.75C41 16.3023 40.5523 16.75 40 16.75H34.75C34.1977 16.75 33.75 16.3023 33.75 15.75Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.75 24.5C33.75 23.9477 34.1977 23.5 34.75 23.5H40C40.5523 23.5 41 23.9477 41 24.5C41 25.0523 40.5523 25.5 40 25.5H34.75C34.1977 25.5 33.75 25.0523 33.75 24.5Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.5 15.75C0.5 15.1977 0.947715 14.75 1.5 14.75H6.75C7.30228 14.75 7.75 15.1977 7.75 15.75C7.75 16.3023 7.30228 16.75 6.75 16.75H1.5C0.947715 16.75 0.5 16.3023 0.5 15.75Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.5 24.5C0.5 23.9477 0.947715 23.5 1.5 23.5H6.75C7.30228 23.5 7.75 23.9477 7.75 24.5C7.75 25.0523 7.30228 25.5 6.75 25.5H1.5C0.947715 25.5 0.5 25.0523 0.5 24.5Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <div className="pt-4 text-center lg:p-8">
                <p className="text-xl font-semibold">{t("choose.2")}</p>
                <p className="pt-4 leading-7 text-neutral-400">
                  {t("choose.2text")}
                </p>
              </div>
            </div>
            <div
              className="flex flex-col items-center p-3 border shadow-sm text-card-foreground rounded-3xl md:px-5 md:py-10"
              data-aos="zoom-in"
              data-aos-delay="224"
            >
              <button
                className="bg-main w-[96px] h-[96px] rounded-full flex items-center justify-center hover:opacity-80"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 38"
                  fill="none"
                  className="text-white w-9 h-9"
                  role="img"
                >
                  <path
                    d="M8.18182 14.8696H4.90909V26.4348H8.18182V14.8696Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18 14.8696H14.7273V26.4348H18V14.8696Z"
                    fill="currentColor"
                  />
                  <path
                    d="M32.7273 8.26087L16.3636 0L0 8.26087V11.5652H32.7273V8.26087ZM7.31455 8.26087L16.3636 3.70087L25.4127 8.26087H7.31455Z"
                    fill="currentColor"
                  />
                  <path
                    d="M0 29.7391V33.0435H20.2909C19.9473 31.9861 19.7673 30.8791 19.7018 29.7391H0Z"
                    fill="currentColor"
                  />
                  <path
                    d="M27.8182 18.6035V14.8696H24.5455V20.2557L27.8182 18.6035Z"
                    fill="currentColor"
                  />
                  <path
                    d="M29.4545 21.4783L22.9091 24.7826V28.9956C22.9091 33.1591 25.7073 37.0583 29.4545 38C33.2018 37.0583 36 33.1591 36 28.9956V24.7826L29.4545 21.4783ZM28.2764 33.0435L24.9545 29.6896L26.6891 27.9383L28.2764 29.5409L32.22 25.6087L33.9545 27.36L28.2764 33.0435Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <div className="pt-4 text-center lg:p-8">
                <p className="text-xl font-semibold">{t("choose.3")}</p>
                <p className="pt-4 leading-7 text-neutral-400">
                  {t("choose.3text")}
                </p>
              </div>
            </div>
            <div
              className="flex flex-col items-center p-3 border shadow-sm text-card-foreground rounded-3xl md:px-5 md:py-10"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <button
                className="bg-main w-[96px] h-[96px] rounded-full flex items-center justify-center hover:opacity-80"
                type="button"
              >
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  role="img"
                >
                  <path
                    d="M33.8333 0.25H4.66667C2.375 0.25 0.5 2.125 0.5 4.41667V33.5833C0.5 35.875 2.375 37.75 4.66667 37.75H33.8333C36.125 37.75 38 35.875 38 33.5833V4.41667C38 2.125 36.125 0.25 33.8333 0.25ZM33.8333 33.5833H4.66667V4.41667H33.8333V33.5833ZM31.7292 12.75L28.7917 9.79167L15.0625 23.5208L9.6875 18.1667L6.72917 21.1042L15.0625 29.4167L31.7292 12.75Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <div className="pt-4 text-center lg:p-8">
                <p className="text-xl font-semibold">{t("choose.4")}</p>
                <p className="pt-4 leading-7 text-neutral-400">
                  {t("choose.4text")}
                </p>
              </div>
            </div>
            <div
              className="flex flex-col items-center p-3 border shadow-sm text-card-foreground rounded-3xl md:px-5 md:py-10"
              data-aos="zoom-in"
              data-aos-delay="375"
            >
              <button
                className="bg-main w-[96px] h-[96px] rounded-full flex items-center justify-center hover:opacity-80"
                type="button"
              >
                <svg
                  width="41"
                  height="42"
                  viewBox="0 0 41 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  role="img"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.25 8C8.86929 8 7.75 9.11929 7.75 10.5V31.5C7.75 32.8807 8.86929 34 10.25 34H31.25C32.6307 34 33.75 32.8807 33.75 31.5V10.5C33.75 9.11929 32.6307 8 31.25 8H10.25ZM5.75 10.5C5.75 8.01472 7.76472 6 10.25 6H31.25C33.7353 6 35.75 8.01472 35.75 10.5V31.5C35.75 33.9853 33.7353 36 31.25 36H10.25C7.76472 36 5.75 33.9853 5.75 31.5V10.5Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5 15.75C14.5 15.1977 14.9477 14.75 15.5 14.75H26C26.5523 14.75 27 15.1977 27 15.75V26.25C27 26.8023 26.5523 27.25 26 27.25H15.5C14.9477 27.25 14.5 26.8023 14.5 26.25V15.75ZM16.5 16.75V25.25H25V16.75H16.5Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5 0.75C16.0523 0.75 16.5 1.19772 16.5 1.75V7C16.5 7.55228 16.0523 8 15.5 8C14.9477 8 14.5 7.55228 14.5 7V1.75C14.5 1.19772 14.9477 0.75 15.5 0.75Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26 0.75C26.5523 0.75 27 1.19772 27 1.75V7C27 7.55228 26.5523 8 26 8C25.4477 8 25 7.55228 25 7V1.75C25 1.19772 25.4477 0.75 26 0.75Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5 34C16.0523 34 16.5 34.4477 16.5 35V40.25C16.5 40.8023 16.0523 41.25 15.5 41.25C14.9477 41.25 14.5 40.8023 14.5 40.25V35C14.5 34.4477 14.9477 34 15.5 34Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26 34C26.5523 34 27 34.4477 27 35V40.25C27 40.8023 26.5523 41.25 26 41.25C25.4477 41.25 25 40.8023 25 40.25V35C25 34.4477 25.4477 34 26 34Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.75 15.75C33.75 15.1977 34.1977 14.75 34.75 14.75H40C40.5523 14.75 41 15.1977 41 15.75C41 16.3023 40.5523 16.75 40 16.75H34.75C34.1977 16.75 33.75 16.3023 33.75 15.75Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.75 24.5C33.75 23.9477 34.1977 23.5 34.75 23.5H40C40.5523 23.5 41 23.9477 41 24.5C41 25.0523 40.5523 25.5 40 25.5H34.75C34.1977 25.5 33.75 25.0523 33.75 24.5Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.5 15.75C0.5 15.1977 0.947715 14.75 1.5 14.75H6.75C7.30228 14.75 7.75 15.1977 7.75 15.75C7.75 16.3023 7.30228 16.75 6.75 16.75H1.5C0.947715 16.75 0.5 16.3023 0.5 15.75Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.5 24.5C0.5 23.9477 0.947715 23.5 1.5 23.5H6.75C7.30228 23.5 7.75 23.9477 7.75 24.5C7.75 25.0523 7.30228 25.5 6.75 25.5H1.5C0.947715 25.5 0.5 25.0523 0.5 24.5Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <div className="pt-4 text-center lg:p-8">
                <p className="text-xl font-semibold">{t("choose.5")}</p>
                <p className="pt-4 leading-7 text-neutral-400">
                  {t("choose.5text")}
                </p>
              </div>
            </div>
            <div
              className="flex flex-col items-center p-3 border shadow-sm text-card-foreground rounded-3xl md:px-5 md:py-10"
              data-aos="zoom-in"
              data-aos-delay="450"
            >
              <button
                className="bg-main w-[96px] h-[96px] rounded-full flex items-center justify-center hover:opacity-80"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 38"
                  fill="none"
                  className="text-white w-9 h-9"
                  role="img"
                >
                  <path
                    d="M8.18182 14.8696H4.90909V26.4348H8.18182V14.8696Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18 14.8696H14.7273V26.4348H18V14.8696Z"
                    fill="currentColor"
                  />
                  <path
                    d="M32.7273 8.26087L16.3636 0L0 8.26087V11.5652H32.7273V8.26087ZM7.31455 8.26087L16.3636 3.70087L25.4127 8.26087H7.31455Z"
                    fill="currentColor"
                  />
                  <path
                    d="M0 29.7391V33.0435H20.2909C19.9473 31.9861 19.7673 30.8791 19.7018 29.7391H0Z"
                    fill="currentColor"
                  />
                  <path
                    d="M27.8182 18.6035V14.8696H24.5455V20.2557L27.8182 18.6035Z"
                    fill="currentColor"
                  />
                  <path
                    d="M29.4545 21.4783L22.9091 24.7826V28.9956C22.9091 33.1591 25.7073 37.0583 29.4545 38C33.2018 37.0583 36 33.1591 36 28.9956V24.7826L29.4545 21.4783ZM28.2764 33.0435L24.9545 29.6896L26.6891 27.9383L28.2764 29.5409L32.22 25.6087L33.9545 27.36L28.2764 33.0435Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <div className="pt-4 text-center lg:p-8">
                <p className="text-xl font-semibold">{t("choose.6")}</p>
                <p className="pt-4 leading-7 text-neutral-400">
                  {t("choose.6text")}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 py-8 md:py-20">
          <div className="grid gap-2 lg:gap-5">
            <div className="grid min-h-[26rem] gap-2 sm:flex lg:gap-5">
              <article
                className="relative overflow-hidden sm:rounded-[2.25rem] basis-[20rem] xl:basis-[28rem] cursor-pointer"
                onClick={() => {
                  setIndex(0);
                  setOpen2(true);
                }}
                data-aos="zoom-in-right"
              >
                <img className="absolute-cover" src={images[0].src} alt="1" />
              </article>
              <div className="relative flex-1">
                <article
                  className="h-full overflow-hidden collage-item-cp sm:rounded-[2.25rem] relative cursor-pointer"
                  onClick={() => {
                    setIndex(1);
                    setOpen2(true);
                  }}
                  data-aos="zoom-in"
                >
                  <img className="absolute-cover" src={images[1].src} alt="2" />
                </article>
                <div
                  className="absolute z-10 right-4 top-2 max-xl:hidden lg:right-8"
                  data-aos="zoom-in-left"
                >
                  <NavLink
                    to={"/photogallery"}
                    className="flex items-center ml-auto text-main"
                  >
                    <span className="text-lg font-medium">
                      {t("main.view")}
                    </span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="grid min-h-[20rem] gap-2 sm:flex lg:gap-5">
              <article
                className="relative overflow-hidden sm:rounded-[2.25rem] basis-[20rem] lg:basis-[50rem] cursor-pointer"
                onClick={() => {
                  setIndex(2);
                  setOpen2(true);
                }}
                data-aos="zoom-in-right"
              >
                <img className="absolute-cover" src={images[2].src} alt="3" />
              </article>

              <article
                className="flex-1 relative overflow-hidden sm:rounded-[2.25rem] cursor-pointer"
                onClick={() => {
                  setIndex(3);
                  setOpen2(true);
                }}
                data-aos="zoom-in"
              >
                <img className="absolute-cover" src={images[3].src} alt="4" />
              </article>
            </div>

            <div className="grid justify-center py-5 xl:!hidden">
              <a
                href="/collages"
                className="inline-flex items-center justify-center text-sm font-medium bg-main hover:bg-main/90 text-white h-11 px-8 rounded-2xl shadow-md sm:min-w-[28rem]"
              >
                {t("main.view")}
                <svg
                  className="ml-2"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
          <Lightbox
            open={open2}
            close={() => setOpen2(false)}
            index={index}
            slides={images}
          />
        </section>
        <ContactForm />
        <section className="px-4 pt-6 md:pt-12">
          <div className="w-full xl:container">
            <div className="flex items-center">
              <h2 className="primary-title" data-aos="fade-right">
                {t("news.Company")}
                <span className="pl-2 text-main">{t("news.news")}</span>
              </h2>
              <NavLink
                to="/news"
                className="items-center hidden ml-auto text-main md:flex"
                data-aos="fade-left"
              >
                <span className="text-lg font-medium">{t("main.view")}</span>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </NavLink>
            </div>
            <div className="pt-4 md:pt-8">
              <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={16}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                navigation
              >
                {news.map((item, index) => (
                  <SwiperSlide key={index}>
                    <article
                      className="aos-init aos-animate"
                      data-aos="zoom-in"
                    >
                      <NavLink to={`/news/${item.id}`}>
                        <div className="relative cursor-pointer">
                          <div className="relative z-10 news-item-image">
                            <img
                              className="absolute-cover max-xl:rounded-lg"
                              src={item.img}
                              alt={t(item.title)}
                            />
                          </div>
                          <div className="absolute bottom-0 cursor-pointer right-2 max-xl:hidden 2xl:bottom-0 2xl:right-2">
                            <button
                              type="button"
                              className="relative inline-flex items-center justify-center h-11 rounded-lg group w-14 bg-[#363391cc] hover:opacity-80 z-10"
                            >
                              <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                color="white"
                                height="25"
                                width="25"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ color: "white" }}
                              >
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </NavLink>
                      <div className="relative z-0 border -top-6 rounded-xl border-zinc-500/20 sm:-top-24">
                        <div className="px-2 pb-1 pt-8 sm:px-3 sm:pt-[6.5rem]">
                          <p className="text-sm font-semibold line-clamp-2 text-zinc-700 md:text-lg">
                            {t(item.title)}
                          </p>
                          <p className="line-clamp-1 text-neutral-500 md:text-xl">
                            {t(item.description)}
                          </p>
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="grid justify-center md:py-5 md:!hidden">
              <NavLink
                className="inline-flex items-center justify-center px-8 text-white shadow-md bg-main h-11 rounded-2xl"
                to={"/news"}
              >
                {t("main.view")}
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </NavLink>
            </div>
          </div>
        </section>
        <section className="px-4 py-10">
          <div className="w-full xl:container">
            <div className="grid items-start gap-5 md:grid-cols-2" data-aos="fade-up">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{
                  boxShadow:
                    "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
                  "--tw-shadow": "0 4px 6px rgba(0,0,0,0.1)",
                  "--tw-shadow-colored": "0 4px 6px rgba(0,0,0,0.1)",
                  borderWidth: "1px",
                  borderRadius: "14px !important",
                  outline: "2px solid transparent",
                  outlineOffset: "2px",
                  "&.Mui-expanded": {
                    margin: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon className="text-2xl text-black" />
                  }
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    paddingY: "0.5rem",
                    paddingX: "1.5rem",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{ width: "5%", flexShrink: 0 }}
                    className="text-foreground"
                  >
                    <div className="w-2 h-2 mt-2 mr-6 rounded-full bg-main"></div>
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "1.125rem",
                      color: "#262626",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t("mui.1")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    paddingY: "0.5rem",
                    paddingTop: "0rem",
                    paddingX: "1.5rem",
                    fontSize: "0.875rem",
                    color: "#71717a",
                  }}
                >
                  <Typography>{t("mui.1text")}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                sx={{
                  boxShadow:
                    "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
                  "--tw-shadow": "0 4px 6px rgba(0,0,0,0.1)",
                  "--tw-shadow-colored": "0 4px 6px rgba(0,0,0,0.1)",
                  borderWidth: "1px",
                  borderRadius: "14px",
                  outline: "2px solid transparent",
                  outlineOffset: "2px",
                  "&.Mui-expanded": {
                    margin: 0,
                  },

                  "&::before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon className="text-2xl text-black" />
                  }
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  sx={{
                    paddingY: "0.5rem",
                    paddingX: "1.5rem",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{ width: "5%", flexShrink: 0 }}
                    className="text-foreground"
                  >
                    <div className="w-2 h-2 mt-2 mr-6 rounded-full bg-main"></div>
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "1.125rem",
                      color: "#262626",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t("mui.2")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    paddingY: "0.5rem",
                    paddingTop: "0rem",
                    paddingX: "1.5rem",
                    fontSize: "0.875rem",
                    color: "#71717a",
                  }}
                >
                  <Typography>{t("mui.2text")}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                sx={{
                  boxShadow:
                    "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
                  "--tw-shadow": "0 4px 6px rgba(0,0,0,0.1)",
                  "--tw-shadow-colored": "0 4px 6px rgba(0,0,0,0.1)",
                  borderWidth: "1px",
                  borderRadius: "14px",
                  outline: "2px solid transparent",
                  outlineOffset: "2px",
                  "&.Mui-expanded": {
                    margin: 0,
                  },

                  "&::before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon className="text-2xl text-black" />
                  }
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                  sx={{
                    paddingY: "0.5rem",
                    paddingX: "1.5rem",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{ width: "5%", flexShrink: 0 }}
                    className="text-foreground"
                  >
                    <div className="w-2 h-2 mt-2 mr-6 rounded-full bg-main"></div>
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "1.125rem",
                      color: "#262626",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t("mui.3")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    paddingY: "0.5rem",
                    paddingTop: "0rem",
                    paddingX: "1.5rem",
                    fontSize: "0.875rem",
                    color: "#71717a",
                  }}
                >
                  <Typography>{t("mui.3text")}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
                sx={{
                  boxShadow:
                    "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
                  "--tw-shadow": "0 4px 6px rgba(0,0,0,0.1)",
                  "--tw-shadow-colored": "0 4px 6px rgba(0,0,0,0.1)",
                  borderWidth: "1px",
                  borderRadius: "14px !important",
                  outline: "2px solid transparent",
                  outlineOffset: "2px",
                  "&.Mui-expanded": {
                    margin: 0,
                  },
                  "&::before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon className="text-2xl text-black" />
                  }
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                  sx={{
                    paddingY: "0.5rem",
                    paddingX: "1.5rem",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{ width: "5%", flexShrink: 0 }}
                    className="text-foreground"
                  >
                    <div className="w-2 h-2 mt-2 mr-6 rounded-full bg-main"></div>
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "1.125rem",
                      color: "#262626",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t("mui.4")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    paddingY: "0.5rem",
                    paddingTop: "0rem",
                    paddingX: "1.5rem",
                    fontSize: "0.875rem",
                    color: "#71717a",
                  }}
                >
                  <Typography>{t("mui.4text")}</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </section>
        <section className="px-4 py-10">
          <div className="w-full xl:container">
            <iframe
              data-aos="zoom-out"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57779.96360639857!2d70.9866613386244!3d40.437967566200314!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI3JzE1LjEiTiA3McKwMDEnMTguMCJF!5e0!3m2!1sru!2s!4v1572877892874!5m2!1sru!2s"
              className="relative mx-auto h-[25rem] w-full rounded-md border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
