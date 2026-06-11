import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Star, Globe, CheckCircle, ArrowLeft, Calendar, Video, MapPin, MessageCircle, Award, ThumbsUp, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { mockPsychologists, mockReviews } from '../data/mockData';

const TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
const DAYS = [{ label: 'Mon', date: 'Jun 24', available: true }, { label: 'Tue', date: 'Jun 25', available: true }, { label: 'Wed', date: 'Jun 26', available: false }, { label: 'Thu', date: 'Jun 27', available: true }, { label: 'Fri', date: 'Jun 28', available: true }, { label: 'Sat', date: 'Jun 29', available: false }, { label: 'Sun', date: 'Jun 30', available: false }];

type BookingStep = 'info' | 'date' | 'time' | 'confirm' | 'success';

export default function PsychologistProfilePage() {
  const { id } = useParams<{ id: string }>();
  const psychologist = mockPsychologists.find((p) => p.id === id) || mockPsychologists[0];
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>('info');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'schedule'>('about');

  const handleBook = () => {
    if (bookingStep === 'confirm') { setBookingStep('success'); setTimeout(() => { setBookingOpen(false); setBookingStep('info'); }, 2500); }
    else { const steps: BookingStep[] = ['info', 'date', 'time', 'confirm']; const cur = steps.indexOf(bookingStep); if (cur < steps.length - 1) setBookingStep(steps[cur + 1]); }
  };

  return (
    <div className="bg-calm-50 min-h-screen">
      <Navbar isLoggedIn />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Link to="/psychologists" className="flex items-center gap-2 text-sm text-calm-500 hover:text-calm-800 mb-6 transition-colors"><ArrowLeft size={14} />Back to List</Link>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-calm-100 shadow-sm overflow-hidden sticky top-24">
              <div className="bg-gradient-to-br from-primary-50 to-teal-50 p-6 text-center">
                <div className="relative inline-block mb-3"><img src={psychologist.avatar} alt={psychologist.name} className="w-20 h-20 rounded-2xl object-cover mx-auto" />{psychologist.verified && (<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center"><CheckCircle size={14} className="text-white" /></div>)}</div>
                <h1 className="text-xl font-bold text-calm-900">{psychologist.name}</h1>
                <p className="text-sm text-calm-500 mb-3">{psychologist.title}</p>
                <div className="flex items-center justify-center gap-1.5"><Star size={14} className="fill-warning-400 text-warning-400" /><span className="font-bold text-calm-800">{psychologist.rating}</span><span className="text-xs text-calm-400">({psychologist.reviewCount} reviews)</span></div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-calm-50 rounded-xl p-3"><p className="text-xl font-bold text-calm-900">{psychologist.experience}</p><p className="text-xs text-calm-500">Years Exp.</p></div>
                  <div className="bg-calm-50 rounded-xl p-3"><p className="text-xl font-bold text-calm-900">{psychologist.reviewCount}</p><p className="text-xs text-calm-500">Clients</p></div>
                </div>
                <div><p className="text-xs font-medium text-calm-600 mb-2">Languages</p><div className="flex gap-2">{psychologist.languages.map((l) => (<span key={l} className="flex items-center gap-1 text-xs bg-calm-100 text-calm-700 px-2 py-1 rounded-full"><Globe size={10} />{l}</span>))}</div></div>
                <div><p className="text-xs font-medium text-calm-600 mb-2">Session Types</p><div className="flex gap-2">{psychologist.sessionTypes.map((t) => (<span key={t} className="flex items-center gap-1 text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">{t === 'Online' ? <Video size={10} /> : <MapPin size={10} />}{t}</span>))}</div></div>
                <div className="border-t border-calm-100 pt-4"><div className="flex justify-between items-center mb-4"><span className="text-sm text-calm-600">Session Fee</span><span className="font-bold text-calm-900">${psychologist.sessionPrice}</span></div><button onClick={() => setBookingOpen(true)} className="w-full btn-primary flex items-center justify-center gap-2"><Calendar size={16} />Book Session</button><button className="w-full mt-2 btn-secondary flex items-center justify-center gap-2"><MessageCircle size={16} />Send Message</button></div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-calm-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-calm-100">{(['about', 'reviews', 'schedule'] as const).map((tab) => { const labels = { about: 'About', reviews: 'Reviews', schedule: 'Schedule' }; return (<button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3.5 text-sm font-medium transition-all ${activeTab === tab ? 'text-primary-600 border-b-2 border-primary-600' : 'text-calm-500 hover:text-calm-700'}`}>{labels[tab]}</button>); })}</div>
              <div className="p-6">
                {activeTab === 'about' && (<div className="space-y-5"><div><h3 className="font-bold text-calm-900 mb-3">About</h3><p className="text-sm text-calm-600 leading-relaxed">{psychologist.bio}</p></div><div><h3 className="font-bold text-calm-900 mb-3">Specialties</h3><div className="flex flex-wrap gap-2">{psychologist.specialties.map((s) => (<span key={s} className="bg-primary-50 text-primary-600 px-3 py-1.5 rounded-xl text-sm">{s}</span>))}</div></div><div><h3 className="font-bold text-calm-900 mb-3">Education</h3><ul className="space-y-2">{psychologist.education.map((e) => (<li key={e} className="flex items-start gap-2 text-sm text-calm-600"><Award size={14} className="text-primary-400 mt-0.5 flex-shrink-0" />{e}</li>))}</ul></div></div>)}
                {activeTab === 'reviews' && (<div className="space-y-4"><div className="flex items-center gap-4 p-4 bg-calm-50 rounded-xl mb-5"><div className="text-center"><div className="text-4xl font-bold text-calm-900">{psychologist.rating}</div><div className="flex gap-0.5 justify-center mt-1">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={12} className={i < Math.round(psychologist.rating) ? 'fill-warning-400 text-warning-400' : 'text-calm-300'} />))}</div><p className="text-xs text-calm-500 mt-1">{psychologist.reviewCount} reviews</p></div><div className="flex-1 space-y-1.5">{[5, 4, 3, 2, 1].map((r) => (<div key={r} className="flex items-center gap-2"><span className="text-xs text-calm-500 w-4">{r}</span><div className="flex-1 h-1.5 bg-calm-200 rounded-full overflow-hidden"><div className="h-full bg-warning-400 rounded-full" style={{ width: r === 5 ? '75%' : r === 4 ? '18%' : '5%' }} /></div></div>))}</div></div>{[...mockReviews, ...mockReviews].slice(0, 4).map((r, i) => (<div key={i} className="pb-4 border-b border-calm-100 last:border-0"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-600">{r.userName.slice(0, 1)}</div><span className="text-sm font-medium text-calm-800">{r.userName}</span></div><div className="flex items-center gap-1">{Array.from({ length: r.rating }).map((_, i) => (<Star key={i} size={11} className="fill-warning-400 text-warning-400" />))}</div></div><p className="text-sm text-calm-600 leading-relaxed">{r.text}</p><div className="flex items-center justify-between mt-2"><span className="text-xs text-calm-400">{r.date}</span><button className="flex items-center gap-1 text-xs text-calm-400 hover:text-calm-600"><ThumbsUp size={12} />{r.helpful}</button></div></div>))}</div>)}
                {activeTab === 'schedule' && (<div><h3 className="font-bold text-calm-900 mb-4">Available Times</h3><div className="grid grid-cols-7 gap-2 mb-5">{DAYS.map((day) => (<div key={day.label} className={`text-center p-2 rounded-xl ${day.available ? 'bg-primary-50 border border-primary-200' : 'bg-calm-100 opacity-50'}`}><p className="text-xs text-calm-500">{day.label}</p><p className="text-sm font-semibold text-calm-800 mt-0.5">{day.date}</p>{day.available && <div className="w-1.5 h-1.5 rounded-full bg-success-500 mx-auto mt-1" />}</div>))}</div><div className="grid grid-cols-4 gap-2">{TIMES.map((time) => (<button key={time} className="text-center py-2 rounded-xl bg-calm-50 border border-calm-200 text-sm text-calm-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 transition-all">{time}</button>))}</div><button onClick={() => setBookingOpen(true)} className="w-full mt-5 btn-primary flex items-center justify-center gap-2"><Calendar size={16} />Book Session</button></div>)}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {bookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-calm-900/50 backdrop-blur-sm" onClick={() => setBookingOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10">
              {bookingStep === 'success' ? (<div className="p-10 text-center"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-success-600" /></motion.div><h3 className="text-xl font-bold text-calm-900 mb-2">Session Booked!</h3><p className="text-sm text-calm-500">Confirmation will be sent via SMS.</p></div>) : (<><div className="flex items-center justify-between px-6 py-4 border-b border-calm-100"><h3 className="font-bold text-calm-900">Book Session</h3><button onClick={() => setBookingOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-calm-100 text-calm-400"><X size={18} /></button></div><div className="flex gap-1 px-6 pt-4">{['Info', 'Date', 'Time', 'Confirm'].map((s, i) => { const steps: BookingStep[] = ['info', 'date', 'time', 'confirm']; const done = steps.indexOf(bookingStep) >= i; return (<div key={s} className="flex-1"><div className={`h-1.5 rounded-full ${done ? 'bg-primary-500' : 'bg-calm-200'}`} /><p className={`text-xs mt-1 text-center ${done ? 'text-primary-600' : 'text-calm-400'}`}>{s}</p></div>); })}</div><div className="p-6">
                  {bookingStep === 'info' && (<div><div className="flex items-center gap-3 mb-5 p-4 bg-calm-50 rounded-xl"><img src={psychologist.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" /><div><p className="font-semibold text-calm-800">{psychologist.name}</p><p className="text-xs text-calm-500">{psychologist.title}</p></div></div><div className="space-y-4"><div><label className="block text-sm font-medium text-calm-700 mb-1.5">Session Type</label><div className="grid grid-cols-2 gap-3">{psychologist.sessionTypes.map((t) => (<label key={t} className="flex items-center justify-center gap-2 border-2 border-calm-200 rounded-xl p-3 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all text-sm"><input type="radio" name="sessionType" value={t} />{t === 'Online' ? <Video size={14} /> : <MapPin size={14} />}{t}</label>))}</div></div><div><label className="block text-sm font-medium text-calm-700 mb-1.5">Session Topic (optional)</label><textarea className="input-field resize-none" rows={3} placeholder="Briefly describe your concerns..." /></div></div></div>)}
                  {bookingStep === 'date' && (<div><h4 className="font-semibold text-calm-800 mb-4">Select Date</h4><div className="grid grid-cols-4 gap-2">{DAYS.map((day) => (<button key={day.label} disabled={!day.available} onClick={() => setSelectedDay(day.date)} className={`text-center p-3 rounded-xl border-2 transition-all ${!day.available ? 'opacity-40 cursor-not-allowed border-calm-100 bg-calm-50' : selectedDay === day.date ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-calm-200 hover:border-primary-300'}`}><p className="text-xs text-calm-500">{day.label}</p><p className="text-sm font-semibold mt-0.5">{day.date}</p></button>))}</div></div>)}
                  {bookingStep === 'time' && (<div><h4 className="font-semibold text-calm-800 mb-4">Select Time ({selectedDay})</h4><div className="grid grid-cols-4 gap-2">{TIMES.map((time) => (<button key={time} onClick={() => setSelectedTime(time)} className={`text-center py-3 rounded-xl border-2 text-sm transition-all ${selectedTime === time ? 'border-primary-500 bg-primary-50 text-primary-700 font-semibold' : 'border-calm-200 hover:border-primary-300'}`}>{time}</button>))}</div></div>)}
                  {bookingStep === 'confirm' && (<div><h4 className="font-semibold text-calm-800 mb-4">Confirm Booking</h4><div className="bg-calm-50 rounded-xl p-4 space-y-3 mb-4">{[{ label: 'Specialist', value: psychologist.name }, { label: 'Date', value: selectedDay || '—' }, { label: 'Time', value: selectedTime || '—' }, { label: 'Duration', value: '60 minutes' }, { label: 'Fee', value: `$${psychologist.sessionPrice}` }].map(({ label, value }) => (<div key={label} className="flex justify-between text-sm"><span className="text-calm-500">{label}</span><span className="font-medium text-calm-800">{value}</span></div>))}</div><div className="flex gap-2"><div className="flex-1 bg-primary-50 border border-primary-200 rounded-xl p-3 text-center text-xs text-primary-700">Pay with Card</div><div className="flex-1 bg-teal-50 border border-teal-200 rounded-xl p-3 text-center text-xs text-teal-700">Pay with Wallet</div></div></div>)}
              </div>
              <div className="border-t border-calm-100 px-6 py-4 flex gap-3">
                {bookingStep !== 'info' && (<button onClick={() => { const steps: BookingStep[] = ['info', 'date', 'time', 'confirm']; const cur = steps.indexOf(bookingStep); if (cur > 0) setBookingStep(steps[cur - 1]); }} className="flex items-center gap-2 px-5 py-2.5 border border-calm-200 rounded-xl text-sm text-calm-600 hover:bg-calm-50"><ChevronRight size={16} />Back</button>)}
                <button onClick={handleBook} className="flex-1 btn-primary flex items-center justify-center gap-2">{bookingStep === 'confirm' ? 'Confirm & Pay' : 'Next'}{bookingStep !== 'confirm' && <ChevronLeft size={16} />}</button>
              </div></>)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
