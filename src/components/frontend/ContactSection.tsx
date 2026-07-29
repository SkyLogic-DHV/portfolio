"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";

export interface ContactData {
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  github: string;
  discord: string;
  telegram: string;
  address: string;
  googleMapsUrl: string;
}

export function ContactSection({ contact }: { contact: ContactData }) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Get In Touch With SkyLogic
        </h2>
        <p className="mt-4 text-base text-gray-500">
          Ready to build your high-performance enterprise software from scratch? Reach out to us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Channels</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase">Email Us</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase">WhatsApp</p>
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                  >
                    {contact.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase">Headquarters</p>
                  <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                    {contact.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-xs font-mono text-gray-400 uppercase mb-4">Connect Everywhere</p>
            <div className="flex flex-wrap items-center gap-3">
              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {contact.discord && (
                <a
                  href={contact.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              )}
              {contact.telegram && (
                <a
                  href={contact.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Map / Visual Container */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl flex flex-col justify-between overflow-hidden"
        >
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Location & Global Reach</h3>
            <p className="text-xs text-gray-500 mb-6">
              Our engineering office is located in SCBD Jakarta, serving clients globally.
            </p>
          </div>

          <div className="relative h-72 w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273767228834!2d106.80665937583624!3d-6.2276020937604345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1505c2a1e1b%3A0x6b772594a974917a!2sTreasury%20Tower!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}