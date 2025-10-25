'use client';

import { personalInfo } from '@/data/portfolio';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            {personalInfo.greeting}
          </h1>
          <h2 className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400 mb-8 font-light">
            {personalInfo.title}
          </h2>
          <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            {personalInfo.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-full font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 rounded-full font-semibold hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-zinc-100 dark:hover:text-zinc-900 transition-all duration-300 transform hover:scale-105"
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
