import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Lock, Code, Server, ChevronRight, Mail, Linkedin } from 'lucide-react';

const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}<span className="animate-pulse">_</span></span>;
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Wait a bit at 100% before completing
          return 100;
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-cyber-bg flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="w-64 flex flex-col items-center">
        <div className="font-mono text-cyber-cyan mb-6 text-xl tracking-widest flex items-center gap-3">
          <Terminal size={24} className="animate-pulse" />
          <span>SYSTEM_INIT</span>
        </div>
        
        <div className="w-full h-1 bg-cyber-surface border border-cyber-border rounded-sm overflow-hidden mb-3 relative">
          <motion.div 
            className="h-full bg-cyber-cyan shadow-[0_0_10px_#00e5ff]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
        
        <div className="w-full flex justify-between font-mono text-xs text-gray-500">
          <span className="animate-pulse">Loading modules...</span>
          <span className="text-cyber-cyan">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-cyber-bg text-gray-300 font-sans selection:bg-cyber-neon selection:text-black relative overflow-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-cyber-bg/80 backdrop-blur-md border-b border-cyber-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono text-cyber-neon font-bold text-xl tracking-tighter">
            LPPJY<span className="text-gray-500">.sys</span>
          </div>
          <div className="hidden md:flex space-x-8 font-mono text-sm">
            <a href="#about" className="hover:text-cyber-cyan transition-colors">01. Tentang</a>
            <a href="#certifications" className="hover:text-cyber-cyan transition-colors">02. Sertifikasi</a>
            <a href="#skills" className="hover:text-cyber-cyan transition-colors">03. Keahlian</a>
            <a href="#contact" className="hover:text-cyber-cyan transition-colors">04. Kontak</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-cyber-cyan mb-4">$&gt; whoami</p>
            <h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight glitch-text"
              data-text="Lingga Putra Pratama Jaya Yudha."
            >
              Lingga Putra Pratama Jaya Yudha.
            </h1>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-gray-500 mb-8 flex flex-wrap"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.04,
                    delayChildren: 0.6
                  }
                }
              }}
            >
              {"Mengamankan dunia digital.".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 15, filter: "blur(8px)", color: "#6b7280" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      color: ["#00e5ff", "#6b7280"],
                      textShadow: ["0 0 20px #00e5ff", "0 0 0px transparent"]
                    }
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            <div className="font-mono text-lg md:text-xl text-gray-400 max-w-2xl mb-12 h-20">
              <Typewriter text="Saya adalah profesional keamanan siber yang berspesialisasi dalam peretasan etis, forensik digital, dan operasi red team." delay={30} />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-6 py-3 bg-transparent border border-cyber-cyan text-cyber-cyan font-mono hover:bg-cyber-cyan/10 transition-colors rounded-sm flex items-center gap-2">
                <Terminal size={18} />
                Mulai_Kontak
              </a>
              <a href="#certifications" className="px-6 py-3 bg-cyber-surface border border-cyber-border text-white font-mono hover:border-cyber-purple/50 transition-colors rounded-sm flex items-center gap-2">
                <Shield size={18} />
                Lihat_Kredensial
              </a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 border-t border-cyber-border">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white"><span className="text-cyber-neon font-mono text-2xl mr-2">01.</span>Tentang Saya</h2>
            <div className="h-px bg-cyber-border flex-grow max-w-xs"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-lg leading-relaxed text-gray-300">
              <p>
                Halo! Nama saya Lingga Putra Pratama Jaya Yudha. Saya memiliki hasrat yang mendalam untuk menemukan kerentanan sebelum peretas jahat melakukannya, dan menyelidiki jejak digital untuk menyatukan insiden siber yang kompleks.
              </p>
              <p>
                Perjalanan saya di bidang keamanan siber didorong oleh rasa ingin tahu yang tak henti-hentinya tentang bagaimana sistem bekerja—dan yang lebih penting, bagaimana sistem tersebut dapat diretas dan diamankan. Saya berspesialisasi dalam keamanan ofensif dan forensik digital, menjembatani kesenjangan antara menyerang sistem untuk menemukan celah dan menyelidiki pelanggaran untuk memahami "bagaimana" dan "mengapa".
              </p>
              <p>
                Baik saat saya menyimulasikan ancaman persisten tingkat lanjut (APT) sebagai Operator Red Team atau menganalisis sistem yang disusupi sebagai Penyelidik Forensik, tujuan saya tetap sama: <span className="text-cyber-neon">memperkuat postur keamanan melalui intelijen yang dapat ditindaklanjuti.</span>
              </p>
            </div>
            
            <div className="flex flex-col gap-8">
              {/* Photo Container */}
              <div className="relative group w-full max-w-sm mx-auto md:mx-0">
                <div className="absolute inset-0 bg-cyber-neon/20 translate-x-4 translate-y-4 rounded-sm transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative aspect-[3/4] border border-cyber-border rounded-sm overflow-hidden bg-cyber-surface group-hover:border-cyber-neon/50 transition-colors">
                  {/* Overlay for cyber effect */}
                  <div className="absolute inset-0 bg-cyber-neon/10 mix-blend-overlay z-10 pointer-events-none"></div>
                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20 pointer-events-none opacity-30"></div>
                  
                  {/* GANTI URL GAMBAR DI BAWAH INI DENGAN FOTO ANDA */}
                  <img 
                    src="https://i.ibb.co.com/7dpF6R94/foto-lingga.png" 
                    alt="Lingga Putra Pratama Jaya Yudha" 
                    className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-30">
                    <p className="text-cyber-neon font-mono text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse"></span>
                      ID: LPPJY-01 // ONLINE
                    </p>
                  </div>
                </div>
              </div>

              {/* Terminal Box */}
              <div className="relative bg-cyber-surface border border-cyber-border p-6 rounded-sm">
                <div className="font-mono text-sm text-gray-400 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  <span className="ml-2">root@lppjy:~# cat /etc/profile</span>
                </div>
                <ul className="space-y-3 font-mono text-sm">
                  <li className="flex gap-2"><span className="text-cyber-neon">PERAN:</span> Spesialis Keamanan Siber</li>
                  <li className="flex gap-2"><span className="text-cyber-neon">FOKUS:</span> Keamanan Ofensif & Forensik</li>
                  <li className="flex gap-2"><span className="text-cyber-neon">LOKASI:</span> Indonesia</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 border-t border-cyber-border">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white"><span className="text-cyber-neon font-mono text-2xl mr-2">02.</span>Sertifikasi</h2>
            <div className="h-px bg-cyber-border flex-grow max-w-xs"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* CEH */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-cyber-surface border border-cyber-border p-6 rounded-sm hover:border-cyber-neon hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-cyber-bg border border-cyber-border rounded-full flex items-center justify-center mb-6 group-hover:border-cyber-neon group-hover:text-cyber-neon transition-colors">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">CEH v9</h3>
              <p className="text-cyber-neon font-mono text-xs mb-4">Certified Ethical Hacker</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Menunjukkan pengetahuan dalam menilai keamanan sistem komputer dengan mencari kelemahan dan kerentanan menggunakan pengetahuan dan alat yang sama dengan peretas jahat, tetapi dengan cara yang sah dan legal.
              </p>
            </motion.div>

            {/* CHFI */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-cyber-surface border border-cyber-border p-6 rounded-sm hover:border-cyber-neon hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-cyber-bg border border-cyber-border rounded-full flex items-center justify-center mb-6 group-hover:border-cyber-neon group-hover:text-cyber-neon transition-colors">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">CHFI</h3>
              <p className="text-cyber-neon font-mono text-xs mb-4">Computer Hacking Forensic Investigator</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Memvalidasi keterampilan untuk mengidentifikasi jejak penyusup dan mengumpulkan bukti yang diperlukan dengan benar untuk penuntutan di pengadilan. Keahlian dalam forensik digital, analisis bukti, dan respons insiden.
              </p>
            </motion.div>

            {/* CRTO */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-cyber-surface border border-cyber-border p-6 rounded-sm hover:border-cyber-neon hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-cyber-bg border border-cyber-border rounded-full flex items-center justify-center mb-6 group-hover:border-cyber-neon group-hover:text-cyber-neon transition-colors">
                <Server size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">CRTO</h3>
              <p className="text-cyber-neon font-mono text-xs mb-4">Certified Red Team Operator</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Sertifikasi tingkat lanjut yang berfokus pada pelaksanaan keterlibatan red team. Mencakup simulasi musuh, infrastruktur command and control (C2), eskalasi hak istimewa, pergerakan lateral, dan eksploitasi active directory.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 border-t border-cyber-border">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white"><span className="text-cyber-neon font-mono text-2xl mr-2">03.</span>Keahlian Teknis</h2>
            <div className="h-px bg-cyber-border flex-grow max-w-xs"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-cyber-surface border border-cyber-border p-8 rounded-sm hover:border-cyber-neon hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Code className="text-cyber-neon" size={20} />
                Keamanan Ofensif
              </h3>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Pengujian Penetrasi (Web/Jaringan)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Penilaian Kerentanan</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Pengembangan Exploit</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Rekayasa Sosial</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Eksploitasi Active Directory</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Pengaturan Infrastruktur C2 (Cobalt Strike)</li>
              </ul>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-cyber-surface border border-cyber-border p-8 rounded-sm hover:border-cyber-neon hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="text-cyber-neon" size={20} />
                Defensif & Forensik
              </h3>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Akuisisi Bukti Digital</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Forensik Memori</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Analisis Lalu Lintas Jaringan</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Analisis Malware (Dasar/Statis)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Respons Insiden</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-cyber-neon" /> Perburuan Ancaman</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 border-t border-cyber-border text-center">
          <h2 className="text-3xl font-bold text-white mb-4"><span className="text-cyber-neon font-mono text-2xl mr-2">04.</span>Apa Selanjutnya?</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Hubungi Saya</h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            Apakah Anda memiliki pertanyaan, proposal proyek, atau hanya ingin menyapa, kotak masuk saya selalu terbuka. Saya akan berusaha sebaik mungkin untuk membalas Anda!
          </p>
          <a href="mailto:digitalforensics.id@gmail.com?subject=Pesan%20dari%20Portofolio%20Website" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-cyber-neon text-cyber-neon font-mono hover:bg-cyber-neon/10 transition-colors rounded-sm text-lg">
            <Mail size={20} />
            Kirim Pesan
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-cyber-border font-mono text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <p>Didesain & Dibangun oleh <span className="text-gray-400">Lingga Putra Pratama Jaya Yudha</span></p>
            <p className="opacity-50">© {new Date().getFullYear()} Hak Cipta Dilindungi.</p>
          </div>
          <div className="flex justify-center gap-6">
            <motion.a 
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="https://www.linkedin.com/in/lingga-putra-pratama-jaya-yudha/" target="_blank" rel="noopener noreferrer" className="transition-colors p-2 -m-2 hover:text-[#00ff41]" aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}

