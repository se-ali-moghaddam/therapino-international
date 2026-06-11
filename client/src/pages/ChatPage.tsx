import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Brain, Plus, ChevronRight, Sparkles, AlertTriangle, Phone, MessageCircle, User, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { mockAIMessages, mockChatHistory, mockUserProfile, mockPersonalityProfiles } from '../data/mockData';

type Message = { id: string; role: 'assistant' | 'user'; content: string; time: string; suggestions?: string[] };

const crisisKeywords = ['suicide', 'kill myself', 'self-harm', 'hopeless', 'meaningless', 'want to die', 'end it all'];

function detectCrisis(text: string): boolean { return crisisKeywords.some((kw) => text.toLowerCase().includes(kw)); }

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0"><Brain size={14} className="text-white" /></div>
      <div className="bg-primary-50 rounded-2xl rounded-tl-sm px-4 py-3"><div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce" style={{ animationDelay: '0ms' }} /><div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockAIMessages as Message[]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const user = mockUserProfile;
  const profile = mockPersonalityProfiles[user.personalityType];

  const aiReplies = [
    'Thank you for sharing that with me. I\'d like to understand more about this feeling. Can you tell me more?',
    'That shows good self-awareness. Your feelings are completely valid. Let\'s explore this together.',
    'I understand. This is a common challenge that many people face. I\'ll help you take a step forward.',
    'I\'m glad you shared this with me. With some work on this topic, we can make a difference. I have a question...',
    'To help you better, I\'d like to know how long you\'ve been feeling this way?',
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    if (detectCrisis(input)) setShowCrisis(true);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), suggestions: Math.random() > 0.5 ? ['Yes, exactly', 'No, a bit different', 'Let me explain more'] : undefined };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1800);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar isLoggedIn />
      <div className="flex flex-1 overflow-hidden pt-16">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="border-r border-calm-100 bg-calm-50 flex flex-col overflow-hidden hidden lg:flex">
              <div className="p-4 border-b border-calm-100"><button className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-primary-700 transition-colors"><Plus size={16} />New Chat</button></div>
              {profile && (<div className="p-4 border-b border-calm-100"><div className="bg-gradient-to-br from-primary-50 to-teal-50 rounded-xl p-3"><p className="text-xs text-calm-500 mb-1">Your Communication Style</p><p className="text-sm font-semibold text-primary-700">{profile.type} ({profile.code})</p><p className="text-xs text-calm-500 mt-1 leading-relaxed line-clamp-2">{profile.communicationStyle}</p></div></div>)}
              <div className="flex-1 overflow-y-auto p-4"><p className="text-xs font-medium text-calm-400 mb-3">Recent Chats</p><div className="space-y-2">{mockChatHistory.map((chat) => (<button key={chat.id} className="w-full text-left p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"><p className="text-sm font-medium text-calm-700 truncate">{chat.title}</p><p className="text-xs text-calm-400 mt-0.5">{chat.date}</p></button>))}</div></div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-calm-100 px-4 py-3 flex items-center gap-3 bg-white">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-calm-100 transition-colors text-calm-400"><ChevronRight size={18} className={`transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} /></button>
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center"><Brain size={18} className="text-white" /></div>
            <div className="flex-1"><p className="font-semibold text-calm-800 text-sm">Therapino AI Assistant</p><div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse-soft" /><span className="text-xs text-success-600">Online</span></div></div>
            <div className="flex items-center gap-2"><span className="badge bg-primary-50 text-primary-600 text-xs"><Sparkles size={10} />{profile?.type}</span></div>
          </div>

          <AnimatePresence>
            {showCrisis && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-warning-50 border-b border-warning-200 px-4 py-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-warning-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1"><p className="text-sm font-semibold text-warning-800">I sense you might need extra support right now</p><p className="text-xs text-warning-700 mt-0.5">In times of crisis, speaking with a specialist can be very helpful.</p></div>
                  <div className="flex gap-2">
                    <Link to="/psychologists" className="flex items-center gap-1 bg-warning-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-warning-700 transition-colors"><User size={12} />Specialist</Link>
                    <a href="tel:988" className="flex items-center gap-1 bg-error-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-error-700 transition-colors"><Phone size={12} />Crisis Line</a>
                    <button onClick={() => setShowCrisis(false)} className="text-warning-400 hover:text-warning-600 text-xs px-2">Close</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-1">
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex items-end gap-3 mb-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' ? (<div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0"><Brain size={14} className="text-white" /></div>) : (<div className="w-8 h-8 bg-gradient-to-br from-calm-400 to-calm-600 rounded-full flex items-center justify-center flex-shrink-0"><User size={14} className="text-white" /></div>)}
                <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-primary-50 text-calm-800 rounded-tr-sm'}`}>{msg.content}</div>
                  <div className="flex items-center gap-1 text-xs text-calm-400"><Clock size={10} />{msg.time}</div>
                  {msg.suggestions && msg.role === 'assistant' && (<div className="flex flex-wrap gap-2 mt-1">{msg.suggestions.map((s) => (<button key={s} onClick={() => setInput(s)} className="bg-white border border-primary-200 text-primary-600 text-xs px-3 py-1.5 rounded-full hover:bg-primary-50 transition-colors">{s}</button>))}</div>)}
                </div>
              </motion.div>
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-calm-100 bg-white p-4">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">{["I'm not feeling well today", 'Worried about work', 'Can\'t sleep well', 'Struggling with myself'].map((prompt) => (<button key={prompt} onClick={() => setInput(prompt)} className="whitespace-nowrap bg-calm-100 text-calm-600 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors flex-shrink-0">{prompt}</button>))}
            </div>
            <div className="flex items-end gap-3">
              <button className="w-9 h-9 rounded-xl bg-calm-100 flex items-center justify-center text-calm-400 hover:bg-calm-200 transition-colors flex-shrink-0"><MessageCircle size={18} /></button>
              <div className="flex-1 relative"><textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} placeholder="Type your message..." rows={1} className="input-field resize-none py-3 pl-4 pr-4 min-h-[46px] max-h-32" style={{ lineHeight: '1.5' }} /></div>
              <button onClick={handleSend} disabled={!input.trim()} className="w-11 h-11 rounded-xl bg-primary-600 flex items-center justify-center text-white hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"><Send size={18} /></button>
            </div>
            <p className="text-center text-xs text-calm-400 mt-2.5">Conversations are confidential • For emergencies, call 988</p>
          </div>
        </div>

        <aside className="hidden xl:flex flex-col w-72 border-r border-calm-100 bg-calm-50 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-2xl border border-calm-100 p-4"><p className="text-xs font-semibold text-calm-700 mb-3 flex items-center gap-2"><Sparkles size={14} className="text-primary-500" />Session Emotion Analysis</p><div className="space-y-2">{[{ label: 'Anxiety', val: 40, color: 'bg-warning-400' }, { label: 'Sadness', val: 25, color: 'bg-primary-400' }, { label: 'Hope', val: 60, color: 'bg-teal-400' }, { label: 'Tension', val: 35, color: 'bg-error-400' }].map(({ label, val, color }) => (<div key={label}><div className="flex justify-between text-xs mb-1"><span className="text-calm-600">{label}</span><span className="text-calm-500">{val}%</span></div><div className="h-1.5 bg-calm-100 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 0.8 }} className={`h-full ${color} rounded-full`} /></div></div>))}</div></div>
          <div className="bg-white rounded-2xl border border-calm-100 p-4"><p className="text-xs font-semibold text-calm-700 mb-3">Session Summary</p><div className="space-y-2">{[{ label: 'Main Topic', value: 'Work Anxiety' }, { label: 'Duration', value: '15 minutes' }, { label: 'Messages', value: `${messages.length} messages` }].map(({ label, value }) => (<div key={label} className="flex justify-between text-xs"><span className="text-calm-500">{label}</span><span className="font-medium text-calm-800">{value}</span></div>))}</div></div>
          <div className="bg-gradient-to-br from-teal-50 to-primary-50 rounded-2xl border border-teal-200 p-4"><p className="text-xs font-semibold text-teal-700 mb-2">Need more help?</p><p className="text-xs text-teal-600 mb-3 leading-relaxed">A psychologist can help if the topic needs more attention.</p><Link to="/psychologists" className="block text-center w-full py-2 bg-teal-600 text-white text-xs font-medium rounded-xl hover:bg-teal-700 transition-colors">View Psychologists</Link></div>
        </aside>
      </div>
    </div>
  );
}
