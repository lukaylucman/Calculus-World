import React from 'react';

const Registration: React.FC = () => {
  return (
    // Updated: pt-0 pb-12 for mobile (removed top padding), kept md:py-12 for desktop
    <section id="about" className="pt-0 pb-12 md:py-12 bg-transparent relative border-t border-white/5">
        
        <div className="container mx-auto px-6 flex flex-col items-center">
            {/* Container - Wide Box Layout (Horizontal) */}
            <div className="w-full max-w-5xl bg-dinamik-dark/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Background Glints */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 blur-[50px]"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-green/10 blur-[50px]"></div>

                {/* Combined Text Block - Justified for neatness */}
                {/* Changed leading-loose to leading-relaxed for better line spacing */}
                <div className="w-full text-justify font-sans text-sm md:text-base leading-relaxed tracking-wide">
                    <p className="mb-6">
                        <span className="text-neon-green">Website ini dikembangkan secara mandiri sebagai proyek personal untuk mendalami integrasi antara konsep Kalkulus dan teknologi digital. </span>
                        <span className="text-white">Proyek ini disusun dan dirancang sepenuhnya oleh Lucky Luqmanul Hakim, mahasiswa Program Studi Pendidikan Ilmu Komputer, Universitas Pendidikan Indonesia. </span>
                        <span className="text-gray-300">Tujuan utama dari pengembangan situs ini adalah untuk mengimplementasikan pemahaman mendalam mengenai konsep-konsep kalkulus ke dalam bentuk platform digital yang fungsional dan interaktif.</span>
                    </p>

                    <p>
                        <span className="text-gray-300">Dalam proses pengembangan ini, saya menyadari bahwa proyek ini masih berada dalam tahap pembelajaran dan eksplorasi. </span>
                        <span className="text-neon-green">Oleh karena itu, website ini mungkin belum mencapai tingkat kesempurnaan yang ideal </span>
                        <span className="text-gray-300">dan kemungkinan masih terdapat kesalahan teknis (bug) atau kekurangan pada fitur tertentu. </span>
                        <span className="text-neon-green">Saya sangat terbuka dan menghargai segala bentuk kritik, saran, maupun laporan kesalahan dari Anda. </span>
                        <span className="text-white">Masukan yang Anda berikan akan menjadi bahan evaluasi yang berharga bagi saya untuk melakukan perbaikan dan penyempurnaan di masa mendatang.</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Registration;