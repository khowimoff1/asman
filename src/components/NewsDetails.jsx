import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import i18n from "i18next";
import { NavLink } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const newsData = [
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
const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedNews = newsData.find((item) => item.id === parseInt(id));
    setNews(selectedNews);
  }, [id]);

  const languages = localStorage.getItem("i18nextLng");
  const languageChange = (e) => {
    const slectedLanguage = e.target.value;
    i18n.changeLanguage(slectedLanguage);
    window.location.reload();
  };
  const [isFocused, setIsFocused] = useState(false);

  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const [open2, setOpen2] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <header
        className="top-0 left-0 z-20 flex justify-center w-full px-4"
        style={{ willChange: "auto", transform: "translateY(8px)" }}
      >
        <div
          className="mx-auto max-w-[88rem] w-full max-sm:px-0"
          data-aos="fade-down "
        >
          <div className="flex items-center justify-between w-full p-2 shadow-sm bg-main md:p-3 rounded-xl">
            <NavLink className="flex-shrink-0 w-24 md:w-40 xl:ml-4" to="/">
              <img
                className="w-full"
                src="/Images/logo-white-2PIdZK-S.png"
                alt="Logo"
              />
            </NavLink>
            <div className="flex items-center">
              <nav className="ml-auto mr-5 max-lg:hidden xl:mr-10">
                <ul className="flex items-center gap-2 text-white lg:gap-6">
                  <li>
                    <NavLink
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main"
                      to="/"
                    >
                      {t("header.home")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main"
                      to="/about"
                    >
                      {t("header.about")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main"
                      to="/products"
                    >
                      {t("header.products")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main"
                      to="/gallery"
                    >
                      {t("header.photogallery")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main active new-active"
                      to="/news"
                    >
                      {t("header.news")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main"
                      to="/contacts"
                    >
                      {t("header.contacts")}
                    </NavLink>
                  </li>
                </ul>
              </nav>
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
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[88rem] w-full pt-10 px-4">
        <section className="w-full ">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-2xl text-neutral-800"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
              </svg>
              <h2 className="px-3 font-semibold">{t("news.Back")}</h2>
            </button>
          </div>
          <div className="pt-5 pb-10 ">
            <h2 className="mb-2 text-xl font-semibold sm:w-2/3 sm:text-2xl md:mb-6">
              {t(news?.title)}
            </h2>
            <div className="flex justify-center">
              <div
                className="relative h-[20rem] w-full md:h-[31rem] max-w-[70rem]"
                onClick={() => {
                  setIndex(0);
                  setOpen2(true);
                }}
              >
                <img
                  className="absolute-cover"
                  src={news?.img}
                  alt="Asman travertine"
                />
              </div>
            </div>
            <div className="py-4 text-sm leading-relaxed md:text-base">
              {t(news?.description)}
            </div>
          </div>
          <Lightbox
            open={open2}
            close={() => setOpen2(false)}
            index={index}
            slides={[
              {
                src: news?.img,
              },
            ]}
          />
        </section>
      </main>
    </div>
  );
};

export default NewsDetails;
