import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, ShieldAlert, PhoneCall, 
  MessageSquare, Fingerprint, Lock, EyeOff, Smartphone, 
  Globe, Languages, BrainCircuit, Activity, CheckCircle2, XCircle, ArrowRight, X
} from 'lucide-react';
import { TRANSLATIONS, ALL_LANGUAGES } from './translations';

const iconMap = {
  Smartphone, Globe, PhoneCall
};

export default function App() {
  const [languageSelected, setLanguageSelected] = useState(false);
  const [language, setLanguage] = useState('English');
  const [scanInput, setScanInput] = useState('');
  const [scanStatus, setScanStatus] = useState('idle');
  const [selectedScam, setSelectedScam] = useState(null); 
  const [simulatorMode, setSimulatorMode] = useState(false);
  const [simulatorStep, setSimulatorStep] = useState(0);

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const handleScan = () => {
    if(!scanInput.trim()) return;
    setScanStatus('scanning');
    setTimeout(() => {
      const lowerInput = scanInput.toLowerCase();
      if (lowerInput.includes('http') || lowerInput.includes('win') || lowerInput.includes('lottery') || scanInput.includes('जीत') || lowerInput.includes('kyc') || lowerInput.includes('block') || lowerInput.includes('urgent') || lowerInput.includes('click here') || lowerInput.includes('free')) {
        setScanStatus('scam');
      } else {
        setScanStatus('safe');
      }
    }, 2000);
  };

  const openScamModal = (scamKey) => {
    setSelectedScam(t.scams[scamKey]);
  };

  if (!languageSelected) {
    return (
      <div className="min-h-screen bg-cyber-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-blue/10 blur-[100px] rounded-full"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 md:p-10 max-w-2xl w-full text-center relative z-10 border-cyber-blue shadow-neon-blue max-h-[90vh] flex flex-col"
        >
          <div className="flex justify-center mb-4 shrink-0">
            <Languages className="w-16 h-16 text-cyber-blue animate-pulse-glow" />
          </div>
          <h1 className="text-3xl font-black font-display text-white mb-6 shrink-0">Select Your Language</h1>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {ALL_LANGUAGES.map(l => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`py-3 px-4 rounded-xl text-base font-bold transition-all border-2 flex items-center justify-center text-center ${language === l ? 'bg-cyber-blue/20 border-cyber-blue text-cyber-blue shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'bg-cyber-panel border-cyber-border text-white hover:border-cyber-blue/50'}`}
              >
                <span>{l}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => setLanguageSelected(true)}
            className="w-full bg-cyber-blue hover:bg-cyber-blue/90 text-black text-lg font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-neon-blue transition-all shrink-0 mt-4"
          >
            {t.continue} <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 font-sans selection:bg-cyber-blue selection:text-black overflow-x-hidden relative">
      
      {/* ── Case Study Modal (Updated with Images) ── */}
      <AnimatePresence>
        {selectedScam && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedScam(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel max-w-3xl w-full bg-cyber-dark/95 border-2 border-cyber-blue p-6 md:p-8 relative overflow-hidden shadow-neon-blue max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedScam(null)} className="absolute top-4 right-4 text-cyber-text hover:text-white bg-cyber-panel rounded-full p-2 z-10">
                <X className="w-6 h-6" />
              </button>
              
              <h2 className={`text-4xl font-black font-display text-cyber-${selectedScam.color || 'blue'} mb-6 border-b border-cyber-border pb-4`}>{selectedScam.title}</h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image Section */}
                <div className="w-full md:w-1/3 shrink-0">
                  <div className={`rounded-2xl overflow-hidden border-2 border-cyber-${selectedScam.color || 'blue'} shadow-neon-${selectedScam.color || 'blue'}`}>
                    <img src={selectedScam.image || '/scam_alert.png'} alt={selectedScam.title} className="w-full h-auto object-cover" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><AlertTriangle className="text-cyber-red w-5 h-5"/> How it Works:</h3>
                    <p className="text-cyber-text/90 leading-relaxed text-lg">{selectedScam.detail}</p>
                  </div>

                  <div className="bg-cyber-purple/10 border-l-4 border-cyber-purple p-4 rounded-r-xl">
                    <h3 className="text-xl font-bold text-cyber-purple mb-2">📖 Real Case Study:</h3>
                    <p className="text-white italic leading-relaxed text-lg">"{selectedScam.case_study}"</p>
                  </div>

                  <div className="bg-cyber-green/10 border-l-4 border-cyber-green p-4 rounded-r-xl">
                    <h3 className="text-xl font-bold text-cyber-green mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> Action Plan:</h3>
                    <p className="text-white font-bold leading-relaxed text-lg">{selectedScam.action}</p>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setSelectedScam(null)} className="mt-8 w-full bg-cyber-panel hover:bg-cyber-border text-white font-bold py-3 rounded-xl transition-all border border-cyber-border">Close Details</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Interactive Scam Simulator Modal ── */}
      <AnimatePresence>
        {simulatorMode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div className="relative w-full max-w-[400px] h-[750px] max-h-[90vh] bg-black border-[8px] border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
              {/* Phone Header */}
              <div className="bg-gray-900 px-6 py-2 flex justify-center items-center rounded-t-[2.5rem]">
                <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
              </div>
              
              {/* Phone Screen */}
              <div className="flex-1 bg-white flex flex-col relative">
                
                {simulatorStep === 0 && (
                  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-6 h-full flex flex-col justify-center text-center bg-gray-50">
                    <MessageSquare className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Incoming Message</h3>
                    <p className="text-gray-600 mb-8">You are about to receive a simulated SMS. How will you react?</p>
                    <button onClick={() => setSimulatorStep(1)} className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">Start Simulation</button>
                    <button onClick={() => setSimulatorMode(false)} className="mt-4 text-gray-500 font-semibold hover:text-gray-800">Cancel</button>
                  </motion.div>
                )}

                {simulatorStep === 1 && (
                  <div className="flex flex-col h-full bg-gray-100">
                    <div className="bg-gray-200 py-4 px-4 flex items-center gap-3 border-b">
                      <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white"><Globe className="w-6 h-6"/></div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Bank Support</div>
                        <div className="text-xs text-gray-500">VK-HDFCBK</div>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4 flex flex-col justify-end">
                      <motion.div initial={{ scale: 0.8, opacity: 0, x: -20 }} animate={{ scale: 1, opacity: 1, x: 0 }} transition={{ type: "spring", bounce: 0.5 }} className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] text-gray-800 self-start border border-gray-200">
                        Dear Customer, Your account will be BLOCKED today due to incomplete KYC. Please click here to update immediately: <span className="text-blue-600 underline cursor-pointer break-all font-semibold">http://update-kyc-verify-online.com/hdfc</span>
                      </motion.div>
                      <div className="text-xs text-gray-400 mt-1 ml-1">Today 10:42 AM</div>
                    </div>

                    <div className="p-4 bg-white border-t border-gray-200 grid grid-cols-2 gap-3 pb-8">
                      <button onClick={() => setSimulatorStep(2)} className="bg-blue-50 border border-blue-200 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-100 flex flex-col items-center justify-center gap-1 text-sm">
                        <Globe className="w-5 h-5"/> Click Link
                      </button>
                      <button onClick={() => setSimulatorStep(3)} className="bg-red-50 border border-red-200 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 flex flex-col items-center justify-center gap-1 text-sm">
                        <ShieldAlert className="w-5 h-5"/> Report & Block
                      </button>
                    </div>
                  </div>
                )}

                {simulatorStep === 2 && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 bg-red-600 text-white flex flex-col items-center justify-center p-6 text-center z-10">
                    <XCircle className="w-24 h-24 mb-4 animate-bounce" />
                    <h2 className="text-3xl font-black mb-4">YOU GOT SCAMMED!</h2>
                    <p className="text-lg mb-8 text-red-100 font-medium">You just clicked a phishing link! In real life, hackers would now steal your bank details.</p>
                    <div className="bg-red-800/50 p-4 rounded-xl w-full mb-8 text-left border border-red-500">
                      <p className="font-bold mb-2">🚩 Red Flags Missed:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-red-100">
                        <li>Urgency ("BLOCKED today")</li>
                        <li>Suspicious URL (update-kyc-verify-online)</li>
                        <li>Unverified sender ID</li>
                      </ul>
                    </div>
                    <button onClick={() => setSimulatorMode(false)} className="bg-white text-red-600 font-black py-3 px-8 rounded-xl w-full hover:bg-red-50">Back to Safety</button>
                  </motion.div>
                )}

                {simulatorStep === 3 && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 bg-green-500 text-white flex flex-col items-center justify-center p-6 text-center z-10">
                    <CheckCircle2 className="w-24 h-24 mb-4" />
                    <h2 className="text-3xl font-black mb-4">GREAT JOB!</h2>
                    <p className="text-lg mb-8 text-green-100 font-medium">You correctly identified the phishing attempt and protected your data!</p>
                    <div className="bg-green-700/50 p-4 rounded-xl w-full mb-8 text-left border border-green-400">
                      <p className="font-bold mb-2">🛡️ Why it was safe:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-green-100">
                        <li>You didn't panic under urgency</li>
                        <li>You noticed the fake link</li>
                        <li>You reported the sender</li>
                      </ul>
                    </div>
                    <button onClick={() => setSimulatorMode(false)} className="bg-white text-green-600 font-black py-3 px-8 rounded-xl w-full hover:bg-green-50">Back to Home</button>
                  </motion.div>
                )}

              </div>
              
              {/* Phone Footer */}
              <div className="bg-gray-900 px-6 py-4 flex justify-center items-center rounded-b-[2.5rem]">
                <div className="w-24 h-1 bg-gray-600 rounded-full"></div>
              </div>
            </div>
            <button onClick={() => setSimulatorMode(false)} className="absolute top-6 right-6 text-white hover:text-red-400 bg-gray-900/50 p-3 rounded-full backdrop-blur-sm">
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-t-0 border-x-0 border-cyber-border/50 rounded-none bg-cyber-dark/90 px-4 py-3 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-cyber-blue w-8 h-8" />
            <span className="font-display font-black text-xl tracking-wider text-white">
              {t.nav_title}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-cyber-panel px-3 py-1.5 rounded-full border border-cyber-border">
              <Languages className="w-4 h-4 text-cyber-blue" />
              <select 
                value={language} 
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setLanguageSelected(true);
                }}
                className="bg-transparent text-sm font-semibold outline-none cursor-pointer w-24 sm:w-auto text-white appearance-none"
              >
                {ALL_LANGUAGES.map(l => <option key={l} value={l} className="bg-cyber-dark">{l}</option>)}
              </select>
            </div>
            <a href="tel:1930" className="bg-cyber-red/20 text-cyber-red hover:bg-cyber-red hover:text-white transition-all border border-cyber-red px-4 py-1.5 rounded-full font-bold flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>{t.help_btn}</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-28 space-y-24">
        
        {/* ── 1. Hero Section ── */}
        <section className="relative flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 z-10 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue text-sm font-bold">
              <BrainCircuit className="w-4 h-4" />
              {t.hero_badge}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black font-display leading-tight">
              {t.hero_title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                {t.hero_title2}
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-cyber-text/80 max-w-2xl mx-auto lg:mx-0">
              {t.hero_desc}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pt-4 flex justify-center lg:justify-start">
              <button 
                onClick={() => { setSimulatorMode(true); setSimulatorStep(0); }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyber-purple/20 border-2 border-cyber-purple hover:bg-cyber-purple hover:text-white text-cyber-purple font-black rounded-xl transition-all shadow-[0_0_20px_rgba(180,0,255,0.3)] hover:shadow-[0_0_40px_rgba(180,0,255,0.6)] overflow-hidden"
              >
                <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:animate-shine"></div>
                <Smartphone className="w-6 h-6 animate-pulse" />
                Try Live Scam Simulator
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
            className="flex-1 relative flex justify-center z-10"
          >
            <div className="absolute inset-0 bg-cyber-blue/20 blur-[100px] rounded-full"></div>
            <img src="/ai_shield.png" alt="AI Security Shield" className="w-[400px] h-[400px] object-cover animate-float rounded-full border-2 border-cyber-blue/30 shadow-[0_0_50px_rgba(0,240,255,0.3)]" />
          </motion.div>
        </section>

        {/* ── 3. Highly Visual Scam Types (Dynamic List) ── */}
        <section className="space-y-8 relative z-10">
          <h2 className="text-4xl font-display font-black text-center text-white">{t.types_title}</h2>
          <p className="text-center text-cyber-text/70 max-w-2xl mx-auto text-lg">{t.types_desc}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(t.scams).map((scamKey) => {
              const scam = t.scams[scamKey];
              const IconComp = iconMap[scam.icon] || ShieldAlert;
              return (
                <div key={scam.id} onClick={() => openScamModal(scamKey)} className={`glass-panel p-6 border-t-4 border-t-cyber-${scam.color || 'blue'} hover:shadow-neon-${scam.color || 'blue'} transition-all cursor-pointer group transform hover:-translate-y-2 flex flex-col`}>
                  <div className={`bg-cyber-${scam.color || 'blue'}/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComp className={`w-8 h-8 text-cyber-${scam.color || 'blue'}`} />
                  </div>
                  <h3 className={`text-2xl font-black text-white mb-2 group-hover:text-cyber-${scam.color || 'blue'} transition-colors`}>{scam.title}</h3>
                  <p className="text-cyber-text/80 mb-6 font-medium text-lg flex-1">{scam.short_desc}</p>
                  
                  {/* Thumbnail Preview */}
                  <div className={`w-full h-32 rounded-lg overflow-hidden mb-4 border border-cyber-${scam.color || 'blue'}/50 group-hover:border-cyber-${scam.color || 'blue'} transition-colors`}>
                    <img src={scam.image} alt="preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>

                  <div className={`flex items-center gap-2 text-cyber-${scam.color || 'blue'} font-bold text-sm mt-auto`}>
                    Read Case Study & Action Plan <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform"/>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── 2. Scam Detection Panel ── */}
        <section className="glass-panel p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-purple/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-display mb-2 flex items-center justify-center gap-3">
              <Fingerprint className="text-cyber-blue w-8 h-8" />
              {t.scan_title}
            </h2>
            <p className="text-cyber-text/70">{t.scan_desc}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col gap-4">
              <textarea 
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder={t.scan_placeholder}
                className="w-full bg-cyber-dark/50 border-2 border-cyber-border focus:border-cyber-blue outline-none rounded-2xl p-6 text-lg min-h-[150px] transition-all resize-none shadow-inner"
              />
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
                  <button onClick={() => setScanInput("Dear Customer, your KYC is pending. Your HDFC account will be blocked in 24 hours. Click here to update: http://hdfc-update-kyc.xyz")} className="text-xs font-bold bg-cyber-panel border border-cyber-red text-cyber-red px-3 py-1.5 rounded-full hover:bg-cyber-red/20 transition-colors shadow-sm">
                    ⚠️ Try Scam SMS
                  </button>
                  <button onClick={() => setScanInput("Hi Rahul, are we still meeting at the cafe tomorrow at 5 PM for the project discussion?")} className="text-xs font-bold bg-cyber-panel border border-cyber-green text-cyber-green px-3 py-1.5 rounded-full hover:bg-cyber-green/20 transition-colors shadow-sm">
                    ✅ Try Safe SMS
                  </button>
                </div>
                <button 
                  onClick={handleScan}
                  disabled={scanStatus === 'scanning'}
                  className="glass-button bg-cyber-blue hover:bg-cyber-blue/90 text-black px-8 py-3 shadow-neon-blue w-full sm:w-auto font-black rounded-xl"
                >
                  {scanStatus === 'scanning' ? t.scanning : t.scan_btn}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {scanStatus === 'scanning' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 rounded-2xl border-2 border-cyber-blue bg-cyber-blue/10 text-center">
                  <Activity className="w-12 h-12 text-cyber-blue mx-auto animate-pulse mb-3" />
                  <h3 className="text-xl font-bold text-cyber-blue">{t.scanning}</h3>
                </motion.div>
              )}

              {scanStatus === 'scam' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 rounded-2xl border-4 border-cyber-red bg-cyber-red/10 text-center relative overflow-hidden">
                  <XCircle className="w-20 h-20 text-cyber-red mx-auto mb-4 animate-bounce" />
                  <h3 className="text-4xl font-black text-cyber-red text-glow-red mb-2">{t.scam_alert}</h3>
                  <p className="text-xl font-bold text-white mb-4">{t.scam_desc}</p>
                  <img src="/scam_alert.png" alt="Danger Alert" className="w-48 h-48 mx-auto rounded-xl border border-cyber-red shadow-[0_0_30px_rgba(255,0,60,0.5)]" />
                </motion.div>
              )}

              {scanStatus === 'safe' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 rounded-2xl border-4 border-cyber-green bg-cyber-green/10 text-center">
                  <CheckCircle2 className="w-20 h-20 text-cyber-green mx-auto mb-4" />
                  <h3 className="text-4xl font-black text-cyber-green mb-2">{t.safe_alert}</h3>
                  <p className="text-xl font-bold text-white">{t.safe_desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── 4. Visual Prevention Tips ── */}
        <section className="glass-panel p-10 bg-gradient-to-br from-cyber-dark to-cyber-panel">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-cyber-dark/50 border border-cyber-green/50 p-6 rounded-2xl flex items-center gap-4">
                <Lock className="w-12 h-12 text-cyber-green shrink-0" />
                <span className="text-lg font-bold">{t.rule1}</span>
              </div>
              <div className="bg-cyber-dark/50 border border-cyber-green/50 p-6 rounded-2xl flex items-center gap-4">
                <EyeOff className="w-12 h-12 text-cyber-green shrink-0" />
                <span className="text-lg font-bold">{t.rule2}</span>
              </div>
              <div className="bg-cyber-dark/50 border border-cyber-green/50 p-6 rounded-2xl flex items-center gap-4">
                <ShieldCheck className="w-12 h-12 text-cyber-green shrink-0" />
                <span className="text-lg font-bold">{t.rule3}</span>
              </div>
              <div className="bg-cyber-dark/50 border border-cyber-green/50 p-6 rounded-2xl flex items-center gap-4">
                <AlertTriangle className="w-12 h-12 text-cyber-red shrink-0" />
                <span className="text-lg font-bold">{t.rule4}</span>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl font-black font-display mb-4">{t.rules_title}</h2>
              <p className="text-xl text-cyber-text/80">{t.rules_desc}</p>
            </div>
          </div>
        </section>

        {/* ── 6. Emergency ── */}
        <section className="bg-gradient-to-r from-cyber-red/20 to-cyber-dark border-2 border-cyber-red rounded-3xl p-10 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,0,60,0.2)]">
          <ShieldAlert className="absolute top-1/2 left-10 -translate-y-1/2 w-32 h-32 text-cyber-red/20" />
          <ShieldAlert className="absolute top-1/2 right-10 -translate-y-1/2 w-32 h-32 text-cyber-red/20" />
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 relative z-10">{t.em_title}</h2>
          <p className="text-xl text-cyber-text mb-6 relative z-10">{t.em_desc}</p>
          <a href="tel:1930" className="inline-flex items-center justify-center gap-3 bg-cyber-red hover:bg-red-600 text-white text-4xl font-black py-4 px-12 rounded-full transition-all shadow-[0_0_30px_rgba(255,0,60,0.6)] relative z-10 hover:scale-105">
            <PhoneCall className="w-10 h-10 animate-bounce" /> 1930
          </a>
        </section>

      </main>

      <footer className="mt-20 border-t border-cyber-border bg-cyber-panel py-8 text-center text-cyber-text/50">
        <div className="flex justify-center items-center gap-2 mb-4">
          <ShieldCheck className="w-6 h-6 text-cyber-blue" />
          <span className="font-display font-bold text-lg text-white">RakshaNetra AI</span>
        </div>
        <p>Protecting Citizens. An AI-Based Multi-Language Scam Awareness Initiative.</p>
        <p className="mt-2 text-sm">2026 © All Rights Reserved</p>
      </footer>
    </div>
  );
}
