import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, TrendingUp, Calculator, Triangle, ArrowRight, Waves, CheckCircle2, X, Equal, Bot, Sparkles } from 'lucide-react';

// --- HELPER COMPONENTS FOR MATH NOTATION ---

const Frac = ({ up, down }: { up: React.ReactNode, down: React.ReactNode }) => (
  <div className="inline-flex flex-col items-center align-middle mx-1 font-serif relative top-1">
    <span className="border-b border-white px-1 pb-[1px] mb-[1px] text-center w-full leading-none whitespace-nowrap">{up}</span>
    <span className="text-center w-full leading-none whitespace-nowrap">{down}</span>
  </div>
);

const Sqrt = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-flex items-baseline font-serif whitespace-nowrap">
    <span className="text-lg">√</span>
    <span className="border-t border-white px-1">{children}</span>
  </span>
);

const Lim = ({ to, val }: { to: React.ReactNode, val: React.ReactNode }) => (
  <div className="inline-flex flex-col items-center align-middle mr-2 font-serif whitespace-nowrap">
    <span className="italic">lim</span>
    <span className="text-[0.6em] -mt-1">{to}→{val}</span>
  </div>
);

const Int = ({ lower, upper }: { lower?: React.ReactNode, upper?: React.ReactNode }) => (
  <span className="inline-flex items-center relative align-middle mx-1 whitespace-nowrap">
    <span className="text-2xl font-light italic font-serif leading-none">∫</span>
    {(lower || upper) && (
       <span className="flex flex-col justify-between h-7 ml-0.5 text-[10px] leading-none">
          <span className="transform translate-y-0.5">{upper}</span>
          <span className="transform -translate-y-0.5">{lower}</span>
       </span>
    )}
  </span>
);

// --- UI COMPONENTS ---

interface MacWindowProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const MacWindow: React.FC<MacWindowProps> = ({ title, children, className = "" }) => (
  <div className={`bg-[#050a08] border border-neon-green/20 rounded-lg overflow-hidden flex flex-col shadow-[0_0_30px_rgba(212,255,0,0.05)] ${className}`}>
    <div className="bg-[#020503] px-4 py-2 flex items-center justify-between border-b border-neon-green/10">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
      </div>
      <span className="font-tech text-[10px] text-neon-green/60 uppercase tracking-[0.2em]">{title}</span>
    </div>
    <div className="relative flex-grow bg-[#020d04]">
      {children}
    </div>
  </div>
);

// --- SCIENTIFIC CALCULATOR COMPONENT ---
const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handlePress = (val: string) => {
    if (result) {
        setDisplay(val);
        setExpression(val);
        setResult(null);
        return;
    }
    if (display === '0' && val !== '.') {
      setDisplay(val);
      setExpression(val);
    } else {
      setDisplay(display + val);
      setExpression(expression + val);
    }
  };

  const handleOp = (op: string) => {
    if (result) {
        setExpression(result + op);
        setDisplay(result + op);
        setResult(null);
    } else {
        setExpression(expression + op);
        setDisplay(display + op);
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setResult(null);
  };

  const deleteChar = () => {
    if (result) {
        clear();
        return;
    }
    const newVal = display.slice(0, -1) || '0';
    setDisplay(newVal);
    setExpression(expression.slice(0, -1));
  };

  const calculate = () => {
    try {
      let evalExpr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/√/g, 'Math.sqrt')
        .replace(/π/g, 'Math.PI');

      // eslint-disable-next-line no-eval
      const res = eval(evalExpr);
      const formatted = Number.isInteger(res) ? res.toString() : res.toFixed(4);
      setResult(formatted);
      setDisplay(formatted);
    } catch (e) {
      setResult('Error');
      setDisplay('Error');
    }
  };

  const Button = ({ label, type = 'num', onClick }: { label: React.ReactNode, type?: 'num' | 'op' | 'action' | 'func', onClick?: () => void }) => {
    let bg = "bg-[#1a2e20] hover:bg-[#2a4532]";
    let text = "text-white";

    if (type === 'op') { bg = "bg-neon-green/20 hover:bg-neon-green/40"; text = "text-neon-green font-bold"; }
    if (type === 'action') { bg = "bg-red-500/20 hover:bg-red-500/40"; text = "text-red-400"; }
    if (type === 'func') { bg = "bg-[#051a0d] border border-white/10 hover:bg-white/5"; text = "text-gray-300 font-tech"; }

    return (
      <button 
        onClick={onClick ? onClick : () => typeof label === 'string' && handlePress(label)}
        className={`${bg} ${text} h-10 md:h-12 text-sm md:text-base rounded flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full">
        <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px w-12 bg-neon-green"></div>
            <h3 className="font-tech text-xl md:text-2xl text-neon-green font-bold tracking-wider uppercase">Calculator Studio</h3>
            <div className="h-px w-12 bg-neon-green"></div>
        </div>
        <div className="bg-[#020d04] border-4 border-[#1a2e20] rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_0_40px_rgba(212,255,0,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="bg-[#0f1f15] border border-neon-green/30 rounded-xl p-3 md:p-4 mb-4 text-right shadow-inner min-h-[60px] md:min-h-[80px] flex flex-col justify-end relative">
                <div className="text-gray-500 text-[10px] md:text-xs font-mono h-4 overflow-hidden">{expression.replace(/\*/g, '×').replace(/\//g, '÷')}</div>
                <div className="text-2xl md:text-4xl font-mono text-neon-green tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {display}
                </div>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                <Button label="sin" type="func" onClick={() => handlePress('sin(')} />
                <Button label="cos" type="func" onClick={() => handlePress('cos(')} />
                <Button label="tan" type="func" onClick={() => handlePress('tan(')} />
                <Button label="(" type="func" onClick={() => handlePress('(')} />
                <Button label=")" type="func" onClick={() => handlePress(')')} />
                <Button label="x²" type="func" onClick={() => handleOp('^2')} />
                <Button label="√" type="func" onClick={() => handlePress('√(')} />
                <Button label="log" type="func" onClick={() => handlePress('log(')} />
                <Button label="ln" type="func" onClick={() => handlePress('ln(')} />
                <Button label="π" type="func" onClick={() => handlePress('π')} />
                <Button label="C" type="action" onClick={clear} />
                <Button label="DEL" type="action" onClick={deleteChar} />
                <Button label="%" type="func" onClick={() => handleOp('/100')} />
                <Button label="^" type="func" onClick={() => handleOp('^')} />
                <Button label={<div className="text-lg">÷</div>} type="op" onClick={() => handleOp('/')} />
                <div className="md:hidden"></div>
                <Button label="7" />
                <Button label="8" />
                <Button label="9" />
                <div className="hidden md:block"></div>
                <Button label={<X size={16} />} type="op" onClick={() => handleOp('*')} />
                <Button label="4" />
                <Button label="5" />
                <Button label="6" />
                <div className="hidden md:block"></div>
                <Button label="-" type="op" onClick={() => handleOp('-')} />
                <Button label="1" />
                <Button label="2" />
                <Button label="3" />
                <div className="hidden md:block"></div>
                <Button label="+" type="op" onClick={() => handleOp('+')} />
                <Button label="0" onClick={() => handlePress('0')} />
                <Button label="." onClick={() => handlePress('.')} />
                <Button label="00" onClick={() => handlePress('00')} />
                <div className="hidden md:block"></div>
                <Button label={<Equal size={20} />} type="op" onClick={calculate} />
            </div>
        </div>
    </div>
  );
};


// --- DATA MATERI ---
const modulesData = {
  1: {
    title: "TURUNAN",
    subtitle: "Analisis Laju Perubahan & Gradien Garis Singgung",
    icon: <TrendingUp size={40} className="text-black" />,
    defTitle: "DEFINISI MENDALAM",
    def: "Turunan (Derivatif) bukan sekadar rumus menghitung pangkat, melainkan jantung dari kalkulus diferensial. Ia mengukur seberapa sensitif perubahan suatu fungsi (output) terhadap perubahan inputnya, yang dikenal sebagai 'laju perubahan sesaat'. Secara geometris, turunan pada titik tertentu merepresentasikan gradien (kemiringan) garis singgung kurva di titik tersebut.",
    formulas: [
      { label: "1. ATURAN PANGKAT", render: <div className="text-xl md:text-2xl font-serif text-white whitespace-nowrap flex items-center gap-2">f(x) = ax<sup>n</sup> <span className="text-neon-green mx-2">⇒</span> f'(x) = n · ax<sup>n-1</sup></div> },
      { label: "2. PERKALIAN", render: <div className="text-xl md:text-2xl font-serif text-white whitespace-nowrap flex items-center gap-2">y = u · v <span className="text-neon-green mx-2">⇒</span> y' = u'v + uv'</div> },
      { label: "3. PEMBAGIAN", render: <div className="text-xl md:text-2xl font-serif text-white flex items-center whitespace-nowrap gap-2">y = <Frac up="u" down="v" /> <span className="text-neon-green mx-3">⇒</span> y' = <Frac up="u'v - uv'" down={<span>v<sup>2</sup></span>} /></div> }
    ],
    example: {
      q: (
        <div className="flex flex-col gap-2">
            <span className="italic text-gray-300 block mb-1">Tentukan turunan pertama dari:</span>
            <div className="text-xl md:text-2xl font-serif text-white border-l-4 border-neon-green pl-3 py-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                f(x) = 5x<sup>3</sup> - 2x<sup>2</sup> + 10
            </div>
        </div>
      ),
      steps: [
        "Identifikasi fungsi sebagai penjumlahan suku-suku.",
        <span>Menggunakan <strong>Rumus 1 (Aturan Pangkat)</strong>: Kalikan koefisien dengan pangkat, lalu kurangi pangkat dengan 1.</span>,
        <span>Suku pertama (5x³): 3 · 5x<sup>(3-1)</sup> = 15x<sup>2</sup>.</span>,
        <span>Suku kedua (-2x²): 2 · (-2)x<sup>(2-1)</sup> = -4x.</span>,
        "Suku ketiga (10): Turunan dari konstanta adalah 0.",
        <span>Hasil akhir: f'(x) = 15x<sup>2</sup> - 4x.</span>
      ],
      ans: <span>15x<sup>2</sup> - 4x</span>
    },
    calcType: 'derivative'
  },
  2: {
    title: "ALJABAR",
    subtitle: "Manipulasi Simbol & Struktur Matematika",
    icon: <Calculator size={40} className="text-black" />,
    defTitle: "DEFINISI MENDALAM",
    def: "Aljabar adalah bahasa universal matematika yang menggunakan simbol (seperti x, y) untuk merepresentasikan angka yang belum diketahui atau nilai yang dapat berubah. Ini adalah alat utama untuk menyederhanakan masalah dunia nyata menjadi persamaan yang dapat dipecahkan.",
    formulas: [
      { label: "1. PERSAMAAN KUADRAT", render: <div className="text-xl font-serif whitespace-nowrap flex items-center gap-2">ax<sup>2</sup> + bx + c = 0</div> },
      { label: "2. RUMUS ABC", render: <div className="text-xl font-serif flex items-center whitespace-nowrap gap-2"><span>x<sub>1,2</sub> = </span><Frac up={<span>-b ± <Sqrt>b<sup>2</sup> - 4ac</Sqrt></span>} down={<span>2a</span>} /></div> },
      { label: "3. SELISIH KUADRAT", render: <div className="text-xl font-serif whitespace-nowrap flex items-center gap-2">a<sup>2</sup> - b<sup>2</sup> = (a + b)(a - b)</div> }
    ],
    example: {
      q: (
        <div className="flex flex-col gap-2">
            <span className="text-gray-300 block mb-1">Faktorkan persamaan berikut:</span>
            <div className="text-xl md:text-2xl font-serif text-white border-l-4 border-neon-green pl-3 py-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                x<sup>2</sup> - 49 = 0
            </div>
        </div>
      ),
      steps: [
        "Identifikasi bentuk persamaan. Ini adalah selisih dua kuadrat.",
        <span>Menggunakan <strong>Rumus 3 (Selisih Kuadrat)</strong>: a<sup>2</sup> - b<sup>2</sup> = (a+b)(a-b).</span>,
        "Di sini, a = x dan b = 7 (karena 7² = 49).",
        "Substitusikan ke dalam rumus: (x + 7)(x - 7) = 0.",
        "Maka, akar-akarnya adalah x = -7 atau x = 7."
      ],
      ans: "(x + 7)(x - 7)"
    },
    calcType: 'algebra'
  },
  3: {
    title: "TRIGONOMETRI",
    subtitle: "Geometri Sudut & Analisis Gelombang",
    icon: <Triangle size={40} className="text-black" />,
    defTitle: "DEFINISI MENDALAM",
    def: "Trigonometri menjembatani geometri segitiga dengan analisis fenomena periodik. Awalnya mempelajari hubungan sisi dan sudut pada segitiga siku-siku (sin, cos, tan), materi ini berkembang menjadi fungsi gelombang yang memodelkan segala sesuatu yang bergetar atau berputar.",
    formulas: [
      { label: "1. DEFINISI SINUS", render: <div className="text-xl font-serif flex items-center whitespace-nowrap gap-2"><span>sin θ = </span><Frac up="Sisi Depan" down="Sisi Miring" /></div> },
      { label: "2. IDENTITAS PYTHAGORAS", render: <div className="text-xl font-serif whitespace-nowrap flex items-center gap-2">sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1</div> }
    ],
    example: {
      q: (
        <div className="flex flex-col gap-2">
            <span className="text-gray-300 block mb-1">Diketahui segitiga siku-siku dengan sisi depan 3 cm dan sisi miring 5 cm.</span>
            <div className="text-xl md:text-2xl font-serif text-white font-bold border-l-4 border-neon-green pl-3 py-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                Hitung sin θ!
            </div>
        </div>
      ),
      steps: [
        "Identifikasi elemen yang diketahui: Depan = 3, Miring = 5.",
        <span>Terapkan <strong>Rumus 1 (Definisi Sinus)</strong>: sin θ = Depan / Miring.</span>,
        "Substitusi nilai: sin θ = 3 / 5.",
        "Lakukan pembagian sederhana: 3 ÷ 5 = 0.6.",
        "Nilai sinus sudut tersebut adalah 0.6."
      ],
      ans: "0.6"
    },
    calcType: 'trig'
  },
  4: {
    title: "LIMIT",
    subtitle: "Analisis Ketidakterhinggaan & Kontinuitas",
    icon: <ArrowRight size={40} className="text-black" />,
    defTitle: "DEFINISI MENDALAM",
    def: "Limit adalah konsep revolusioner yang menangani 'pendekatan' nilai tanpa harus benar-benar mencapainya. Ini adalah fondasi utama kalkulus yang memungkinkan kita mendefinisikan turunan dan integral. Limit menjelaskan perilaku fungsi saat inputnya mendekati suatu titik tertentu atau menuju tak hingga.",
    formulas: [
      { label: "1. SUBSTITUSI LANGSUNG", render: <div className="text-lg font-serif whitespace-nowrap flex items-center gap-2">Jika f(c) terdefinisi, <Lim to="x" val="c" />f(x) = f(c)</div> },
      { label: "2. DALIL L'HOPITAL", render: <div className="text-xl font-serif flex items-center whitespace-nowrap gap-2"><Lim to="x" val="c" /><Frac up="f(x)" down="g(x)" /><span> = </span><Frac up="f'(c)" down="g'(c)" /></div> }
    ],
    example: {
      q: (
        <div className="flex flex-col gap-2 w-full">
            <p className="text-gray-300 block mb-1">Hitung limit berikut:</p>
            <div className="text-xl md:text-2xl font-serif text-white flex items-center gap-2 border-l-4 border-neon-green pl-3 py-1 overflow-x-auto scrollbar-hide w-full">
                <Lim to="x" val="2" /> <Frac up="x² - 4" down="x - 2" />
            </div>
        </div>
      ),
      steps: [
        "Coba substitusi langsung x = 2. Hasilnya (4-4)/(2-2) = 0/0 (Bentuk Tak Tentu).",
        <span>Karena hasilnya 0/0, gunakan <strong>Rumus 2 (Dalil L'Hopital)</strong>.</span>,
        "Turunkan pembilang: Turunan (x² - 4) adalah 2x.",
        "Turunkan penyebut: Turunan (x - 2) adalah 1.",
        "Limit baru: Limit x→2 dari (2x / 1).",
        "Substitusi x = 2 ke hasil turunan: 2(2) = 4."
      ],
      ans: "4"
    },
    calcType: 'limit'
  },
  5: {
    title: "INTEGRAL",
    subtitle: "Akumulasi Luas & Anti-Turunan",
    icon: <Waves size={40} className="text-black" />,
    defTitle: "DEFINISI MENDALAM",
    def: "Integral adalah kebalikan dari diferensiasi (turunan). Jika turunan membedah fungsi menjadi laju perubahan instan, integral menjumlahkan (mengakumulasi) perubahan-perubahan kecil tersebut. Secara visual, integral tentu menghitung luas area presisi di bawah kurva fungsi.",
    formulas: [
      { label: "1. POWER RULE (PANGKAT)", render: <div className="text-xl font-serif flex items-center whitespace-nowrap gap-2"><Int /><span>x<sup>n</sup> dx = </span><Frac up="1" down="n+1" /><span>x<sup>n+1</sup> + C</span></div> },
      { label: "2. INTEGRAL PARSIAL", render: <div className="text-xl font-serif flex items-center whitespace-nowrap gap-2"><Int /><span>u dv = uv - </span><Int /><span>v du</span></div> },
      { label: "3. TRIGONOMETRI DASAR", render: <div className="text-xl font-serif flex items-center whitespace-nowrap gap-2"><Int /><span>cos x dx = sin x + C</span></div> }
    ],
    example: {
      q: (
        <div className="flex flex-col gap-2 w-full">
            <p className="text-gray-300 block mb-1">Selesaikan integral tak tentu:</p>
            <div className="text-xl md:text-2xl font-serif text-white flex items-center gap-2 border-l-4 border-neon-green pl-3 py-1 overflow-x-auto scrollbar-hide w-full">
                <Int /> 4x<sup>3</sup> dx
            </div>
        </div>
      ),
      steps: [
        "Identifikasi koefisien (a=4) dan pangkat (n=3).",
        <span>Gunakan <strong>Rumus 1 (Power Rule)</strong>: Tambahkan 1 pada pangkat, lalu bagi koefisien dengan pangkat baru.</span>,
        "Pangkat baru: n + 1 = 3 + 1 = 4.",
        "Koefisien baru: 4 / 4 = 1.",
        "Bentuk hasil: 1 · x<sup>4</sup>.",
        "Jangan lupa tambahkan konstanta integrasi (+ C)."
      ],
      ans: <span>x<sup>4</sup> + C</span>
    },
    calcType: 'integral'
  }
};

// --- ADVANCED 3D VISUALIZATION COMPONENT ---
const Visualization: React.FC<{ type: string }> = ({ type }) => {
    
    // Animation State
    const [time, setTime] = useState(0);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const animate = () => {
            setTime(t => t + 0.02); // Smooth 60fps increment
            animationRef.current = requestAnimationFrame(animate);
        }
        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    const renderVisual = () => {
        const width = 300;
        const height = 180;
        const neonGreen = "#D4FF00";
        const cyan = "#00F0FF";
        const darkBg = "#020d04";

        switch (type) {
            case 'algebra': {
                const a = Math.sin(time * 0.5) * 0.008; 
                const c = Math.cos(time * 0.5) * 30; 
                const points = [];
                const originY = height / 2; 

                for (let x = 0; x <= width; x+=5) {
                    const dx = x - width/2;
                    const y = originY - ((a * dx * dx) + c);
                    points.push(`${x},${y}`);
                }
                const vertexY = originY - c;
                const graphColor = a > 0 ? neonGreen : cyan;

                return (
                    <>
                         <defs>
                            <filter id="glow-alg" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                         </defs>
                         <line x1={width/2} y1="0" x2={width/2} y2={height} stroke="rgba(255,255,255,0.1)" strokeDasharray="4" />
                         <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="rgba(255,255,255,0.1)" strokeDasharray="4" />
                         <polyline points={points.join(' ')} fill="none" stroke={graphColor} strokeWidth="2" filter="url(#glow-alg)" />
                         <text x="10" y="25" fill={graphColor} fontSize="11" fontFamily="monospace" className="font-bold">
                            y = {a.toFixed(4)}x² {c >= 0 ? '+' : '-'} {Math.abs(c).toFixed(0)}
                         </text>
                         <circle cx={width/2} cy={vertexY} r="4" fill="white" />
                    </>
                );
            }

            case 'limit': {
                const gapX = width / 2;
                const gapWidth = 10;
                const curvePoints = [];
                for (let x = 0; x <= width; x+=2) {
                    if (Math.abs(x - gapX) < gapWidth) continue; 
                    const y = height - (x * 0.4 + 40) - Math.sin(x*0.05)*10;
                    curvePoints.push(`${x},${y}`);
                }
                const t = (time % 4) / 4; 
                const approach = Math.pow(t, 0.5) * (width/2 - gapWidth - 5); 
                const leftX = 0 + approach;
                const rightX = width - approach;
                const getY = (x: number) => height - (x * 0.4 + 40) - Math.sin(x*0.05)*10;

                return (
                    <>
                         <defs>
                            <filter id="glow-lim" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                         </defs>
                        <line x1={gapX} y1="20" x2={gapX} y2={height} stroke="rgba(0, 240, 255, 0.3)" strokeDasharray="4" />
                        <polyline points={curvePoints.join(' ')} fill="none" stroke={cyan} strokeWidth="1.5" opacity="0.6" />
                        <circle cx={gapX} cy={getY(gapX)} r="4" stroke={neonGreen} strokeWidth="1.5" fill={darkBg} />
                        <circle cx={leftX} cy={getY(leftX)} r="3" fill={neonGreen} filter="url(#glow-lim)" />
                        <circle cx={rightX} cy={getY(rightX)} r="3" fill={neonGreen} filter="url(#glow-lim)" />
                        <text x={gapX + 10} y="30" fill="white" fontSize="10" fontFamily="monospace">lim x→c</text>
                        <text x="20" y={height - 20} fill={cyan} fontSize="10" fontFamily="monospace">Approaching...</text>
                    </>
                )
            }

            case 'derivative': {
                const points = [];
                for (let x = 0; x <= width; x+=4) {
                    const normalizedX = x * 0.03;
                    const y = height/2 + Math.sin(normalizedX) * 50;
                    points.push(`${x},${y}`);
                }
                const surferX = (time * 40) % width;
                const normalizedSurferX = surferX * 0.03;
                const surferY = height/2 + Math.sin(normalizedSurferX) * 50;
                const slope = Math.cos(normalizedSurferX) * 50 * 0.03;
                const L = 60;
                const x1 = surferX - L/2;
                const y1 = surferY - slope * (L/2); 
                const x2 = surferX + L/2;
                const y2 = surferY + slope * (L/2);

                return (
                    <>
                        <defs>
                            <filter id="glow-dev" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <polyline points={points.join(' ')} fill="none" stroke={cyan} strokeWidth="1.5" opacity="0.5" />
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={neonGreen} strokeWidth="2" filter="url(#glow-dev)" />
                        <circle cx={surferX} cy={surferY} r="4" fill="white" />
                        <text x="20" y="30" fill={neonGreen} fontSize="11" fontFamily="monospace">
                            Slope (m) = {slope.toFixed(2)}
                        </text>
                    </>
                );
            }

            case 'trig': {
                const cx = 50;
                const cy = height / 2;
                const R = 35;
                const angle = time * 1.5; 
                const dotX = cx + Math.cos(angle) * R;
                const dotY = cy - Math.sin(angle) * R; 
                const waveStartX = 110;
                const wavePoints = [];
                const freq = 0.1;
                for (let i = 0; i < (width - waveStartX); i+=2) {
                    const histAngle = angle - (i * freq);
                    const wy = cy - Math.sin(histAngle) * R;
                    wavePoints.push(`${waveStartX + i},${wy}`);
                }

                return (
                    <>
                        <defs>
                            <filter id="glow-trig" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <circle cx={cx} cy={cy} r={R} stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1" />
                        <line x1={cx - R - 5} y1={cy} x2={cx + R + 5} y2={cy} stroke="rgba(255,255,255,0.1)" />
                        <line x1={cx} y1={cy - R - 5} x2={cx} y2={cy + R + 5} stroke="rgba(255,255,255,0.1)" />
                        <line x1={cx} y1={cy} x2={dotX} y2={dotY} stroke="white" strokeWidth="1" opacity="0.5" />
                        <line x1={dotX} y1={dotY} x2={waveStartX} y2={dotY} stroke={neonGreen} strokeDasharray="2" opacity="0.8" />
                        <polyline points={wavePoints.join(' ')} fill="none" stroke={cyan} strokeWidth="1.5" filter="url(#glow-trig)" />
                        <circle cx={waveStartX} cy={dotY} r="3" fill={neonGreen} />
                        <circle cx={dotX} cy={dotY} r="3" fill="white" />
                        <text x="10" y="20" fill={cyan} fontSize="10" fontFamily="monospace">sin(θ)</text>
                    </>
                )
            }

            case 'integral': {
                const getFuncY = (x: number) => {
                    const normalized = (x / width) * 5;
                    return height - 20 - (Math.sin(normalized) * 20 + normalized * 10);
                }
                const scanX = (time * 60) % width;
                const lines = [];
                for (let x = 0; x < width; x += 4) {
                    if (x > scanX) break;
                    const y = getFuncY(x);
                    lines.push(
                        <line key={x} x1={x} y1={height} x2={x} y2={y} stroke={neonGreen} strokeWidth="2" opacity="0.3" />
                    );
                }
                const curvePoints = [];
                for(let x=0; x<=width; x+=5) curvePoints.push(`${x},${getFuncY(x)}`);

                return (
                    <>
                        <defs>
                            <linearGradient id="scan-grad" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor={neonGreen} stopOpacity="0.5" />
                                <stop offset="100%" stopColor={neonGreen} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {lines}
                        <polyline points={curvePoints.join(' ')} fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
                        <line x1={scanX} y1={0} x2={scanX} y2={height} stroke={cyan} strokeWidth="1" />
                        <text x={scanX + 5} y={height/2} fill={cyan} fontSize="10" fontFamily="monospace">
                             Area ≈ {Math.floor(scanX * 1.5)}
                        </text>
                    </>
                )
            }

            default:
                return (
                    <text x="50%" y="50%" fill="white" textAnchor="middle" fontSize="12">Visualization Loading...</text>
                );
        }
    };

    return (
        <div className="w-full h-full min-h-[180px] bg-[#020d04] relative">
            <div className="absolute inset-0 opacity-10"
                 style={{
                     backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)`,
                     backgroundSize: '20px 20px'
                 }}>
            </div>
            <svg width="100%" height="100%" viewBox="0 0 300 180" preserveAspectRatio="none" className="relative z-10">
                {renderVisual()}
            </svg>
        </div>
    );
};

interface ModuleDetailProps {
    moduleId: number;
    onBack: () => void;
    onOpenAi: () => void;
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ moduleId, onBack, onOpenAi }) => {
  const data = modulesData[moduleId as keyof typeof modulesData];

  useEffect(() => {
    window.scrollTo(0,0);
  }, [moduleId]);

  if (!data) return <div className="text-white p-10">Module not found</div>;

  return (
    <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 md:px-6 animate-fade-in-up">
      <div className="relative flex flex-col md:flex-row items-center justify-center mb-16 gap-6 md:gap-0">
        <div className="w-full md:w-auto md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 z-10">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-neon-green font-tech tracking-wider hover:text-white transition-colors"
            >
              <div className="p-2 border border-neon-green/30 rounded-full group-hover:bg-neon-green group-hover:text-black transition-all">
                <ArrowLeft size={20} />
              </div>
              <span className="hidden md:inline">BACK TO MODULES</span>
              <span className="md:hidden">BACK</span>
            </button>
        </div>
        <div className="flex flex-col items-center text-center z-0">
            <div className="mb-4 p-4 bg-neon-green text-black rounded-2xl shadow-[0_0_20px_#D4FF00] animate-pulse-glow">
                {data.icon}
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-tech text-white uppercase tracking-widest leading-none mb-2 glow-text">
                {data.title}
            </h1>
            <p className="text-neon-green font-sans text-sm md:text-base tracking-[0.2em] uppercase opacity-90 font-bold">
                {data.subtitle}
            </p>
            <div className="h-1 w-20 bg-neon-green rounded-full mt-4 shadow-[0_0_10px_#D4FF00]"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-dinamik-dark/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-neon-green/30 transition-colors">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Waves size={100} className="text-neon-green" />
                 </div>
                 <h3 className="font-tech text-neon-green text-lg mb-4 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
                    {data.defTitle}
                 </h3>
                 <p className="font-sans text-gray-300 leading-relaxed text-justify relative z-10">
                    {data.def}
                 </p>
            </div>

            <MacWindow title={`Interactive Visualization: ${data.title.toLowerCase()}.exe`}>
                <Visualization type={data.calcType} />
            </MacWindow>

            <div className="bg-dinamik-dark/50 border border-white/10 rounded-2xl p-6">
                <h3 className="font-tech text-white text-lg mb-6 tracking-widest border-b border-white/10 pb-2 uppercase">
                    RUMUS {data.title}
                </h3>
                <div className="space-y-4">
                    {data.formulas.map((f, i) => (
                        <div key={i} className="bg-black/40 border-l-2 border-neon-green p-4 rounded-r-lg overflow-x-auto whitespace-nowrap scrollbar-hide">
                            <div className="text-xs text-neon-green mb-1 font-bold tracking-wider">{f.label}</div>
                            <div>{f.render}</div>
                        </div>
                    ))}
                </div>
            </div>

             <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 relative">
                <div className="absolute -top-3 -right-3 bg-neon-green text-black font-bold font-tech px-4 py-1 rounded-bl-xl rounded-tr-xl shadow-lg">
                    EXAMPLE CASE
                </div>
                <div className="mb-4 font-serif text-lg text-white border-b border-white/10 pb-4 mt-2">
                    {data.example.q}
                </div>
                <div className="space-y-3">
                    {data.example.steps.map((step, i) => (
                        <div key={i} className="flex gap-3 text-sm text-gray-400">
                            <span className="text-neon-green font-bold shrink-0">{i+1}.</span>
                            <span>{step}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <div className="text-neon-green font-bold text-sm tracking-wider mb-2">FINAL ANSWER</div>
                    <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-3 w-full md:w-auto md:min-w-[250px] text-center">
                        <span className="font-serif text-xl text-white">{data.example.ans}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                 <div className="w-full">
                    <ScientificCalculator />
                 </div>
                 
                 <div className="bg-[#1a2e20]/50 border border-neon-green/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-neon-green mb-2">
                        <CheckCircle2 size={16} />
                        <span className="font-bold text-xs tracking-wider uppercase">Pro Tip</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        Gunakan kalkulator di atas untuk memverifikasi hasil perhitungan manual Anda. Pastikan mode sudut (Degree/Radian) sesuai dengan soal!
                    </p>
                 </div>

                 <div 
                    onClick={onOpenAi}
                    className="group cursor-pointer bg-gradient-to-br from-[#0a1f12] to-black border border-neon-green/30 rounded-xl p-5 relative overflow-hidden hover:border-neon-green transition-all duration-300"
                 >
                    <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-start gap-3 relative z-10">
                        <div className="w-10 h-10 bg-neon-green/10 rounded-lg flex items-center justify-center border border-neon-green/20 shrink-0">
                             <Bot size={20} className="text-neon-green" />
                        </div>
                        <div>
                            <h4 className="font-tech text-white text-sm font-bold tracking-wide uppercase mb-1 flex items-center gap-2">
                                Bingung Materi?
                                <Sparkles size={10} className="text-neon-green animate-pulse" />
                            </h4>
                            <p className="text-xs text-gray-400 leading-snug mb-3">
                                Tanyakan pada AI Assistant kami untuk penjelasan instan.
                            </p>
                            <span className="text-[10px] text-neon-green font-bold uppercase tracking-widest border-b border-neon-green/50 pb-0.5 group-hover:border-neon-green transition-colors">
                                Tanya Sekarang →
                            </span>
                        </div>
                    </div>
                 </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;