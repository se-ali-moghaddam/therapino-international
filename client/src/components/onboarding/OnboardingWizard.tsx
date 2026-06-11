import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, ArrowRight, CheckCircle, User, Heart, Sparkles, BarChart2 } from 'lucide-react';
import { mockPersonalityProfiles } from '../../data/mockData';

const steps = [
  { id: 1, title: 'Basic Info', icon: User, description: 'Initial introduction' },
  { id: 2, title: 'Lifestyle', icon: Heart, description: 'Sleep, work, relationships' },
  { id: 3, title: 'Psychological', icon: Brain, description: 'Emotions and mood' },
  { id: 4, title: 'Personality', icon: Sparkles, description: 'Personality type' },
  { id: 5, title: 'Results', icon: BarChart2, description: 'Your profile' },
];

const moodQuestions = [
  { id: 'anxiety', label: 'Anxiety Level', min: 'Calm', max: 'Very Anxious' },
  { id: 'mood', label: 'Mood State', min: 'Depressed', max: 'Happy' },
  { id: 'motivation', label: 'Motivation', min: 'Unmotivated', max: 'Energetic' },
  { id: 'focus', label: 'Focus', min: 'Distracted', max: 'Fully Focused' },
  { id: 'selfEsteem', label: 'Self-Esteem', min: 'Low', max: 'High' },
];

const personalityQuestions = [
  {
    id: 'q1',
    question: 'After a day full of social interactions, how do you feel?',
    options: [
      { value: 'E', label: 'Got energy and want more interactions' },
      { value: 'I', label: 'Tired and need alone time' },
    ],
  },
  {
    id: 'q2',
    question: 'When encountering a new problem, what do you pay attention to first?',
    options: [
      { value: 'N', label: 'Possibilities and creative solutions' },
      { value: 'S', label: 'Existing facts and practical details' },
    ],
  },
  {
    id: 'q3',
    question: 'When making important decisions, what do you prioritize?',
    options: [
      { value: 'T', label: 'Logic, data, and objective results' },
      { value: 'F', label: 'People\'s feelings and personal values' },
    ],
  },
  {
    id: 'q4',
    question: 'How do you prefer your life to be organized?',
    options: [
      { value: 'J', label: 'Planned and structured schedule' },
      { value: 'P', label: 'Flexible and spontaneous' },
    ],
  },
];

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [moodScores, setMoodScores] = useState<Record<string, number>>({ anxiety: 5, mood: 6, motivation: 6, focus: 6, selfEsteem: 5 });
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({});
  const [selectedPersonality] = useState('Analyst');

  const goNext = () => { setDirection(1); setStep((s) => Math.min(s + 1, 5)); };
  const goPrev = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 1)); };
  const handleFinish = () => { navigate('/dashboard'); };

  const profile = mockPersonalityProfiles[selectedPersonality];

  const slideVariants = { enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }) };

  return (
    <div className="min-h-screen bg-mesh bg-calm-50 flex flex-col">
      <div className="bg-white border-b border-calm-100 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-lg flex items-center justify-center"><Brain size={18} className="text-white" /></div>
            <span className="font-bold text-calm-900">Therapino</span>
          </div>
          <div className="text-sm text-calm-500">Step {step} of {steps.length}</div>
        </div>
      </div>

      <div className="bg-white px-4 pb-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 mt-4">{steps.map((s) => (<div key={s.id} className="flex-1 h-1.5 rounded-full overflow-hidden bg-calm-100"><motion.div initial={false} animate={{ width: step >= s.id ? '100%' : '0%' }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="h-full bg-gradient-to-r from-primary-500 to-teal-500 rounded-full" /></div>))}</div>
          <div className="flex mt-3">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isDone = step > s.id;
              return (
                <div key={s.id} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isDone ? 'bg-teal-500' : isActive ? 'bg-primary-600' : 'bg-calm-200'}`}>{isDone ? <CheckCircle size={14} className="text-white" /> : <Icon size={13} className={isActive ? 'text-white' : 'text-calm-400'} />}</div>
                  <span className={`text-xs hidden sm:block ${isActive ? 'text-primary-700 font-medium' : 'text-calm-400'}`}>{s.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="bg-white rounded-3xl shadow-sm border border-calm-100 p-8">
                <h2 className="text-2xl font-bold text-calm-900 mb-2">Basic Information</h2>
                <p className="text-calm-500 mb-8">To personalize your experience, we have a few questions</p>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-calm-700 mb-1.5">First Name</label><input type="text" placeholder="Your first name" className="input-field" /></div>
                    <div><label className="block text-sm font-medium text-calm-700 mb-1.5">Last Name</label><input type="text" placeholder="Your last name" className="input-field" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-calm-700 mb-1.5">Age</label><input type="number" placeholder="e.g. 28" className="input-field" /></div>
                  <div><label className="block text-sm font-medium text-calm-700 mb-3">Gender</label><div className="grid grid-cols-3 gap-3">{['Male', 'Female', 'Prefer not to say'].map((g) => (<label key={g} className="flex items-center justify-center gap-2 border-2 border-calm-200 rounded-xl p-3 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all text-sm"><input type="radio" name="gender" value={g} className="text-primary-600" />{g}</label>))}</div></div>
                  <div><label className="block text-sm font-medium text-calm-700 mb-3">Relationship Status</label><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{['Single', 'Married', 'Divorced', 'Engaged'].map((s) => (<label key={s} className="flex items-center justify-center gap-2 border-2 border-calm-200 rounded-xl p-3 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all text-sm"><input type="radio" name="status" value={s} className="text-primary-600" />{s}</label>))}</div></div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="bg-white rounded-3xl shadow-sm border border-calm-100 p-8">
                <h2 className="text-2xl font-bold text-calm-900 mb-2">Lifestyle</h2>
                <p className="text-calm-500 mb-8">Help us understand your life patterns</p>
                <div className="space-y-6">
                  <div><label className="block text-sm font-medium text-calm-700 mb-3">How many hours do you typically sleep?</label><div className="grid grid-cols-4 gap-3">{['Less than 5', '5-6', '7-8', 'More than 8'].map((h) => (<label key={h} className="flex items-center justify-center border-2 border-calm-200 rounded-xl p-3 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all text-sm text-center"><input type="radio" name="sleep" value={h} className="hidden" />{h} hrs</label>))}</div></div>
                  <div><label className="block text-sm font-medium text-calm-700 mb-3">Overall stress level?</label><div className="grid grid-cols-3 gap-3">{['Low', 'Medium', 'High'].map((l) => (<label key={l} className="flex items-center justify-center border-2 border-calm-200 rounded-xl p-3 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all text-sm"><input type="radio" name="stress" value={l} className="hidden" />{l}</label>))}</div></div>
                  <div><label className="block text-sm font-medium text-calm-700 mb-3">Employment status?</label><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{['Employed', 'Student', 'Unemployed', 'Freelancer'].map((j) => (<label key={j} className="flex items-center justify-center border-2 border-calm-200 rounded-xl p-3 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all text-sm"><input type="radio" name="job" value={j} className="hidden" />{j}</label>))}</div></div>
                  <div><label className="block text-sm font-medium text-calm-700 mb-3">Physical activity per week?</label><div className="grid grid-cols-4 gap-3">{['None', '1-2 days', '3-4 days', 'Every day'].map((a) => (<label key={a} className="flex items-center justify-center border-2 border-calm-200 rounded-xl p-2.5 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all text-xs text-center"><input type="radio" name="activity" value={a} className="hidden" />{a}</label>))}</div></div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="bg-white rounded-3xl shadow-sm border border-calm-100 p-8">
                <h2 className="text-2xl font-bold text-calm-900 mb-2">Psychological Assessment</h2>
                <p className="text-calm-500 mb-8">Adjust each slider based on your current state</p>
                <div className="space-y-8">
                  {moodQuestions.map((q) => (
                    <div key={q.id}>
                      <div className="flex justify-between items-center mb-2"><label className="text-sm font-medium text-calm-800">{q.label}</label><span className="text-sm font-semibold text-primary-600">{moodScores[q.id]}/10</span></div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-calm-400 w-16">{q.min}</span>
                        <input type="range" min="1" max="10" value={moodScores[q.id]} onChange={(e) => setMoodScores((prev) => ({ ...prev, [q.id]: Number(e.target.value) }))} className="flex-1 h-2 bg-calm-200 rounded-full appearance-none cursor-pointer accent-primary-600" />
                        <span className="text-xs text-calm-400 w-16">{q.max}</span>
                      </div>
                      <div className="mt-2 h-1.5 bg-calm-100 rounded-full overflow-hidden"><motion.div animate={{ width: `${(moodScores[q.id] / 10) * 100}%` }} transition={{ duration: 0.3 }} className="h-full bg-gradient-to-r from-primary-400 to-teal-400 rounded-full" /></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="bg-white rounded-3xl shadow-sm border border-calm-100 p-8">
                <h2 className="text-2xl font-bold text-calm-900 mb-2">Personality Assessment</h2>
                <p className="text-calm-500 mb-8">Answer honestly — there are no right or wrong answers</p>
                <div className="space-y-6">
                  {personalityQuestions.map((q, idx) => (
                    <div key={q.id} className="p-5 bg-calm-50 rounded-2xl">
                      <p className="text-sm font-medium text-calm-800 mb-4"><span className="inline-flex w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs items-center justify-center mr-2 font-bold">{idx + 1}</span>{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((opt) => (
                          <label key={opt.value} className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer border-2 transition-all ${personalityAnswers[q.id] === opt.value ? 'border-primary-400 bg-primary-50' : 'border-calm-200 bg-white hover:border-primary-200'}`}>
                            <input type="radio" name={q.id} value={opt.value} checked={personalityAnswers[q.id] === opt.value} onChange={() => setPersonalityAnswers((prev) => ({ ...prev, [q.id]: opt.value }))} className="mt-0.5" />
                            <span className="text-sm text-calm-700">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && profile && (
              <motion.div key="step5" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
                <div className="bg-gradient-to-br from-primary-600 to-teal-600 rounded-3xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl"><Sparkles size={24} /></div>
                    <div><p className="text-primary-100 text-sm">Your Personality Type</p><h2 className="text-2xl font-bold">{profile.type}</h2></div>
                    <span className="ml-auto bg-white/20 text-white text-sm font-mono px-3 py-1 rounded-full">{profile.code}</span>
                  </div>
                  <p className="text-primary-100 text-sm leading-relaxed">{profile.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-calm-100 p-5">
                    <h4 className="font-semibold text-calm-800 mb-3 text-sm">Strengths</h4>
                    <ul className="space-y-2">{profile.strengths.map((s: string) => (<li key={s} className="flex items-center gap-2 text-xs text-calm-600"><CheckCircle size={12} className="text-teal-500" />{s}</li>))}</ul>
                  </div>
                  <div className="bg-white rounded-2xl border border-calm-100 p-5">
                    <h4 className="font-semibold text-calm-800 mb-3 text-sm">Challenges</h4>
                    <ul className="space-y-2">{profile.challenges.map((c: string) => (<li key={c} className="flex items-center gap-2 text-xs text-calm-600"><div className="w-3 h-3 rounded-full bg-warning-200 flex-shrink-0" />{c}</li>))}</ul>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-calm-100 p-5"><h4 className="font-semibold text-calm-800 mb-2 text-sm">Communication Style</h4><p className="text-sm text-calm-600">{profile.communicationStyle}</p></div>
                <div className="bg-white rounded-2xl border border-calm-100 p-5"><h4 className="font-semibold text-calm-800 mb-2 text-sm">Emotional Tendencies</h4><p className="text-sm text-calm-600">{profile.emotionalTendencies}</p></div>

                <div className="bg-white rounded-2xl border border-calm-100 p-5">
                  <h4 className="font-semibold text-calm-800 mb-4 text-sm">Your Mental Wellness Score</h4>
                  <div className="space-y-3">
                    {Object.entries(moodScores).map(([key, val]) => {
                      const labels: Record<string, string> = { anxiety: 'Anxiety', mood: 'Mood', motivation: 'Motivation', focus: 'Focus', selfEsteem: 'Self-Esteem' };
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-xs mb-1"><span className="text-calm-600">{labels[key]}</span><span className="font-medium text-calm-800">{val}/10</span></div>
                          <div className="h-2 bg-calm-100 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${val * 10}%` }} transition={{ duration: 0.6, delay: 0.1 }} className="h-full bg-gradient-to-r from-primary-400 to-teal-400 rounded-full" /></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 mt-6">
            {step > 1 && (<button onClick={goPrev} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-calm-200 text-calm-600 hover:bg-calm-50 transition-all font-medium"><ArrowLeft size={16} />Back</button>)}
            <button onClick={step === 5 ? handleFinish : goNext} className="flex-1 flex items-center justify-center gap-2 btn-primary">{step === 5 ? 'Go to Dashboard' : 'Next'}{step < 5 && <ArrowRight size={16} />}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
