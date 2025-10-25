'use client';

import { personalInfo } from '@/data/portfolio';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-zinc-900 dark:bg-zinc-100 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <div className="w-80 h-80 mx-auto rounded-full overflow-hidden mb-8 shadow-2xl">
              <img 
                src="/defford-selfie.jpg" 
                alt="Daniel Efford" 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 30%' }}
              />
            </div>
          </div>
          
          <div className="animate-slide-in-right">
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
              Hello! I'm {personalInfo.name.split(' ')[0]}
            </h3>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
              {personalInfo.longBio}
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-zinc-500 dark:text-zinc-400 mr-3">📍</span>
                <span className="text-zinc-700 dark:text-zinc-300">{personalInfo.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-zinc-500 dark:text-zinc-400 mr-3">📧</span>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              {personalInfo.socialLinks.github && (
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <span className="text-xl">🐙</span>
                </a>
              )}
              {personalInfo.socialLinks.linkedin && (
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <span className="text-xl">💼</span>
                </a>
              )}
              {personalInfo.socialLinks.X && (
                <a
                  href={personalInfo.socialLinks.X}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <span className="text-xl">🐦</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
