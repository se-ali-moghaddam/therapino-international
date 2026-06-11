import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Eye, EyeOff, Phone, Lock, User, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'register' | 'forgotPassword' | 'otpVerify' | 'success';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
}

const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalVariants = { hidden: { opacity: 0, scale: 0.92, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.92, y: 20 } };

export default function AuthModal({ isOpen, initialMode = 'login', onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPass, setShowPass] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const navigate = useNavigate();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 4) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    navigate('/dashboard');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('otpVerify');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('success');
    setTimeout(() => { onClose(); navigate('/onboarding'); }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div variants={overlayVariants} initial="hidden" animate="visible" exit="hidden" className="absolute inset-0 bg-calm-900/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10">
            <div className="relative bg-gradient-to-br from-primary-50 to-teal-50 px-8 pt-8 pb-6">
              <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl text-calm-400 hover:text-calm-600 hover:bg-white/80 transition-all"><X size={18} /></button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center shadow-sm"><Brain size={22} className="text-white" /></div>
                <span className="text-lg font-bold text-calm-900">Therapino</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={mode} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
                  {mode === 'login' && (<><h2 className="text-2xl font-bold text-calm-900">Welcome Back</h2><p className="text-sm text-calm-500 mt-1">Sign in to Therapino</p></>)}
                  {mode === 'register' && (<><h2 className="text-2xl font-bold text-calm-900">Create Free Account</h2><p className="text-sm text-calm-500 mt-1">Start your wellness journey</p></>)}
                  {mode === 'forgotPassword' && (<><h2 className="text-2xl font-bold text-calm-900">Reset Password</h2><p className="text-sm text-calm-500 mt-1">Enter your phone number</p></>)}
                  {mode === 'otpVerify' && (<><h2 className="text-2xl font-bold text-calm-900">Verify Phone</h2><p className="text-sm text-calm-500 mt-1">Enter the code sent to {phone || '+1 (555) 123-4567'}</p></>)}
                  {mode === 'success' && (<><h2 className="text-2xl font-bold text-calm-900">Success!</h2><p className="text-sm text-calm-500 mt-1">Redirecting...</p></>)}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="px-8 py-6">
              <AnimatePresence mode="wait">
                {mode === 'login' && (
                  <motion.form key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-calm-700 mb-1.5">Phone Number</label>
                      <div className="relative"><Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" /><input type="tel" placeholder="+1 (555) 123-4567" className="input-field pl-10" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-calm-700 mb-1.5">Password</label>
                      <div className="relative"><Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" /><input type={showPass ? 'text' : 'password'} placeholder="Password" className="input-field pl-10 pr-10" /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-calm-400 hover:text-calm-600">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-2 text-sm text-calm-600 cursor-pointer"><input type="checkbox" className="rounded border-calm-300 text-primary-600 focus:ring-primary-300" /> Remember me</label>
                      <button type="button" onClick={() => setMode('forgotPassword')} className="text-sm text-primary-600 hover:text-primary-700 font-medium">Forgot password?</button>
                    </div>
                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">Sign In <ArrowRight size={16} /></button>
                    <p className="text-center text-sm text-calm-500">Don't have an account? <button type="button" onClick={() => setMode('register')} className="text-primary-600 font-medium hover:text-primary-700">Sign up</button></p>
                  </motion.form>
                )}

                {mode === 'register' && (
                  <motion.form key="register" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-calm-700 mb-1.5">Full Name</label>
                      <div className="relative"><User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" /><input type="text" placeholder="Your full name" className="input-field pl-10" /></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-calm-700 mb-1.5">Phone Number</label>
                      <div className="relative"><Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" /><input type="tel" placeholder="+1 (555) 123-4567" className="input-field pl-10" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-calm-700 mb-1.5">Email (optional)</label>
                      <div className="relative"><Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" /><input type="email" placeholder="example@email.com" className="input-field pl-10" /></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-calm-700 mb-1.5">Password</label>
                      <div className="relative"><Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" /><input type={showPass ? 'text' : 'password'} placeholder="At least 8 characters" className="input-field pl-10 pr-10" /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-calm-400 hover:text-calm-600">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
                    </div>
                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">Send Verification Code <ArrowRight size={16} /></button>
                    <p className="text-center text-sm text-calm-500">Already have an account? <button type="button" onClick={() => setMode('login')} className="text-primary-600 font-medium hover:text-primary-700">Sign in</button></p>
                  </motion.form>
                )}

                {mode === 'forgotPassword' && (
                  <motion.form key="forgot" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} onSubmit={(e) => { e.preventDefault(); setMode('otpVerify'); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-calm-700 mb-1.5">Phone Number</label>
                      <div className="relative"><Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-calm-400" /><input type="tel" placeholder="+1 (555) 123-4567" className="input-field pl-10" /></div>
                    </div>
                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">Send Reset Code <ArrowRight size={16} /></button>
                    <button type="button" onClick={() => setMode('login')} className="w-full text-sm text-calm-500 hover:text-calm-700 py-2">Back to Sign In</button>
                  </motion.form>
                )}

                {mode === 'otpVerify' && (
                  <motion.form key="otp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} onSubmit={handleOtpSubmit} className="space-y-6">
                    <div className="flex justify-center gap-3">
                      {otp.map((digit, i) => (
                        <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} className="w-12 h-14 text-center text-xl font-bold border-2 border-calm-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
                      ))}
                    </div>
                    <div className="text-center text-sm text-calm-500">Didn't receive the code? <button type="button" className="text-primary-600 font-medium">Resend (59s)</button></div>
                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">Verify & Continue <ArrowRight size={16} /></button>
                  </motion.form>
                )}

                {mode === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4"><CheckCircle size={32} className="text-success-600" /></motion.div>
                    <h3 className="text-xl font-bold text-calm-900 mb-2">Registration Successful!</h3>
                    <p className="text-sm text-calm-500">Redirecting to personality assessment...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
