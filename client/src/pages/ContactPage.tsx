import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-28 pb-12 bg-mesh bg-calm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="badge-teal mb-4 mx-auto w-fit">Contact Us</motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl font-bold text-calm-900 mb-4">We're Here to Help</motion.h1>
            <motion.p variants={fadeInUp} className="text-calm-500 text-lg max-w-xl mx-auto">Have questions or suggestions? Get in touch. Our team responds in the shortest time.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-calm-900 mb-8">Contact Information</motion.h2>
              <div className="space-y-6 mb-10">
                {[{ icon: Phone, title: 'Phone', value: '+1 (555) 423-4567', sub: 'Saturday to Thursday, 8 AM to 8 PM', color: 'bg-primary-100 text-primary-600' }, { icon: Mail, title: 'Email', value: 'support@therapino.com', sub: 'Response within 24 hours', color: 'bg-teal-100 text-teal-600' }, { icon: MapPin, title: 'Address', value: '123 Wellness Ave, Suite 400', sub: 'San Francisco, CA 94102', color: 'bg-warning-100 text-warning-600' }, { icon: Clock, title: 'Working Hours', value: 'Saturday to Thursday', sub: '8:00 AM - 8:00 PM', color: 'bg-success-100 text-success-600' }].map(({ icon: Icon, title, value, sub, color }) => (<motion.div key={title} variants={fadeInUp} className="flex items-start gap-4"><div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}><Icon size={20} /></div><div><p className="text-xs text-calm-400 mb-0.5">{title}</p><p className="font-semibold text-calm-800">{value}</p><p className="text-sm text-calm-500">{sub}</p></div></motion.div>))}
              </div>
              <motion.div variants={fadeInUp}>
                <h3 className="font-semibold text-calm-800 mb-4">Support Channels</h3>
                <div className="space-y-3">{[{ title: 'Live Chat Support', desc: 'For Professional subscription users', badge: 'Pro', badgeColor: 'badge-primary' }, { title: 'Crisis Support', desc: 'Dedicated psychological emergency line', badge: '24/7', badgeColor: 'badge-teal' }, { title: 'Community Forum', desc: 'Talk with other users', badge: 'Public', badgeColor: 'badge-success' }].map(({ title, desc, badge, badgeColor }) => (<div key={title} className="flex items-center justify-between p-4 bg-calm-50 rounded-xl"><div className="flex items-center gap-3"><MessageCircle size={16} className="text-calm-400" /><div><p className="text-sm font-medium text-calm-800">{title}</p><p className="text-xs text-calm-500">{desc}</p></div></div><span className={badgeColor}>{badge}</span></div>))}</div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="card">{!submitted ? (<><h2 className="text-2xl font-bold text-calm-900 mb-6">Send a Message</h2><form onSubmit={handleSubmit} className="space-y-5"><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-calm-700 mb-1.5">First Name</label><input type="text" placeholder="Your first name" className="input-field" /></div><div><label className="block text-sm font-medium text-calm-700 mb-1.5">Last Name</label><input type="text" placeholder="Your last name" className="input-field" /></div></div><div><label className="block text-sm font-medium text-calm-700 mb-1.5">Email</label><input type="email" placeholder="example@email.com" className="input-field" /></div><div><label className="block text-sm font-medium text-calm-700 mb-1.5">Subject</label><select className="input-field"><option>Select...</option><option>Technical Question</option><option>Account Support</option><option>Feedback</option><option>Partnership</option><option>Other</option></select></div><div><label className="block text-sm font-medium text-calm-700 mb-1.5">Message</label><textarea rows={5} placeholder="Write your message here..." className="input-field resize-none" /></div><button type="submit" className="w-full btn-primary flex items-center justify-center gap-2"><Send size={16} />Send Message</button></form></>) : (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-12 text-center"><div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4"><CheckCircle size={32} className="text-success-600" /></div><h3 className="text-xl font-bold text-calm-900 mb-2">Message Sent!</h3><p className="text-calm-500 mb-6">Our team will respond within 24 hours.</p><button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another Message</button></motion.div>)}</div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
