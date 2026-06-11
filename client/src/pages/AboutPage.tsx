import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield, Users, Brain, CheckCircle, Star } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const teamMembers = [
  { name: 'Dr. Nina Rostami', role: 'CEO & Founder', specialty: 'Clinical Psychologist with 15 years experience', avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200', bio: 'Ph.D. in Clinical Psychology from Stanford. Pioneer in combining technology with mental health care.' },
  { name: 'Kevin Sadeghi', role: 'CTO', specialty: 'AI & ML Specialist', avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200', bio: '10 years experience developing AI systems for healthcare.' },
  { name: 'Sepideh Kamali', role: 'Lead Psychologist', specialty: 'CBT & Trauma Therapy Specialist', avatar: 'https://images.pexels.com/photos/5324986/pexels-photo-5324986.jpeg?auto=compress&cs=tinysrgb&w=200', bio: 'Over 12 years experience in psychotherapy. Scientific advisor to the team.' },
  { name: 'Amir Hosseini', role: 'UX Designer', specialty: 'Health UX & Human-Centered Design', avatar: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=200', bio: 'Designer specializing in healthcare and therapeutic user interfaces.' },
];

const values = [
  { icon: Heart, title: 'Empathy', desc: 'Every interaction is done with real understanding and care', color: 'text-error-500 bg-error-50' },
  { icon: Shield, title: 'Security', desc: 'Your privacy is our top priority', color: 'text-primary-600 bg-primary-50' },
  { icon: Brain, title: 'Evidence-Based', desc: 'Approaches grounded in scientific evidence', color: 'text-teal-600 bg-teal-50' },
  { icon: Target, title: 'Accessibility', desc: 'Mental health is everyone\'s right', color: 'text-success-600 bg-success-50' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-28 pb-16 bg-mesh bg-calm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="badge-primary mb-4 mx-auto w-fit">About Therapino</motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold text-calm-900 mb-6">Our Story is About <span className="text-gradient">Care</span></motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-calm-500 leading-relaxed">Therapino was built with the belief that everyone, regardless of circumstance, should have access to mental health support.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[{ icon: Target, title: 'Our Mission', color: 'from-primary-500 to-primary-700', content: 'To democratize access to mental health through intelligent combination of AI technology and licensed psychologist expertise, so everyone can benefit from professional support anytime, anywhere.' }, { icon: Eye, title: 'Our Vision', color: 'from-teal-500 to-teal-700', content: 'A world where mental health is taken as seriously as physical health. A future where no one faces their psychological challenges alone.' }].map(({ icon: Icon, title, color, content }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-3xl overflow-hidden">
                <div className={`bg-gradient-to-br ${color} p-8 text-white`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4"><Icon size={24} /></div>
                  <h3 className="text-2xl font-bold mb-3">{title}</h3>
                  <p className="text-white/90 leading-relaxed">{content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-calm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeInUp} className="section-title">Our Values</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">Principles that guide our every step</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{values.map(({ icon: Icon, title, desc, color }) => (<motion.div key={title} variants={fadeInUp} className="card text-center"><div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto ${color}`}><Icon size={26} /></div><h3 className="text-xl font-bold text-calm-900 mb-2">{title}</h3><p className="text-sm text-calm-500">{desc}</p></motion.div>))}</motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeInUp} className="section-title">Our Team</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">Specialists who want to make a difference</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{teamMembers.map((m) => (<motion.div key={m.name} variants={fadeInUp} className="card-hover text-center"><img src={m.avatar} alt={m.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4" /><h3 className="font-bold text-calm-900 mb-1">{m.name}</h3><p className="text-sm text-primary-600 font-medium mb-2">{m.role}</p><p className="text-xs text-calm-400 mb-3">{m.specialty}</p><p className="text-sm text-calm-500 leading-relaxed">{m.bio}</p></motion.div>))}</motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="section-title">AI & Psychologist Collaboration</motion.h2>
            <motion.p variants={fadeInUp} className="text-calm-500 leading-relaxed max-w-2xl mx-auto">At Therapino, AI never replaces humans. Instead, it's a tool that empowers specialists to do their work better.</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6">
            {[{ title: 'AI Role', points: ['24/7 initial support', 'Initial symptom assessment', 'Crisis detection', 'Personalized recommendations', 'Referral to appropriate specialist'], gradient: 'from-primary-600 to-primary-800', icon: Brain }, { title: 'Psychologist Role', points: ['Professional disorder diagnosis', 'Complex treatment', 'Final review of AI reports', 'In-depth therapy sessions', 'Serious psychological crises'], gradient: 'from-teal-600 to-teal-800', icon: Users }].map(({ title, points, gradient, icon: Icon }) => (<motion.div key={title} variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-calm-100 p-6"><div className={`inline-flex items-center gap-2 bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded-xl mb-5`}><Icon size={16} /><span className="font-semibold text-sm">{title}</span></div><ul className="space-y-2.5">{points.map((p) => (<li key={p} className="flex items-center gap-2 text-sm text-calm-700"><CheckCircle size={14} className="text-teal-500 flex-shrink-0" />{p}</li>))}</ul></motion.div>))}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-calm-700 mb-8">Awards & Certifications</motion.h3>
            <motion.div variants={stagger} className="flex flex-wrap justify-center gap-8">{['Best Health Startup 2024', 'Innovation in Healthcare Award', 'Licensed Psychology Association Approval', 'Best Mental Health App'].map((award) => (<motion.div key={award} variants={fadeInUp} className="flex items-center gap-2 bg-warning-50 border border-warning-200 px-4 py-2.5 rounded-xl"><Star size={14} className="text-warning-500" /><span className="text-sm font-medium text-warning-800">{award}</span></motion.div>))}</motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
