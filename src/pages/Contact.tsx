import { Phone, Mail } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white font-sans">
      {/* HERO */}
      <section className="relative bg-red-700 text-white py-16 px-6 text-center overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-52 h-52 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-[-60px] left-[-30px] w-44 h-44 rounded-full bg-white opacity-5" />
        <div className="relative z-10">
          <p className="text-red-200 text-xs uppercase tracking-widest mb-3 font-medium">Get In Touch</p>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Contact Us</h1>
          <p className="text-red-100 text-sm max-w-md mx-auto leading-relaxed">We're here to help. Reach out to us anytime and we'll get back to you as soon as possible.</p>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* LEFT — Info */}
          <div className="space-y-6">
            {/* Call To Us */}
            <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-base">Call To Us</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">We are available 24/7, 7 days a week.</p>
              <p className="text-gray-700 text-sm font-medium">Phone: +8801611112222</p>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Write To Us */}
            <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-base">Write To Us</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-gray-700 text-sm mb-1">
                Emails: <span className="font-medium">customer@exclusive.com</span>
              </p>
              <p className="text-gray-700 text-sm">
                Emails: <span className="font-medium">support@exclusive.com</span>
              </p>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={7}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
              />

              {/* Submit */}
              <div className="flex justify-end">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-10 py-3 rounded-lg transition">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
