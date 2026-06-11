import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageCircle, ShieldCheck, TrendingUp, Users, Clock, Star, ArrowRight, CheckCircle, ChevronDown, ChevronUp, Sparkles, Heart, BarChart2, Lock, Zap, Phone } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AuthModal from '../components/auth/AuthModal';
import { mockTestimonials, mockStats, mockFaqs } from '../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const openRegister = () => { setAuthMode('register'); setAuthOpen(true); };
  const openLogin = () => { setAuthMode('login'); setAuthOpen(true); };

  return (
    <div className="bg-white">
      <Navbar onLoginClick={openLogin} onRegisterClick={openRegister} />
      <AuthModal isOpen={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-mesh">
        <div className="absolute top-24 left-16 w-72 h-72 bg-primary-100/60 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-24 right-16 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-calm-100/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6"><Sparkles size={14} /><span>AI + Licensed Psychologists</span></motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-calm-900 leading-tight mb-6">Intelligent <span className="text-gradient">Mental Health</span>, Accessible to All</motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-calm-500 leading-relaxed mb-8 max-w-lg">With Therapino, take your first step with a secure AI conversation. When you need it, real specialists are ready to help.</motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-10">
                <button onClick={openRegister} className="btn-primary flex items-center gap-2 text-base px-8 py-4">Start Free <ArrowRight size={18} /></button>
                <button onClick={openLogin} className="btn-secondary flex items-center gap-2 text-base px-8 py-4">Learn More</button>
              </motion.div>
              <motion.div variants={stagger} className="flex flex-wrap gap-6">
                {[{ icon: ShieldCheck, text: 'Fully Confidential' }, { icon: Clock, text: 'Available 24/7' }, { icon: Users, text: `${mockStats.psychologists} Specialists` }].map(({ icon: Icon, text }) => (<motion.div key={text} variants={fadeInUp} className="flex items-center gap-2 text-calm-600 text-sm"><Icon size={16} className="text-teal-500" />{text}</motion.div>))}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
              <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="bg-white rounded-3xl shadow-xl border border-calm-100 p-6 max-w-sm ml-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center"><Brain size={20} className="text-white" /></div>
                  <div><p className="text-sm font-semibold text-calm-800">Therapino Assistant</p><div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success-500 animate-pulse-soft" /><span className="text-xs text-success-600">Online</span></div></div>
                </div>
                <div className="space-y-3">
                  <div className="bg-primary-50 rounded-2xl rounded-tl-sm p-3"><p className="text-sm text-calm-700">Hi! How are you feeling today? I'm here to listen.</p></div>
                  <div className="bg-calm-100 rounded-2xl rounded-tr-sm p-3 ml-6"><p className="text-sm text-calm-700">I've been really stressed lately...</p></div>
                  <div className="bg-primary-50 rounded-2xl rounded-tl-sm p-3"><p className="text-sm text-calm-700">I understand. Tell me more, I'm listening...</p></div>
                  <div className="flex gap-1 px-3"><div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce" style={{ animationDelay: '0ms' }} /><div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce" style={{ animationDelay: '300ms' }} /></div>
                </div>
              </motion.div>
              <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-8 -left-4 bg-white rounded-2xl shadow-lg border border-calm-100 px-4 py-3 flex items-center gap-3"><div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center"><TrendingUp size={18} className="text-teal-600" /></div><div><p className="text-xs text-calm-500">Improvement in 30 days</p><p className="text-sm font-bold text-calm-900">89% of users</p></div></motion.div>
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-4 -left-8 bg-white rounded-2xl shadow-lg border border-calm-100 px-4 py-3 flex items-center gap-3"><div className="w-9 h-9 bg-warning-100 rounded-xl flex items-center justify-center"><Star size={18} className="text-warning-500" /></div><div><p className="text-xs text-calm-500">User Satisfaction</p><p className="text-sm font-bold text-calm-900">{mockStats.satisfaction}</p></div></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-primary-600 to-teal-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[{ value: mockStats.users, label: 'Active Users' }, { value: mockStats.sessions, label: 'Sessions Held' }, { value: mockStats.psychologists, label: 'Licensed Psychologists' }, { value: mockStats.satisfaction, label: 'User Satisfaction' }].map(({ value, label }) => (<motion.div key={label} variants={fadeInUp} className="text-center"><div className="text-3xl font-bold text-white mb-1">{value}</div><div className="text-primary-100 text-sm">{label}</div></motion.div>))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeInUp} className="badge-teal mb-4 mx-auto w-fit">How It Works</motion.div>
            <motion.h2 variants={fadeInUp} className="section-title">Three Steps to Peace of Mind</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle max-w-2xl mx-auto">Your wellness journey starts simply and continues with ongoing support</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {[{ step: '1', icon: BarChart2, title: 'Initial Assessment', desc: 'A comprehensive evaluation helps us understand your mental state and personality for a fully personalized experience.', color: 'primary' }, { step: '2', icon: MessageCircle, title: 'AI Conversation', desc: 'Talk to our 24/7 intelligent assistant. Without judgment, with patience and deep understanding.', color: 'teal' }, { step: '3', icon: Users, title: 'Connect with a Psychologist', desc: 'When needed, get connected to qualified specialists. Professional support is available.', color: 'primary' }].map(({ step, icon: Icon, title, desc, color }) => (<motion.div key={step} variants={fadeInUp} className="relative group"><div className="card-hover h-full"><div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${color === 'teal' ? 'bg-teal-100' : 'bg-primary-100'}`}><Icon size={26} className={color === 'teal' ? 'text-teal-600' : 'text-primary-600'} /></div><div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md ${color === 'teal' ? 'bg-teal-500' : 'bg-primary-500'}`}>{step}</div><h3 className="text-xl font-bold text-calm-900 mb-3">{title}</h3><p className="text-calm-500 text-sm leading-relaxed">{desc}</p></div></motion.div>))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-calm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeInUp} className="badge-primary mb-4 mx-auto w-fit">Features</motion.div>
            <motion.h2 variants={fadeInUp} className="section-title">Everything for Your Mental Wellness</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle max-w-xl mx-auto">Tools that truly make a difference</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ icon: MessageCircle, title: 'Intelligent Chat', desc: 'Natural conversation with AI that truly understands', color: 'text-primary-600 bg-primary-100' }, { icon: Heart, title: 'Emotion Analysis', desc: 'Automatic recognition of emotional state and tailored responses', color: 'text-error-600 bg-error-100' }, { icon: BarChart2, title: 'Mental Health Assessment', desc: 'Comprehensive ongoing evaluation with scientific indicators', color: 'text-teal-600 bg-teal-100' }, { icon: TrendingUp, title: 'Progress Tracking', desc: 'Detailed charts and statistics of your improvement journey', color: 'text-success-600 bg-success-100' }, { icon: Users, title: 'Specialist Connection', desc: 'Access to licensed and experienced psychologists', color: 'text-primary-600 bg-primary-100' }, { icon: Lock, title: 'Privacy Protection', desc: 'Full encryption and zero-data-logging policy', color: 'text-calm-600 bg-calm-100' }].map(({ icon: Icon, title, desc, color }) => (<motion.div key={title} variants={fadeInUp}><div className="card-hover h-full"><div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}`}><Icon size={22} /></div><h3 className="text-lg font-bold text-calm-900 mb-2">{title}</h3><p className="text-calm-500 text-sm leading-relaxed">{desc}</p></div></motion.div>))}
          </motion.div>
        </div>
      </section>

      {/* AI + Human Care */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeInUp} className="badge-teal mb-4">Hybrid Approach</motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-calm-900 mb-4">AI + Human = Best Care</motion.h2>
              <motion.p variants={fadeInUp} className="text-calm-500 mb-8 leading-relaxed">Therapino combines the best of both worlds: the speed and availability of AI with the depth and empathy of human specialists.</motion.p>
              <motion.div variants={stagger} className="space-y-4">
                {[{ icon: Zap, title: 'AI: Always Available', desc: '24/7, without judgment, instant' }, { icon: Brain, title: 'Smart Detection', desc: 'Identifying signs that need professional help' }, { icon: Users, title: 'Psychologist: Depth & Expertise', desc: 'Professional intervention at the right moment' }].map(({ icon: Icon, title, desc }) => (<motion.div key={title} variants={fadeInUp} className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-teal-600" /></div><div><p className="font-semibold text-calm-800">{title}</p><p className="text-sm text-calm-500">{desc}</p></div></motion.div>))}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-teal-50 rounded-3xl p-8">
                <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-5 mb-4">
                  <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center"><Brain size={18} className="text-primary-600" /></div><span className="font-semibold text-calm-800">AI Assistant</span><span className="ml-auto badge-primary text-xs">AI</span></div>
                  <p className="text-sm text-calm-600">Based on your recent conversations, some signs of chronic anxiety have been observed. I recommend speaking with a specialist.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-teal-100 p-5">
                  <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-xl overflow-hidden"><img src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100" alt="" className="w-full h-full object-cover" /></div><div><span className="font-semibold text-calm-800 block text-sm">Dr. Sarah Mitchell</span><span className="text-xs text-calm-500">Clinical Psychologist</span></div><span className="ml-auto badge-teal text-xs">Specialist</span></div>
                  <p className="text-sm text-calm-600">Patient profile received. Ready to hold the session. Please select your preferred time.</p>
                  <button className="mt-3 w-full py-2 bg-teal-500 text-white text-sm rounded-xl font-medium hover:bg-teal-600 transition-colors">Book Session</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-calm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeInUp} className="badge-primary mb-4 mx-auto w-fit">User Experiences</motion.div>
            <motion.h2 variants={fadeInUp} className="section-title">Real Stories</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle max-w-xl mx-auto">What Therapino users say</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{mockTestimonials.map((t) => (<motion.div key={t.id} variants={fadeInUp}><div className="card h-full flex flex-col"><div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={14} className="fill-warning-400 text-warning-400" />))}</div><p className="text-sm text-calm-600 leading-relaxed flex-1 mb-4">"{t.text}"</p><div className="flex items-center gap-3 pt-4 border-t border-calm-100"><img src={t.avatar} alt="" className="w-9 h-9 rounded-full object-cover" /><div><p className="text-sm font-semibold text-calm-800">{t.name}</p><p className="text-xs text-calm-400">{t.condition}</p></div></div></div></motion.div>))}</motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeInUp} className="badge-teal mb-4 mx-auto w-fit">FAQ</motion.div>
            <motion.h2 variants={fadeInUp} className="section-title">Answers to Your Questions</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">{mockFaqs.map((faq, i) => (<motion.div key={i} variants={fadeInUp}><div className="border border-calm-200 rounded-2xl overflow-hidden"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-calm-50 transition-colors"><span className="font-medium text-calm-800">{faq.q}</span>{openFaq === i ? <ChevronUp size={18} className="text-primary-500 flex-shrink-0" /> : <ChevronDown size={18} className="text-calm-400 flex-shrink-0" />}</button><motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0 }} transition={{ duration: 0.25 }} className="overflow-hidden"><div className="px-6 pb-5 text-sm text-calm-500 leading-relaxed border-t border-calm-100 pt-4">{faq.a}</div></motion.div></div></motion.div>))}</motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-teal-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"><Heart size={14} /><span>Take your first step</span></motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white mb-4">Your Mental Health Matters</motion.h2>
            <motion.p variants={fadeInUp} className="text-primary-100 text-lg mb-10 leading-relaxed">It's never too late to start. Thousands have begun their wellness journey with Therapino.</motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <button onClick={openRegister} className="flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all shadow-lg text-base">Sign Up Free <ArrowRight size={18} /></button>
              <a href="tel:+15554234567" className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-base"><Phone size={18} />Contact Us</a>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-6 text-primary-200 text-sm"><CheckCircle size={14} className="inline mr-1" />No credit card required • Completely free to start</motion.p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
