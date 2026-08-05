"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail, User, MessageSquare, ShieldCheck, RefreshCw, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

interface ContactUsProps {
    isOpen: boolean;
    onClose: () => void;
}

function generateCaptcha() {
    const ops = ["+", "-", "×"] as const;
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a: number, b: number, answer: number;

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
        case "×":
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
            answer = a * b;
            break;
    }

    return { question: `${a} ${op} ${b} = ?`, answer };
}

export function ContactUsModal({ isOpen, onClose }: ContactUsProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    // Captcha
    const [captcha, setCaptcha] = useState(() => generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [captchaError, setCaptchaError] = useState(false);

    // Form state
    const [step, setStep] = useState<"form" | "captcha" | "sending" | "success" | "error">("form");
    const [errorMsg, setErrorMsg] = useState("");

    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setName("");
            setEmail("");
            setPhone("");
            setSubject("");
            setMessage("");
            setCaptchaInput("");
            setCaptchaVerified(false);
            setCaptchaError(false);
            setCaptcha(generateCaptcha());
            setStep("form");
            setErrorMsg("");
        }
    }, [isOpen]);

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
        // Validate fields
        if (!name.trim() || !email.trim() || !message.trim()) return;
        // Move to captcha step
        setStep("captcha");
    };

    const handleSendEmail = async () => {
        if (!captchaVerified) return;

        setStep("sending");

        try {
            const res = await fetch("/api/contact/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    subject: subject.trim() || "New Contact Inquiry",
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
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    >
                        <div
                            className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 border border-gray-700/50 rounded-3xl shadow-2xl shadow-indigo-500/10 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Ambient glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Header */}
                            <div className="relative px-8 pt-8 pb-4">
                                <div className="flex items-center space-x-3 mb-1">
                                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                        <Mail className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Contact Us</h3>
                                        <p className="text-xs text-slate-500 font-mono">SKYLOGIC // GET IN TOUCH</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative px-8 pb-8">
                                <AnimatePresence mode="wait">
                                    {/* ─── STEP 1: FORM ─── */}
                                    {step === "form" && (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            onSubmit={handleFormSubmit}
                                            className="space-y-4"
                                        >
                                            {/* Name */}
                                            <div>
                                                <label className="text-xs font-mono text-slate-500 uppercase mb-1.5 block">Full Name *</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                        placeholder="Your name"
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="text-xs font-mono text-slate-500 uppercase mb-1.5 block">Email Address *</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        placeholder="you@example.com"
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="text-xs font-mono text-slate-500 uppercase mb-1.5 block">Phone Number</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="+62 812 3456 7890"
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {/* Subject */}
                                            <div>
                                                <label className="text-xs font-mono text-slate-500 uppercase mb-1.5 block">Subject</label>
                                                <input
                                                    type="text"
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    placeholder="What is this about?"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                                                />
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <label className="text-xs font-mono text-slate-500 uppercase mb-1.5 block">Message *</label>
                                                <div className="relative">
                                                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                                    <textarea
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        required
                                                        rows={4}
                                                        placeholder="Tell us about your project or inquiry..."
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
                                            >
                                                <span>Send</span>
                                                <ShieldCheck className="w-4 h-4" />
                                            </button>
                                        </motion.form>
                                    )}

                                    {/* ─── STEP 2: CAPTCHA ─── */}
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
                                                <h4 className="text-lg font-bold text-white">Security Verification</h4>
                                                <p className="text-xs text-slate-500 mt-1">Solve the math problem to confirm you're human</p>
                                            </div>

                                            {/* Captcha challenge */}
                                            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 text-center">
                                                <p className="text-xs font-mono text-slate-500 uppercase mb-3">Solve This</p>
                                                <p className="text-3xl font-black text-white tracking-wider font-mono">
                                                    {captcha.question}
                                                </p>

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
                                                        className="flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600/60 text-white text-center text-lg font-bold placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
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

                                                {/* Captcha feedback */}
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
                                                        className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                        Send Message
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* ─── STEP 3: SENDING ─── */}
                                    {step === "sending" && (
                                        <motion.div
                                            key="sending"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="py-12 text-center space-y-4"
                                        >
                                            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
                                            <p className="text-white font-semibold">Sending your message...</p>
                                            <p className="text-xs text-slate-500">Please wait a moment</p>
                                        </motion.div>
                                    )}

                                    {/* ─── STEP 4: SUCCESS ─── */}
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
                                            <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                                            <p className="text-sm text-slate-400 max-w-xs mx-auto">
                                                Thank you for reaching out. We'll get back to you as soon as possible.
                                            </p>
                                            <button
                                                onClick={onClose}
                                                className="mt-4 px-6 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 font-semibold text-sm transition-all"
                                            >
                                                Close
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* ─── STEP 5: ERROR ─── */}
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
                                            <h4 className="text-xl font-bold text-white">Something Went Wrong</h4>
                                            <p className="text-sm text-slate-400 max-w-xs mx-auto">{errorMsg}</p>
                                            <div className="flex gap-3 justify-center">
                                                <button
                                                    onClick={() => {
                                                        refreshCaptcha();
                                                        setStep("form");
                                                    }}
                                                    className="px-6 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 font-semibold text-sm transition-all"
                                                >
                                                    Try Again
                                                </button>
                                                <button
                                                    onClick={onClose}
                                                    className="px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:text-white hover:border-red-400 font-semibold text-sm transition-all"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}