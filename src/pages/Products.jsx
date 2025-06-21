import { useTranslation } from "react-i18next";
import { Data } from "../Data";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Products = () => {
  const { t } = useTranslation();
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const [selectedItem, setSelectedItem] = useState(null);
  const closeModal = () => setSelectedItem(null);
  const [modalContact, setModalContact] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [activeCategory, setActiveCategory] = useState("All");
  const filteredData =
    activeCategory === "All"
      ? Data
      : Data.filter((item) => item.category === activeCategory);
  return (
    <div>
      <main className="mx-auto max-w-[88rem] w-full pt-2 px-4">
        <section className="relative h-full md:min-h-[80vh] md:p-2 md:pt-8">
          <div className="mx-auto h-full max-w-[150rem] px-2 md:flex">
            <aside className="sticky left-2 top-0 z-50 flex-[clamp(15rem,20vw,20rem)] flex-grow-0 rounded-2xl bg-main">
              <div className="p-4 max-md:hidden">
                <a href="/" className="block mx-auto w-44">
                  <img src="/Images/logo-white-2PIdZK-S.png" alt="Asman Logo" />
                </a>
              </div>
              <div className="border-b border-white/60" />
              <nav className="p-2 md:pb-5 md:pt-10">
                <menu className="flex gap-2 px-1 overflow-auto md:grid">
                  {[
                    { key: "All", label: t("about.All products") },
                    { key: "Emulsion", label: t("about.Emulsion") },
                    { key: "Dur plaster", label: t("about.Dur plaster") },
                    { key: "Lak", label: t("about.Lak") },
                    { key: "Travertine", label: t("about.Travertine") },
                    { key: "Primer", label: t("about.Primer") },
                    {
                      key: "Mineral plaster",
                      label: t("about.Mineral plaster"),
                    },
                  ].map((category) => (
                    <button
                      key={category.key}
                      className={`product-link ${
                        activeCategory === category.key ? "active-link" : ""
                      }`}
                      onClick={() => setActiveCategory(category.key)}
                    >
                      {category.label}
                    </button>
                  ))}
                </menu>
              </nav>
            </aside>
            <div className="flex-1 max-md:mt-5 md:pl-4">
              <div className="flex mb-4 md:mb-8">
                <a
                  className="flex items-center text-2xl text-neutral-800"
                  href="/"
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
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                  <h2 className="px-3 font-semibold">{t("footer.Products")}</h2>
                </a>
              </div>

              <div className="pb-5 md:p-2">
                <div className="grid gap-3 grid-cols-[repeat(auto-fit,_15rem)] justify-evenly">
                  {filteredData.map((item, index) => (
                    <article
                      key={index}
                      className="max-w-[16rem] aos-init aos-animate"
                      data-aos="zoom-in"
                      data-aos-delay={index * 75}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative z-10 cursor-pointer product-image">
                        <img
                          loading="lazy"
                          className="absolute-cover mx-auto w-[90%] object-scale-down"
                          src={item.image}
                          alt={item.title}
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
              </div>
            </div>
          </div>
        </section>
      </main>
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center w-screen h-screen overflow-x-auto sm:items-center bg-black/50"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
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
                {selectedItem?.DescriptionT && selectedItem?.Description && (
                  <div className="mb-2">
                    <span className="font-semibold">
                      {t(selectedItem.DescriptionT)}:
                    </span>
                    <span className="pl-1">{t(selectedItem.Description)}</span>
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
                {selectedItem?.InstructionsT && selectedItem?.Instructions && (
                  <div className="mb-2">
                    <span className="font-semibold">
                      {t(selectedItem.InstructionsT)}:
                    </span>
                    <span className="pl-1">{t(selectedItem.Instructions)}</span>
                  </div>
                )}
                {selectedItem?.ConsumptionT && selectedItem?.Consumption && (
                  <div className="mb-2">
                    <span className="font-semibold">
                      {t(selectedItem.ConsumptionT)}:
                    </span>
                    <span className="pl-1">{t(selectedItem.ConsumptionT)}</span>
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
                {selectedItem?.FlammabilityT && selectedItem?.Flammability && (
                  <div className="mb-2">
                    <span className="font-semibold">
                      {t(selectedItem.FlammabilityT)}:
                    </span>
                    <span className="pl-1">{t(selectedItem.Flammability)}</span>
                  </div>
                )}
                {selectedItem?.ApplicationT && selectedItem?.Application && (
                  <div className="mb-2">
                    <span className="font-semibold">
                      {t(selectedItem.ApplicationT)}:
                    </span>
                    <span className="pl-1">{t(selectedItem.Application)}</span>
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
                {selectedItem?.ManufacturerT && selectedItem?.Manufacturer && (
                  <div className="mb-2">
                    <span className="font-semibold">
                      {t(selectedItem.ManufacturerT)}:
                    </span>
                    <span className="pl-1">{t(selectedItem.Manufacturer)}</span>
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
                onClick={() => setModalContact(true)}
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
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-main text-white hover:bg-main/90 h-11 px-8 min-w-[16rem] max-w-[28rem] rounded-2xl shadow-md"
              >
                {t("contact.send")}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default Products;
