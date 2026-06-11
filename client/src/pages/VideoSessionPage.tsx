import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor, MessageCircle, FileText, Clock, User, Brain } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { mockPsychologists } from '../data/mockData';

export default function VideoSessionPage() {
  const { id } = useParams<{ id: string }>();
  const psychologist = mockPsychologists.find((p) => p.id === id) || mockPsychologists[0];
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [activePanel, setActivePanel] = useState<'notes' | 'resources' | 'chat'>('notes');
  const [sessionTime] = useState('12:35');

  return (
    <div className="min-h-screen bg-calm-900 flex flex-col">
      <Navbar isLoggedIn />
      <div className="flex-1 flex pt-16">
        <div className="flex-1 flex flex-col p-4 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-calm-800 rounded-xl px-4 py-2"><div className="w-2 h-2 rounded-full bg-error-500 animate-pulse" /><span className="text-white text-sm font-medium">Recording</span></div>
              <div className="flex items-center gap-2 bg-calm-800 rounded-xl px-4 py-2"><Clock size={14} className="text-calm-300" /><span className="text-white text-sm font-mono">{sessionTime}</span></div>
            </div>
            <div className="text-calm-400 text-sm">Session with {psychologist.name}</div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="relative bg-calm-800 rounded-2xl overflow-hidden"><img src={psychologist.avatar} alt={psychologist.name} className="w-full h-full object-cover opacity-60" /><div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><img src={psychologist.avatar} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border-2 border-white/20" /><p className="text-white font-medium text-sm">{psychologist.name}</p><p className="text-calm-400 text-xs">{psychologist.title}</p></div></div><div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 rounded-full px-2 py-1"><Mic size={11} className="text-white" /><span className="text-white text-xs">Therapist audio</span></div></div>
            <div className="relative bg-calm-800 rounded-2xl overflow-hidden flex items-center justify-center">{camOn ? (<div className="w-full h-full bg-gradient-to-br from-calm-700 to-calm-800 flex items-center justify-center"><div className="text-center"><User size={40} className="text-calm-400 mx-auto mb-2" /><p className="text-calm-400 text-sm">You</p></div></div>) : (<div className="flex flex-col items-center gap-2"><VideoOff size={32} className="text-calm-500" /><p className="text-calm-400 text-sm">Camera is off</p></div>)}<div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/40 rounded-full px-2 py-1">{micOn ? <Mic size={11} className="text-white" /> : <MicOff size={11} className="text-error-400" />}<span className="text-white text-xs">You</span></div></div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4">
            <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-calm-700 text-white hover:bg-calm-600' : 'bg-error-500 text-white hover:bg-error-600'}`}>{micOn ? <Mic size={20} /> : <MicOff size={20} />}</button>
            <button onClick={() => setCamOn(!camOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${camOn ? 'bg-calm-700 text-white hover:bg-calm-600' : 'bg-error-500 text-white hover:bg-error-600'}`}>{camOn ? <Video size={20} /> : <VideoOff size={20} />}</button>
            <button className="w-12 h-12 rounded-full bg-calm-700 text-white hover:bg-calm-600 flex items-center justify-center transition-all"><Monitor size={20} /></button>
            <button className="w-14 h-14 rounded-full bg-error-500 text-white hover:bg-error-600 flex items-center justify-center transition-all shadow-lg"><PhoneOff size={22} /></button>
            {(['notes', 'resources', 'chat'] as const).map((panel) => { const icons = { notes: FileText, resources: Brain, chat: MessageCircle }; const Icon = icons[panel]; return (<button key={panel} onClick={() => setActivePanel(panel)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activePanel === panel ? 'bg-primary-600 text-white' : 'bg-calm-700 text-calm-300 hover:bg-calm-600'}`}><Icon size={18} /></button>); })}
          </motion.div>
        </div>

        <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 300, opacity: 1 }} className="bg-white border-r border-calm-200 flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-calm-100"><div className="flex items-center gap-2 text-sm font-semibold text-calm-800">{activePanel === 'notes' && <><FileText size={16} className="text-primary-600" />Session Notes</>}{activePanel === 'resources' && <><Brain size={16} className="text-primary-600" />Suggested Resources</>}{activePanel === 'chat' && <><MessageCircle size={16} className="text-primary-600" />Messages</>}</div></div>
          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === 'notes' && (<div><textarea className="w-full h-48 text-sm text-calm-700 border border-calm-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary-300" placeholder="Write your session notes here..." /><div className="mt-4"><p className="text-xs font-medium text-calm-600 mb-3">Previous session summary</p><div className="bg-calm-50 rounded-xl p-3 text-xs text-calm-600 leading-relaxed">Last session: Work anxiety and sleep issues were discussed. 4-7-8 breathing technique was recommended.</div></div></div>)}
            {activePanel === 'resources' && (<div className="space-y-3"><p className="text-xs text-calm-500">Suggested resources based on session topic</p>{['Anxiety reduction techniques', 'Sleep hygiene', 'Meditation for beginners', 'Work stress management'].map((r) => (<div key={r} className="bg-calm-50 rounded-xl p-3 flex items-center gap-2 text-sm text-calm-700 cursor-pointer hover:bg-primary-50 transition-colors"><Brain size={14} className="text-primary-400" />{r}</div>))}</div>)}
            {activePanel === 'chat' && (<div className="flex flex-col h-full"><div className="flex-1 space-y-3 mb-4">{[{ role: 'assistant', text: 'Hi! Session started. How are you feeling?' }, { role: 'user', text: 'Hi. I feel better than last time.' }, { role: 'assistant', text: 'Glad to hear. Let\'s continue from where we left off.' }].map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'flex-row-reverse' : ''} gap-2`}><div className={`max-w-xs px-3 py-2 rounded-xl text-xs ${m.role === 'user' ? 'bg-primary-600 text-white' : 'bg-calm-100 text-calm-700'}`}>{m.text}</div></div>))}</div><div className="flex gap-2"><input className="flex-1 border border-calm-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary-300" placeholder="Message..." /><button className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center text-white hover:bg-primary-700"><MessageCircle size={14} /></button></div></div>)}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
