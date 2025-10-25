'use client';

import { projects } from '@/data/portfolio';

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-zinc-50 dark:bg-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-zinc-900 dark:bg-zinc-100 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-4 flex items-center justify-center">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                </div>
                
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-center py-2 rounded-lg font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 text-center py-2 rounded-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
