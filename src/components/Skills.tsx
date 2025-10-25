'use client';

import { skills } from '@/data/portfolio';

export default function Skills() {
  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    tools: skills.filter(skill => skill.category === 'tools'),
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'advanced':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'beginner':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-zinc-900 dark:bg-zinc-100 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {Object.entries(skillCategories).map(([category, categorySkills], categoryIndex) => (
            <div
              key={category}
              className="animate-fade-in-up"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6 capitalize">
                {category === 'frontend' ? '🎨 Frontend' : 
                 category === 'backend' ? '⚙️ Backend' : 
                 '🛠️ Tools'}
              </h3>
              
              <div className="space-y-4">
                {categorySkills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="animate-slide-in-right"
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (index * 0.05)}s` }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getLevelColor(skill.level)} transition-all duration-1000`}
                        style={{
                          width: skill.level === 'advanced' ? '90%' : 
                                 skill.level === 'intermediate' ? '70%' : '50%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
