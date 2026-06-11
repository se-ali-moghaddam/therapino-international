import { motion } from 'framer-motion';
import { User, MessageCircle, Search, Activity, Heart, Brain, Calendar, TrendingUp, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { userJourneySteps } from '../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const iconMap: Record<string, React.ReactNode> = {
  'User': <User size={24} />,
  'MessageCircle': <MessageCircle size={24} />,
  'Search': <Search size={24} />,
  'Activity': <Activity size={24} />,
  'Heart': <Heart size={24} />,
  'Brain': <Brain size={24} />,
  'Calendar': <Calendar size={24} />,
  'TrendingUp': <TrendingUp size={24} />,
};

const colorSteps = [
  'from-calm-400 to-calm-600',
  'from-primary-400 to-primary-600',
  'from-teal-400 to-teal-600',
  'from-success-400 to-success-600',
  'from-teal-500 to-primary-500',
  'from-primary-500 to-teal-500',
  'from-calm-500 to-primary-500',
  'from-primary-400 to-primary-600',
  'from-teal-500 to-success-500',
];

const bgColors = [
  'bg-calm-100',
  'bg-primary-100',
  'bg-teal-100',
  'bg-success-100',
  'bg-teal-100',
  'bg-primary-100',
  'bg-calm-100',
  'bg-primary-100',
  'bg-teal-100',
];

export default function UserJourneyPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-28 pb-12 bg-mesh bg-calm-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="badge-teal mb-4 mx-auto w-fit">The Journey</motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl font-bold text-calm-900 mb-4">How Therapino Works</motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-calm-500 max-w-2xl mx-auto">
              The world's first AI-powered mental health ecosystem that empowers therapists and RTT practitioners
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Message */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white">
            <p className="text-xl font-medium mb-2">"AI empowers therapists, not replaces them."</p>
            <p className="text-primary-200">Every step of the journey integrates AI intelligence with human expertise.</p>
          </motion.div>
        </div>
      </section>

      {/* Journey Flow */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-calm-300 via-primary-300 to-teal-300 hidden md:block" />

            <div className="space-y-8">
              {userJourneySteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`card hover:shadow-md transition-all ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0 md:mr-auto'} md:max-w-md`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${colorSteps[index]} text-white`}>
                          Step {step.id}
                        </span>
                        <h3 className="font-bold text-calm-900">{step.title}</h3>
                      </div>
                      <p className="text-sm text-calm-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="relative flex-shrink-0 hidden md:flex">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${colorSteps[index]} z-10`}>
                      {iconMap[step.icon]}
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Flow Alternative (Mobile) */}
      <section className="py-12 bg-calm-50 md:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8 md:hidden">Your Journey</h2>
          <div className="flex flex-col gap-4">
            {userJourneySteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 p-4 rounded-2xl ${bgColors[index]}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${colorSteps[index]} flex-shrink-0`}>
                  {iconMap[step.icon]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-calm-400">Step {step.id}</span>
                    <h3 className="font-bold text-calm-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-calm-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Care Highlight */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="section-title">Continuous Care Loop</h2>
            <p className="section-subtitle">The journey never truly ends—it evolves</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity size={28} className="text-teal-600" />
              </div>
              <h3 className="font-bold text-calm-900 mb-2">AI Monitoring</h3>
              <p className="text-sm text-calm-500">Continuous tracking of mood, patterns, and progress indicators</p>
            </div>
            <div className="card text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={28} className="text-primary-600" />
              </div>
              <h3 className="font-bold text-calm-900 mb-2">Between-Session Support</h3>
              <p className="text-sm text-calm-500">AI companion provides 24/7 support between therapy sessions</p>
            </div>
            <div className="card text-center">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-teal-600" />
              </div>
              <h3 className="font-bold text-calm-900 mb-2">Measured Progress</h3>
              <p className="text-sm text-calm-500">Data-driven insights inform therapeutic direction</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Benefits */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="section-title">The Therapino Ecosystem</h2>
            <p className="section-subtitle">A complete support system at every level</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            <motion.div variants={fadeInUp} className="card bg-gradient-to-br from-primary-500 to-primary-700 text-white">
              <User size={28} className="mb-4 opacity-80" />
              <h3 className="font-bold text-lg mb-2">For Users</h3>
              <ul className="space-y-2 text-sm text-primary-100">
                <li>24/7 AI companion support</li>
                <li>Seamless therapist connection</li>
                <li>Progress tracking</li>
                <li>Personalized resources</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="card bg-gradient-to-br from-teal-500 to-teal-700 text-white">
              <Heart size={28} className="mb-4 opacity-80" />
              <h3 className="font-bold text-lg mb-2">For Therapists</h3>
              <ul className="space-y-2 text-sm text-teal-100">
                <li>AI-assisted patient insights</li>
                <li>Risk monitoring alerts</li>
                <li>Session preparation tools</li>
                <li>Outcome tracking</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="card bg-gradient-to-br from-calm-700 to-calm-900 text-white">
              <Brain size={28} className="mb-4 opacity-80" />
              <h3 className="font-bold text-lg mb-2">For RTT Practitioners</h3>
              <ul className="space-y-2 text-sm text-calm-200">
                <li>Belief pattern detection</li>
                <li>Session preparation AI</li>
                <li>Transformation tracking</li>
                <li>Audio program management</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
