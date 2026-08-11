"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Loader2,
  Mail,
  MessageCircleMore,
  MessageSquare,
  RefreshCw,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent } from "react";

interface ContactSectionProps {
  contact: {
    email?: string;
    whatsapp?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    address?: string;
  };
}

function generateCaptcha() {
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number;
  let b: number;
  let answer: number;

  switch (op) {
    case "+":
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
      answer = a + b;
      break;
    case "-":
      a = Math.floor(Math.random() * 20) + 5;
      b = Math.floor(Math.random() * a) + 1;
      answer = a - b;
      break;
    default:
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      answer = a * b;
      break;
  }

  return { question: `${a} ${op} ${b} = ?`, answer };
}

export function ContactSection({ contact }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [step, setStep] = useState<"form" | "captcha" | "sending" | "success" | "error">("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaVerified(false);
    setCaptchaError(false);
  }, []);

  const verifyCaptcha = useCallback(() => {
    const userAnswer = parseInt(captchaInput.trim(), 10);
    if (userAnswer === captcha.answer) {
      setCaptchaVerified(true);
      setCaptchaError(false);
    } else {
      setCaptchaError(true);
      setCaptchaVerified(false);
    }
  }, [captchaInput, captcha.answer]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStep("captcha");
  };

  const handleSendEmail = async () => {
    if (!captchaVerified) return;

    setStep("sending");
    setLoading(true);

    try {
      const res = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject: "New Website Inquiry",
          message: message.trim(),
        }),
      });

      if (res.ok) {
        setStep("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to send message.");
        setStep("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStep("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-white">
      {/* Soft ambient gradient (kept light so it contrasts with the dark Leave Your Mark section above) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 10% 5%, rgba(56, 189, 248, 0.12), transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 10%, rgba(37, 99, 235, 0.10), transparent 60%),
            radial-gradient(ellipse 70% 60% at 50% 100%, rgba(59, 130, 246, 0.12), transparent 62%),
            linear-gradient(180deg, #ffffff 0%, #f2f7fd 100%)
          `,
        }}
      />

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Get In Touch With SkyLogic
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Have a project in mind or want to collaborate? Send us a message and we'll get back to you within 1-2 business days.
          </p>
        </div>

      <div className="max-w-3xl mx-auto">
        <div className="p-6 sm:p-10 rounded-[2rem] bg-white border border-gray-200 shadow-xl">
          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
                onSubmit={handleFormSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="email@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 812 3456 7890"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      placeholder="Tell us about your project or inquiry..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-sm resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#3B82F6] text-white font-semibold text-sm shadow-lg shadow-[#2563EB]/25 transition-all"
                >
                  <span>Continue</span>
                  <Send className="w-4 h-4" />
                </button>
              </motion.form>
            )}

            {step === "captcha" && (
              <motion.div
                key="captcha"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-3">
                    <ShieldCheck className="w-7 h-7 text-amber-400" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Security Verification</h4>
                  <p className="text-xs text-gray-500 mt-1">Solve the math problem to confirm you're human</p>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 text-center">
                  <p className="text-xs font-mono text-slate-500 uppercase mb-3">Solve This</p>
                  <p className="text-3xl font-black text-white tracking-wider font-mono">{captcha.question}</p>

                  <div className="mt-4 flex items-center gap-3">
                    <input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setCaptchaError(false);
                        setCaptchaVerified(false);
                      }}
                      placeholder="Your answer"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600/60 text-white text-center text-lg font-bold placeholder:text-slate-600 focus:outline-none focus:border-[#2563EB]/60 focus:ring-1 focus:ring-[#2563EB]/30 transition-all"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          verifyCaptcha();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-3 rounded-xl bg-slate-700/60 border border-slate-600/60 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                      title="New captcha"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>

                  <AnimatePresence>
                    {captchaError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 text-xs text-red-400 flex items-center justify-center gap-1"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        Incorrect answer. Try again!
                      </motion.p>
                    )}
                    {captchaVerified && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 text-xs text-emerald-400 flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Verified! You can send your message now.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="flex-1 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 font-semibold text-sm transition-all"
                  >
                    ← Back
                  </button>

                  {!captchaVerified ? (
                    <button
                      type="button"
                      onClick={verifyCaptcha}
                      disabled={!captchaInput.trim()}
                      className="flex-1 py-3.5 rounded-xl bg-amber-500/80 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Verify
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      disabled={loading}
                      className="flex-1 py-3.5 rounded-xl bg-linear-to-r from-[#3B82F6] via-[#2563EB] to-[#38BDF8] text-white font-semibold text-sm shadow-lg shadow-[#2563EB]/25 hover:shadow-[#2563EB]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === "sending" && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-4"
              >
                <Loader2 className="w-10 h-10 text-[#38BDF8] animate-spin mx-auto" />
                <p className="text-gray-900 font-semibold">Sending your message...</p>
                <p className="text-xs text-gray-500">Please wait a moment</p>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                >
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <h4 className="text-xl font-bold text-gray-900">Message Sent!</h4>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                    setCaptchaInput("");
                    setCaptchaVerified(false);
                    refreshCaptcha();
                    setStep("form");
                  }}
                  className="mt-4 px-6 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-semibold text-sm transition-all"
                >
                  Close
                </button>
              </motion.div>
            )}

            {step === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Something Went Wrong</h4>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">{errorMsg}</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      refreshCaptcha();
                      setStep("form");
                    }}
                    className="px-6 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-semibold text-sm transition-all"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setStep("form")}
                    className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 hover:text-red-700 hover:border-red-400 font-semibold text-sm transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </section>
  );
}