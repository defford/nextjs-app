'use client';

import { personalInfo } from '@/data/portfolio';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(/tech-swirl.png)' }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {personalInfo.greeting}
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-200 mb-8 font-light">
            {personalInfo.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed">
            {personalInfo.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="mailto:defford@gmail.com?subject=Nice to connect!&body=Hi Daniel,%0D%0A%0D%0AIt was great connecting with you at Innovation Week! Let's chat soon!"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
