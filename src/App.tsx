import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from "lucide-react";
import { 
  Play, 
  Camera, 
  Brush, 
  ArrowRight, 
  ExternalLink, 
  X, 
  ChevronRight,
  Menu,
  Instagram,
  Mail,
  Linkedin
} from 'lucide-react';

// --- Components ---

const Navbar = ({
  activeSection,
  onSectionChange,
}: {
  activeSection: string;
  onSectionChange: (s: string) => void;
}) => {
  const navItems = ['Home', 'Contact'];

  return (
    <nav className="transition-all duration-500 border-b border-brand-border bg-brand-paper/80 backdrop-blur-md h-[60px] flex items-center">
  <div className="max-w-7xl mx-auto px-10 w-full flex justify-between items-center text-brand-ink">
    <div className="flex items-center gap-4">
     

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="brand-title text-lg tracking-wider cursor-pointer"
        onClick={() => onSectionChange("home")}
      >
        ZoneOf M
      </motion.div>
    </div>

    <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
      {navItems.map((item) => (
        <button
          key={item}
          onClick={() => onSectionChange(item.toLowerCase())}
          className={`transition-colors relative pb-1 ${
            activeSection === item.toLowerCase()
              ? "text-brand-ink"
              : "text-brand-meta hover:text-brand-ink"
          }`}
        >
          {item}
          {activeSection === item.toLowerCase() && (
            <motion.span layoutId="underline" className="absolute bottom-0 left-0 w-full h-px bg-brand-ink" />
          )}
        </button>
      ))}
    </div>
  </div>
</nav>
  );
};

const SectionHeader = ({ title, subtitle, number }: { title: string, subtitle: string, number: string }) => (
  <div className="mb-12 border-b border-brand-border pb-6 flex items-baseline justify-between">
    <div className="text-brand-ink">
      <h2 className="text-4xl ">{title}</h2>
      {subtitle && <p className="text-brand-muted font-sans text-xs mt-2 max-w-md tracking-wide uppercase">{subtitle}</p>}
    </div>
    <span className="font-mono text-[9px] text-brand-meta uppercase tracking-widest">{number} / SECTION</span>
  </div>
);

const ProjectCard = ({ title, year, category, image, onClick, aspectRatio = "aspect-square" }: any) => (
  <motion.div 
    whileHover={{ backgroundColor: "#1a1a1a" }}
    className="group cursor-pointer  border border-brand-border overflow-hidden relative transition-colors"
    onClick={onClick}
  >
    <div className={`${aspectRatio} overflow-hidden  relative`}>
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-[10px] uppercase tracking-widest font-mono">View Details</span>
      </div>
    </div>
  </motion.div>
);

const PhotoGrid = ({ items, onItemClick }: any) => {
  const [spans, setSpans] = useState<number[]>([]);

  useEffect(() => {
    const calculateSpans = () => {
      const newSpans = items.map((item: any) => {
        const img = new Image();
        img.src = item.url;
        return new Promise<number>((resolve) => {
          img.onload = () => {
            const ratio = img.height / img.width;
            const baseRowHeight = 8;
            const gap = 1;
            const renderedWidth = window.innerWidth >= 768
              ? (window.innerWidth - 80) / 3
              : (window.innerWidth - 40) / 2;
            const renderedHeight = renderedWidth * ratio;
            const span = Math.ceil((renderedHeight + gap) / (baseRowHeight + gap));
            resolve(span);
          };
          img.onerror = () => resolve(30);
        });
      });

      Promise.all(newSpans).then(setSpans);
    };

    calculateSpans();
    window.addEventListener("resize", calculateSpans);
    return () => window.removeEventListener("resize", calculateSpans);
  }, [items]);

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 gap-[1px] mt-10 auto-rows-[8px]"
    >
      {items.map((item: any, index: number) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.04 }}
          onClick={() => onItemClick(item)}
          style={{ gridRow: `span ${spans[index] || 30}` }}
          className="group w-full overflow-hidden border border-brand-border/20 bg-black text-left"
        >
          <img
            src={item.url}
            alt={item.caption}
            className="w-full h-full object-cover transition duration-500 group-hover:opacity-90"
            referrerPolicy="no-referrer"
          />

          {/* 캡션은 기본 숨김
          <div className="p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-meta">
              {item.caption}
            </p>
            <p className="text-brand-muted leading-relaxed mt-2 text-[13px]">
              {item.desc}
            </p>
          </div>
          */}
        </motion.button>
      ))}
    </div>
  );
};

// --- Sections ---
const DesignGrid = ({ items, onItemClick }: any) => {
  const [spans, setSpans] = useState<number[]>([]);

  useEffect(() => {
    const calculateSpans = () => {
      const newSpans = items.map((item: any) => {
        const img = new Image();
        img.src = item.img;
        return new Promise<number>((resolve) => {
          img.onload = () => {
            const ratio = img.height / img.width;
            const baseRowHeight = 8;
            const gap = 1;
            const renderedWidth = window.innerWidth >= 768
              ? (window.innerWidth - 80) / 3
              : (window.innerWidth - 40) / 2;
            const renderedHeight = renderedWidth * ratio;
            const span = Math.ceil((renderedHeight + gap) / (baseRowHeight + gap));
            resolve(span);
          };
          img.onerror = () => resolve(30);
        });
      });

      Promise.all(newSpans).then(setSpans);
    };

    calculateSpans();
    window.addEventListener("resize", calculateSpans);
    return () => window.removeEventListener("resize", calculateSpans);
  }, [items]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] mt-10 auto-rows-[8px]">
      {items.map((item: any, index: number) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.04 }}
          onClick={() => onItemClick(item)}
          style={{ gridRow: `span ${spans[index] || 30}` }}
          className="group w-full overflow-hidden border border-brand-border/20 bg-black text-left"
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition duration-500 group-hover:opacity-90"
            referrerPolicy="no-referrer"
          />

          {/* 캡션은 기본 숨김
          <div className="p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-meta">
              {item.title}
            </p>
            <p className="text-brand-muted leading-relaxed mt-2 text-[13px]">
              {item.desc}
            </p>
          </div>
          */}
        </motion.button>
      ))}
    </div>
  );
};

const Home = ({ onSectionChange }: { onSectionChange: (s: string) => void }) => (
  <section id="home" className="section-home min-h-[calc(100vh-172px)] pt-0 flex flex-col">
    <div className="w-full flex-1 flex flex-col">
      {/* Hero Intro */}
      <div className="hero-home relative h-[300px] md:h-[400px] flex flex-col justify-center items-center text-center overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 z-0 bg-radial-at-center from-transparent to-brand-paper/90 opacity-40"></div>
        <div className="relative z-10 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title text-6xl md:text-8xl text-white"
          >
            Turning Ideas into Visual Scenes
          </motion.h1>
        </div>
      </div>

      {/* Simplified Tabs / Portal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-brand-border flex-1">
        {[
  { title: "About", id: "about", className: "tile-about" },
  { title: "Film", id: "film", className: "tile-film" },
  { title: "Photo", id: "photo", className: "tile-photo" },
  { title: "Design", id: "design", className: "tile-design" }
].map((item, i) => (
          <motion.button 
            key={i}
            onClick={() => onSectionChange(item.id)}
            whileHover={{ backgroundColor: "#1a1a1a" }}
            className={`${item.className} flex flex-col justify-center items-center p-10 group transition-colors text-center`}
          >
            <div className="flex flex-col items-center gap-4">
             <h3 className="tile-title relative z-10 text-3xl md:text-4xl text-brand-ink">
  {item.title}
</h3>
              <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <ArrowRight size={14} className="text-brand-ink" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
 <section id="about" className="section-about py-24 px-10 min-h-[708px]">
    <div className="max-w-4xl mx-auto">
      <SectionHeader 
        number="01" 
        title="ALL About Me !" 
        subtitle=""
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left mt-16">
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl md:text-3xl font-semibold text-brand-ink mb-8">강민서</h2>
        <div className="space-y-6 text-brand-muted text-[15px] leading-relaxed">
           <p>한성대학교 문학문화콘텐츠학과 미디어디자인 트랙에 재학 중이다.
영화, 사진, 디자인을 중심으로 시각적 언어와 스토리텔링을 탐구하며, 콘텐츠 기획과 이미지 구성을 통해 아이디어를 장면으로 시각화하는 작업을 지향한다.</p>
           <p></p>
        </div>
      </div>
      <div className="flex items-center">
        <ul className="w-full space-y-6 text-[13px]">
          {[
            { k: "Education", v: "한성대학교 문학문화콘텐츠학과 미디어디자인 트랙 재학 중" },
            { k: "Focus", v: "영화, 사진, 디자인, 콘텐츠 기획" },
            { k: "Software", v: "Premiere Pro, Photoshop, Illustrator, Figma" },
            { k: "Contact", v: "Instagram / Email" }
          ].map((item, i) => (
            <li key={i} className="flex gap-10 border-b border-brand-border pb-4">
              <span className="text-[10px] text-brand-meta uppercase tracking-widest w-24 shrink-0">{item.k}</span>
              <span className="text-brand-ink">{item.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>
);

const Film = () => {
  const [selectedFilm, setSelectedFilm] = useState<any>(null);

  const films = [
    { id: 1, title: "TURN", year: "2025", category: "Short Film", image: "/images/turn-thumb.jpg", video: "/videos/TURN.mp4", desc: "용기를 냈을 때 달라지는 건 나 자신이다. 친구와 이별하고 춤을 그만 둔 가연. 다시 몸을 움직여본다."
  },
  
  ];

  return (
    <section id="film" className="section-film py-24 px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          number="02" 
          title="Film" 
          subtitle="ARCHIVE OF MOTION & NARRATIVE"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {films.map(film => (
            <ProjectCard 
              key={film.id} 
              {...film} 
              onClick={() => setSelectedFilm(film)} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedFilm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full  border border-brand-border overflow-hidden relative"
            >
              <button 
                onClick={() => setSelectedFilm(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-brand-ink text-brand-paper transition-transform hover:scale-110"
              >
                <X size={20} />
              </button>
             <div className="aspect-video bg-black">
              <video
    src={selectedFilm.video}
    className="w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  />
</div>
 
              <div className="p-10 text-left">
                <div className="flex justify-between items-start mb-6">
                   <div>
                     <span className="font-mono text-[9px] text-brand-meta uppercase tracking-widest">{selectedFilm.category}</span>
                     <h2 className="text-3xl font-serif  mt-2 text-brand-ink">{selectedFilm.title}</h2>
                   </div>
                   <p className="font-mono text-lg text-brand-meta">{selectedFilm.year}</p>
                </div>
                <p className="text-brand-muted leading-relaxed max-w-2xl text-[15px] mb-8">
  {selectedFilm.desc}
</p>
                <a
    href={selectedFilm.video}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block border border-brand-ink text-brand-ink px-6 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-brand-ink hover:text-brand-paper"
  >
    Watch Full Video
  </a>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Photo = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const photos = [
    { url: "/photo/1.jpg", caption: "", desc: "" },
    { url: "/photo/2.jpg", caption: "", desc: "" },
    { url: "/photo/3.jpg", caption: "", desc: "" },
    { url: "/photo/4.jpg", caption: "", desc: "" },
    { url: "/photo/5.jpg", caption: "", desc: "" },
    { url: "/photo/6.jpg", caption: "", desc: "" },
    { url: "/photo/7.jpg", caption: "", desc: "" },
    { url: "/photo/8.jpg", caption: "", desc: "" },
    { url: "/photo/9.jpg", caption: "", desc: "" },
    { url: "/photo/10.jpg", caption: "", desc: "" },
  ];

  return (
   <section id="photo" className="section-photo py-24 px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          number="03" 
          title="Photo" 
          subtitle="SONY a7c"
        />
        <PhotoGrid items={photos} onItemClick={setSelectedPhoto} />
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] /95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-auto max-w-[90vw] max-h-[90vh] border border-brand-border overflow-hidden relative bg-brand-paper"
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-brand-ink text-brand-paper"
              >
                <X size={20} />
              </button>
              <div className="bg-black flex items-center justify-center">
  <img
    src={selectedPhoto.url}
    className="block max-w-[90vw] max-h-[80vh] w-auto h-auto"
    referrerPolicy="no-referrer"
  />
</div>
              <div className="p-8 text-left">
                <span className="font-mono text-[9px] text-brand-meta uppercase tracking-widest">Photograph / Archive</span>
                <h2 className="text-2xl font-serif  mt-2 text-brand-ink">{selectedPhoto.caption}</h2>
                <p className="text-brand-muted leading-relaxed mt-4 text-[14px]">
                   {selectedPhoto.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Design = () => {
  const [selectedDesign, setSelectedDesign] = useState<any>(null);
  const projects = [
  { title: "Wallpaper-watch", year: "2025", category: "기초 미디어 디자인", img: "/design/003.png", desc: "" },
  { title: "Wallpaper002", year: "2025", category: "기초 미디어 디자인", img: "/design/002.png", desc: "" },
  { title: "Wallpaper001", year: "2025", category: "기초 미디어 디자인", img: "/design/잠금해제.jpg", desc: "" },
];
  return (
    <section id="design" className="section-design py-24 px-10 border-t border-brand-border">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader 
          number="04" 
          title="Design" 
          subtitle="TYPOGRAPHY & EDITORIAL"
        />
        
        <DesignGrid items={projects} onItemClick={setSelectedDesign} />
      </div>

      <AnimatePresence>
        {selectedDesign && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-paper/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.9, opacity: 0 }}
  className="w-auto max-w-[90vw] max-h-[90vh] border border-brand-border overflow-hidden relative bg-brand-paper"
>
  <button
    onClick={() => setSelectedDesign(null)}
    className="absolute top-6 right-6 z-10 p-2 bg-brand-ink text-brand-paper"
  >
    <X size={20} />
  </button>

  <div className="bg-black flex items-center justify-center">
    <img
      src={selectedDesign.img}
      className="block max-w-[90vw] max-h-[80vh] w-auto h-auto"
      referrerPolicy="no-referrer"
    />
  </div>

  {selectedDesign.title && (
    <div className="p-6 text-left">
      <span className="font-mono text-[9px] text-brand-meta uppercase tracking-widest">
        {selectedDesign.category} / {selectedDesign.year}
      </span>
      <h2 className="text-2xl mt-2 text-brand-ink">{selectedDesign.title}</h2>
    </div>
  )}

  {/* 필요할 때 설명 다시 열기
  {selectedDesign.desc && (
    <div className="px-6 pb-6">
      <p className="text-brand-muted leading-relaxed text-[14px]">
        {selectedDesign.desc}
      </p>
    </div>
  )}
  */}
</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


const Contact = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mpqkrzdb", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-10 bg-brand-paper min-h-[708px] flex items-start justify-center"
    >
      <div className="max-w-6xl w-full space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="tile-title text-5xl md:text-7xl text-brand-ink">Contact</h2>

          <div className="text-brand-ink text-2xl md:text-5xl leading-[1.25] tracking-[-0.02em]">
            <p>Seoul, Korea</p>
            <p>Mobile / +82-10-6282-1679</p>
            <p>Email / minseo0ju@gmail.com</p>
            <p>Instagram / @entre.s.nous</p>
          </div>
        </motion.div>

        <div className="border-t border-brand-border pt-12">
          <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="space-y-3">
              <label className="block text-brand-ink text-lg font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-[#2b2b2b] text-brand-ink px-5 py-4 outline-none border border-transparent focus:border-brand-border transition"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-brand-ink text-lg font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                required
                className="w-full bg-[#2b2b2b] text-brand-ink px-5 py-4 outline-none border border-transparent focus:border-brand-border transition"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-brand-ink text-lg font-medium">Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                required
                className="w-full bg-[#2b2b2b] text-brand-ink px-5 py-4 outline-none border border-transparent focus:border-brand-border transition resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-[#2b2b2b] text-brand-ink px-10 py-4 text-lg font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Submit"}
              </button>

              {status === "success" && (
                <p className="text-brand-ink text-sm uppercase tracking-[0.18em]">
                  Message sent successfully.
                </p>
              )}

              {status === "error" && (
                <p className="text-red-400 text-sm uppercase tracking-[0.18em]">
                  Submission failed.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onSectionChange }: { onSectionChange: (s: string) => void }) => (
  <footer className="py-12 px-10 border-t border-brand-border bg-brand-paper">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="space-y-1 text-center md:text-left text-brand-ink">
        <h2 className="text-xl font-serif ">MinSeo Kang</h2>
      </div>

      <div className="flex flex-col items-center md:items-end gap-4">
        <div className="flex gap-6 text-brand-meta">
          <a
            href="https://instagram.com/entre.s.nous"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-ink transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>

          <button
            onClick={() => alert('준비 중입니다.')}
            className="hover:text-brand-ink transition-colors"
            aria-label="LinkedIn"
            type="button"
          >
            <Linkedin size={16} />
          </button>

          <button
            onClick={() => onSectionChange('contact')}
            className="hover:text-brand-ink transition-colors"
            aria-label="Contact"
            type="button"
          >
            <Mail size={16} />
          </button>
        </div>

        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-brand-meta">
          © 2026 ZoneOfM
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showTopUI, setShowTopUI] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setShowTopUI(true);
      } else if (currentScrollY > lastScrollY) {
        setShowTopUI(false);
      } else {
        setShowTopUI(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setShowTopUI(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY]);

  return (
    <div className="selection:bg-brand-ink selection:text-white bg-brand-paper min-h-screen flex flex-col">
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showTopUI ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      <main className="flex-1 mt-[60px] relative">
        {activeSection !== "home" && (
  <div
    className={`fixed top-[72px] left-10 z-40 transition-all duration-300 ${
      showTopUI
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-6 pointer-events-none"
    }`}
  >
    <button
      onClick={() => setActiveSection("home")}
      className="text-brand-meta hover:text-brand-ink transition-colors"
      aria-label="Back to Home"
      type="button"
    >
      <ArrowLeft size={22} strokeWidth={1.75} />
    </button>
  </div>
)}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'home' && <Home onSectionChange={setActiveSection} />}
            {activeSection === 'about' && <About />}
            {activeSection === 'film' && <Film />}
            {activeSection === 'photo' && <Photo />}
            {activeSection === 'design' && <Design />}
            {activeSection === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onSectionChange={setActiveSection} />
    </div>
  );
}

