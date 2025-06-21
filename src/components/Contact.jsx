import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

const ContactForm = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  const { t } = useTranslation();
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
  const handleChange = (e) => {
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
    }
  };

  return (
    <section className="px-4 py-8 md:py-20">
      <div className="w-full xl:container">
        <div className="grid gap-4 md:justify-between md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="max-md:hidden" data-aos="fade-right">
            <h2 className="primary-title">
              <span className="pr-2 text-main">{t("contact.contact")}</span>
              {t("contact.contact1")}
            </h2>
            <p className="py-5 text-2xl text-neutral-500 md:py-10">
              {t("contact.text")}
            </p>
          </div>
          <form
            data-aos="fade-left"
            className="p-2 border rounded-2xl border-zinc-400 sm:p-6 lg:p-12"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center p-3 md:pb-4 md:pt-6">
              <h2 className="text-2xl font-medium md:text-3xl">
                {t("contact.start")}
              </h2>
            </div>
            <div className="grid gap-4 py-5">
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
                        onChange={handleChange}
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
            <div className="grid justify-center gap-2 py-3">
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
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
