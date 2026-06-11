import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, ArrowRight, HelpCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const plans = [
  { id: 'free', name: 'Free', price: '$0', period: '', badge: null, color: 'border-calm-200', buttonClass: 'btn-secondary', description: 'Start exploring Therapino', features: [{ text: '5 AI conversations per month', included: true }, { text: 'Initial personality assessment', included: true }, { text: 'Access to basic resources', included: true }, { text: 'Monthly wellness report', included: false }, { text: 'Psychologist sessions', included: false }, { text: 'Priority support', included: false }, { text: 'Advanced progress tracking', included: false }] },
  { id: 'pro', name: 'Professional', price: '$29', period: '/ month', badge: 'Most Popular', color: 'border-primary-400 ring-2 ring-primary-100', buttonClass: 'btn-primary', description: 'For consistent and serious use', features: [{ text: 'Unlimited AI conversations', included: true }, { text: 'Full personality assessment', included: true }, { text: 'Access to all resources', included: true }, { text: 'Weekly wellness report', included: true }, { text: '2 psychologist sessions/month', included: true }, { text: 'Priority support', included: true }, { text: 'Advanced progress tracking', included: false }] },
  { id: 'premium', name: 'Premium', price: '$59', period: '/ month', badge: 'Complete', color: 'border-teal-400', buttonClass: 'btn-teal', description: 'The best possible experience', features: [{ text: 'Unlimited AI conversations', included: true }, { text: 'Full assessment + refresh', included: true }, { text: 'Access to all resources', included: true }, { text: 'Daily wellness report', included: true }, { text: 'Unlimited psychologist sessions', included: true }, { text: '24/7 support', included: true }, { text: 'Advanced tracking + AI coach', included: true }] },
];

const comparisonFeatures = [{ name: 'AI Chat', free: '5 times', pro: 'Unlimited', premium: 'Unlimited' }, { name: 'Psychologist Sessions', free: '—', pro: '2/month', premium: 'Unlimited' }, { name: 'Educational Resources', free: 'Basic', pro: 'Full', premium: 'Full + Exclusive' }, { name: 'Wellness Report', free: '—', pro: 'Weekly', premium: 'Daily' }, { name: 'Support', free: 'Email', pro: 'Priority', premium: '24/7' }, { name: 'Crisis Detection', free: '✓', pro: '✓', premium: '✓' }, { name: 'Progress Tracking', free: 'Basic', pro: 'Advanced', premium: 'AI Coach' }];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-28 pb-12 bg-mesh bg-calm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="badge-primary mb-4 mx-auto w-fit">Pricing</motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl font-bold text-calm-900 mb-4">Invest in Your Mental Health</motion.h1>
            <motion.p variants={fadeInUp} className="text-calm-500 text-lg max-w-xl mx-auto mb-8">Choose the plan that's right for you. All plans include a 7-day free trial.</motion.p>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 bg-calm-100 rounded-2xl p-1.5">
              <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${!annual ? 'bg-white shadow-sm text-calm-800' : 'text-calm-500'}`}>Monthly</button>
              <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${annual ? 'bg-white shadow-sm text-calm-800' : 'text-calm-500'}`}>Annual<span className="bg-success-100 text-success-700 text-xs px-2 py-0.5 rounded-full font-semibold">20% OFF</span></button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">{plans.map((plan) => (<motion.div key={plan.id} variants={fadeInUp} className="relative">{plan.badge && (<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm z-10">{plan.badge}</div>)}<div className={`card h-full flex flex-col border-2 ${plan.color}`}><div className="mb-6"><h3 className="text-xl font-bold text-calm-900 mb-1">{plan.name}</h3><p className="text-sm text-calm-500">{plan.description}</p></div><div className="mb-6"><div className="flex items-end gap-1"><span className="text-3xl font-bold text-calm-900">{annual && plan.price !== '$0' ? `$${Math.round(Number(plan.price.replace('$', '')) * 0.8)}` : plan.price}</span><span className="text-sm text-calm-500 mb-1">{plan.period}</span></div>{plan.price !== '$0' && annual && (<p className="text-xs text-success-600 mt-1">Instead of {plan.price}{plan.period}</p>)}</div><ul className="space-y-3 mb-8 flex-1">{plan.features.map(({ text, included }) => (<li key={text} className="flex items-center gap-2.5">{included ? <Check size={16} className="text-teal-500 flex-shrink-0" /> : <div className="w-4 h-4 rounded-full bg-calm-200 flex-shrink-0" />}<span className={`text-sm ${included ? 'text-calm-700' : 'text-calm-400 line-through'}`}>{text}</span></li>))}</ul><button className={`w-full flex items-center justify-center gap-2 ${plan.buttonClass}`}>{plan.price === '$0' ? 'Start Free' : 'Start Trial'}<ArrowRight size={16} /></button></div></motion.div>))}</motion.div>
        </div>
      </section>

      <section className="py-16 bg-calm-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-10"><motion.h2 variants={fadeInUp} className="text-2xl font-bold text-calm-900 mb-3">Compare Plans</motion.h2></motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl border border-calm-200 overflow-hidden">
            <div className="grid grid-cols-4 bg-calm-50 border-b border-calm-200"><div className="p-4 font-semibold text-calm-600 text-sm">Feature</div>{['Free', 'Professional', 'Premium'].map((p) => (<div key={p} className="p-4 font-semibold text-calm-900 text-sm text-center">{p}</div>))}</div>
            {comparisonFeatures.map((f, i) => (<div key={f.name} className={`grid grid-cols-4 border-b border-calm-100 ${i % 2 === 0 ? '' : 'bg-calm-50/50'}`}><div className="p-4 text-sm text-calm-700">{f.name}</div><div className="p-4 text-sm text-calm-600 text-center">{f.free}</div><div className="p-4 text-sm text-primary-700 font-medium text-center">{f.pro}</div><div className="p-4 text-sm text-teal-700 font-medium text-center">{f.premium}</div></div>))}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">{[{ icon: Shield, title: 'Full Security', desc: 'End-to-end encryption for all data' }, { icon: Zap, title: 'Easy Cancellation', desc: 'Cancel anytime without penalties' }, { icon: Star, title: 'Money-Back Guarantee', desc: 'Not satisfied in 7 days? Money back' }].map(({ icon: Icon, title, desc }) => (<motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center gap-3"><div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center"><Icon size={22} className="text-primary-600" /></div><h4 className="font-bold text-calm-900">{title}</h4><p className="text-sm text-calm-500">{desc}</p></motion.div>))}</div>
        </div>
      </section>

      <section className="py-16 bg-calm-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-calm-900 mb-8 text-center">Pricing FAQ</h2>
          <div className="space-y-4">{[{ q: 'Do I need a credit card to start?', a: 'No. The free plan is available without any payment information.' }, { q: 'How does subscription renewal work?', a: 'Subscriptions renew automatically. You\'ll receive a reminder 3 days before renewal.' }, { q: 'Can I change my plan?', a: 'Yes, you can upgrade or downgrade anytime through your dashboard.' }, { q: 'Is there a student discount?', a: 'Yes, get 30% off with a valid student ID.' }].map((faq, i) => (<div key={i} className="bg-white rounded-2xl p-5 border border-calm-200"><div className="flex items-start gap-3"><HelpCircle size={18} className="text-primary-400 mt-0.5 flex-shrink-0" /><div><p className="font-semibold text-calm-800 mb-2">{faq.q}</p><p className="text-sm text-calm-500">{faq.a}</p></div></div></div>))}</div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
