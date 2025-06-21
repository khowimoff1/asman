import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import i18n from "i18next";
import { NavLink } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import Contact from "../components/Contact";

const Contacts = () => {
  const { t } = useTranslation();
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
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main"
                      to="/photogallery"
                    >
                      {t("header.photogallery")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main"
                      to="/news"
                    >
                      {t("header.news")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="px-2 py-1 rounded-lg active:bg-white active:text-main new-active"
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
        <section>
          <div data-aos="fade-right">
            <h2 className="primary-title">{t("footer.Contacts")}</h2>
            <div className="py-5 font-medium text-center text-black">
              {t("contact.textP")}
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57779.96360639857!2d70.9866613386244!3d40.437967566200314!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI3JzE1LjEiTiA3McKwMDEnMTguMCJF!5e0!3m2!1sru!2s!4v1572877892874!5m2!1sru!2s"
              className="relative mx-auto h-[22rem] w-full rounded-lg border-0 sm:w-2/3"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              loading="lazy"
            ></iframe>

            <div className="grid gap-5 pt-10 sm:pb-5 md:grid-cols-3 lg:grid-cols-4">
              <div className="flex flex-col text-white bg-main shadow-medium rounded-[14px] md:px-2 justify-center">
                <div className="flex items-center p-3">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="30"
                    width="30"
                  >
                    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div className="grid pl-5">
                    <a
                      href="tel:+998954041100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +998 95 404 11 00
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-white bg-main shadow-medium rounded-[14px] md:px-2 justify-center">
                <div className="flex items-center p-3">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="30"
                    width="30"
                  >
                    <path
                      fill="none"
                      strokeWidth="2"
                      d="M12,22 C12,22 4,16 4,10 C4,5 8,2 12,2 C16,2 20,5 20,10 C20,16 12,22 12,22 Z M12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 L12,13 Z"
                    />
                  </svg>
                  <div className="grid pl-5 max-w-[230px]">
                    <a
                      href="https://maps.app.goo.gl/fVzbMBR7J6tJeCo59"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("footer.Uzbekistan")}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-white bg-main shadow-medium rounded-[14px] md:px-2 justify-center">
                <div className="flex items-center p-3">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="30"
                    width="30"
                  >
                    <path d="M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14a1.75 1.75 0 0 1-1.75 1.75H1.75A1.75 1.75 0 0 1 0 18.75v-14C0 3.784.784 3 1.75 3ZM1.5 7.412V18.75c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25V7.412l-9.52 6.433c-.592.4-1.368.4-1.96 0Zm0-2.662v.852l10.36 7a.25.25 0 0 0 .28 0l10.36-7V4.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z" />
                  </svg>
                  <div className="grid pl-5">
                    <a
                      href="mailto:info@asman.uz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      info@asman.uz
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-white bg-main shadow-medium rounded-[14px] md:px-2 justify-center">
                <div className="flex items-center p-3">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="30"
                    width="30"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  <div className="grid pl-5">
                    <a
                      href="https://www.instagram.com/asman.uz/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @asman.uz
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Contact/>
        </section>
      </main>
    </div>
  );
};

export default Contacts;
