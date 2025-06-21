import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { t } = useTranslation();
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  useEffect(() => {
      AOS.init({ duration: 800 });
    }, []);

  return (
    <div className="overflow-x-hidden" data-aos-easing="ease" data-aos-duration="600" data-aos-delay="200">
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <footer className="px-4 py-10 bg-main">
        <div className="container mx-auto max-w-[88rem]">
          <div className="grid items-start gap-5 lg:grid-flow-col xl:gap-16">
            <NavLink to="/" className="flex-shrink-0 w-60">
              <img
                className="w-full"
                src="/Images/logo-white-2PIdZK-S.png"
                alt="Asman Logo"
              />
            </NavLink>
            <div className="flex flex-col justify-between gap-5 xl:gap-16 xl:justify-normal md:flex-row">
              <div className="flex gap-5 text-lg md:gap-10 lg:gap-20 ">
                <ul className="sm:px-3">
                  <li className="mb-2 text-white">
                    <NavLink to="/">{t("footer.Home")}</NavLink>
                  </li>
                  <li className="mb-2 text-white min-w-[72px]">
                    <NavLink to="/about">{t("footer.About us")}</NavLink>
                  </li>
                  <li className="mb-2 text-white">
                    <NavLink to="/products">{t("footer.Products")}</NavLink>
                  </li>
                </ul>
                <ul className="sm:px-3">
                  <li className="mb-2 text-white">
                    <NavLink to="/gallery">{t("footer.Photogallery")}</NavLink>
                  </li>
                  <li className="mb-2 text-white">
                    <NavLink to="/news">{t("footer.News")}</NavLink>
                  </li>
                  <li className="mb-2 text-white">
                    <NavLink to="/contacts">{t("footer.Contacts")}</NavLink>
                  </li>
                </ul>
              </div>
              <div className="grid gap-10 text-white sm:grid-flow-col">
                <div>
                  <h4 className="mb-3 text-xl font-medium">Contact</h4>
                  <div className="grid gap-2">
                    <a
                      href="tel:+998954041100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +998 95 404 11 00
                    </a>
                    <a
                      href="mailto:info@asman.uz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      info@asman.uz
                    </a>
                  </div>
                </div>
                <div className="max-w-[410px]">
                  <h4 className="mb-3 text-xl font-medium">
                    {t("footer.Address")}
                  </h4>
                  <div className="flex items-start gap-2">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="flex-shrink-0 text-white"
                      height="24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        strokeWidth="2"
                        d="M12,22 C12,22 4,16 4,10 C4,5 8,2 12,2 C16,2 20,5 20,10 C20,16 12,22 12,22 Z M12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 L12,13 Z"
                      ></path>
                    </svg>
                    <a
                      href="https://maps.app.goo.gl/fVzbMBR7J6tJeCo59"
                      className="text-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("footer.Uzbekistan")}
                    </a>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <a
                      href="https://www.instagram.com/p/CujRM1CsaWc/"
                      className="text-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="flex-shrink-0 text-white"
                        height="36"
                        width="36"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={0}
                      >
                        <path
                          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 
                           287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 
                           74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 
                           26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 
                           26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2
                           -37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9
                           c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2
                           c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58
                           36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 
                           42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6
                           -11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6
                           29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6
                           11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=100092329483754&mibextid=kFxxJD"
                      className="text-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="flex-shrink-0 text-white"
                        height="36"
                        width="36"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={0}
                      >
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                      </svg>
                    </a>
                    <a
                      href="https://t.me/asman_uzb"
                      className="text-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        className="flex-shrink-0 text-white"
                        height="36"
                        width="36"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={0}
                      >
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 
                           2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 
                           1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141
                           c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186
                           c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187
                           c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751
                           a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 
                           1.09"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
