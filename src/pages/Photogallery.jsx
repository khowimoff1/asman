import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import i18n from "i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { NavLink } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Photogallery = () => {
  const { t } = useTranslation();
  const languages = localStorage.getItem("i18nextLng");
  const languageChange = (e) => {
    const slectedLanguage = e.target.value;
    i18n.changeLanguage(slectedLanguage);
    window.location.reload();
  };
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
      AOS.init({ duration: 800 });
    }, []);

  const images = [
    { src: "/Images/01-BOGOJiGn.png" },
    { src: "/Images/02-CPnyTav4.png" },
    { src: "/Images/05-DjZSkuXM.png" },
    { src: "/Images/07-BARouibF.png" },
    { src: "/Images/08-DAOkn6-W.png" },
  ];
  const [open2, setOpen2] = useState(false);
  const [index, setIndex] = useState(0);

  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <div className="mb-20">
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
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main new-active"
                      to="/photogallery"
                    >
                      {t("header.photogallery")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main active "
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
        <section className="w-full">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {images.map((item, index) => (
              <article
                key={index}
                className="relative min-h-[20rem]"
                data-aos="zoom-in"
                onClick={() => {
                  setIndex(index);
                  setOpen2(true);
                }}
              >
                <img
                  src={item.src}
                  alt="q"
                  className="rounded-md absolute-cover"
                />
              </article>
            ))}
          </div>
          <Lightbox
            open={open2}
            close={() => setOpen2(false)}
            index={index}
            slides={images}
          />
        </section>
      </main>

      {isOpen && (
        <div
          className="fixed left-0 w-full h-screen overflow-hidden bg-transparent"
          onClick={() => setOpen(false)}
        >
          <div className="fixed left-0 right-0 top-[5rem] bg-zinc-900/70 p-2 z-50">
            <ul className="grid gap-2">
              <li className="w-full rounded-xl">
                <NavLink
                  to="/"
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                >
                  <span className="flex gap-1 text-lg">{t("header.home")}</span>
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
                  <span className="flex gap-1 text-lg">
                    {t("header.about")}
                  </span>
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
              <li className="w-full rounded-xl">
                <NavLink
                  to="/products"
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex gap-1 text-lg">
                    {t("header.products")}
                  </span>
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
              <li className="w-full rounded-xl">
                <NavLink
                  to="/photogallery"
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex gap-1 text-lg">
                    {t("header.photogallery")}
                  </span>
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
              <li className="w-full rounded-xl">
                <NavLink
                  to="/news"
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex gap-1 text-lg">{t("header.news")}</span>
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
              <li className="w-full rounded-xl">
                <NavLink
                  to="/contacts"
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900/80 text-white/90"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex gap-1 text-lg">
                    {t("header.contacts")}
                  </span>
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
  );
};

export default Photogallery;
