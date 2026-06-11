import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-28 pb-12 bg-mesh bg-calm-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="badge-primary mb-4 mx-auto w-fit">Privacy & Security</motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl font-bold text-calm-900 mb-4">Protecting Your Information</motion.h1>
            <motion.p variants={fadeInUp} className="text-calm-500 text-lg leading-relaxed">At Therapino, your privacy is a right, not a privilege. We adhere to the strictest security standards.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[{ icon: Lock, title: 'End-to-End Encryption', desc: 'All your conversations are protected with the strongest encryption algorithms', color: 'bg-primary-100 text-primary-600' }, { icon: Server, title: 'Secure Servers', desc: 'Data stored in secure US-based servers with strict compliance', color: 'bg-teal-100 text-teal-600' }, { icon: Eye, title: 'Zero Access Policy', desc: 'No employee can access conversation content without your explicit permission', color: 'bg-success-100 text-success-600' }, { icon: Users, title: 'Full Control', desc: 'You can view, edit, or delete your data anytime', color: 'bg-warning-100 text-warning-600' }, { icon: Shield, title: 'Security Audits', desc: 'Our systems are regularly reviewed by independent security firms', color: 'bg-primary-100 text-primary-600' }, { icon: AlertTriangle, title: 'Breach Notification', desc: 'In case of any security breach, we notify you within 72 hours', color: 'bg-error-100 text-error-600' }].map(({ icon: Icon, title, desc, color }) => (<motion.div key={title} variants={fadeInUp} className="card"><div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}`}><Icon size={22} /></div><h3 className="font-bold text-calm-900 mb-2">{title}</h3><p className="text-sm text-calm-500 leading-relaxed">{desc}</p></motion.div>))}
          </motion.div>

          <div className="space-y-8">{[{ title: 'What information do we collect?', content: 'We collect registration information (name, phone, email), assessment results, AI conversation content, and platform usage data. We never store detailed medical information without your explicit consent.' }, { title: 'How do we use your information?', content: 'Your information is used solely to provide personalized services, improve AI models (completely anonymously), and connect you with selected psychologists. Your information is never shared for advertising or sold to third parties.' }, { title: 'AI Limitations', content: 'Therapino\'s AI is a supportive tool and does not replace psychologists or psychiatrists. In emergency cases, serious psychological disorders, or medication needs, always consult with a human specialist. AI may make errors.' }, { title: 'Referral Process', content: 'When the AI detects signs of crisis, severe anxiety, acute depression, or any condition requiring human intervention, it immediately suggests the user speak with a psychologist. This referral is made supportively and without pressure.' }].map(({ title, content }) => (<motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-calm-200 rounded-2xl p-6"><h3 className="text-lg font-bold text-calm-900 mb-3 flex items-center gap-2"><CheckCircle size={18} className="text-teal-500" />{title}</h3><p className="text-calm-600 leading-relaxed text-sm">{content}</p></motion.div>))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
