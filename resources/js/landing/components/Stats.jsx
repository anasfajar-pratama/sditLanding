import React, { useEffect, useRef, useState } from 'react';
import { Users, GraduationCap, Calendar, Trophy } from 'lucide-react';

const iconMap = {
  users: Users,
  'graduation-cap': GraduationCap,
  calendar: Calendar,
  trophy: Trophy,
};

function CountUp({ target, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const num = parseInt(target) || 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const step = Math.ceil(num / (duration / 16));
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          setCount(current);
          if (current >= num) clearInterval(timer);
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats({ stats }) {
  const colors = [
    { bg: 'bg-orange-50', text: 'text-primary', icon: 'text-primary' },
    { bg: 'bg-teal-50', text: 'text-secondary', icon: 'text-secondary' },
    { bg: 'bg-pink-50', text: 'text-pink-500', icon: 'text-pink-500' },
    { bg: 'bg-yellow-50', text: 'text-yellow-600', icon: 'text-yellow-600' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Users;
            const color = colors[i % colors.length];
            return (
              <div key={stat.id} className={`${color.bg} rounded-2xl p-6 text-center card-lift`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-white shadow-sm`}>
                  <Icon className={`w-6 h-6 ${color.icon}`} />
                </div>
                <div className={`font-display font-bold text-4xl ${color.text} mb-1`}>
                  <CountUp target={stat.value} suffix={stat.suffix || ''} />
                </div>
                <div className="text-gray-600 font-semibold text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
