
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { SKILLS } from '../constants';

interface SkillChartProps {
  onDark?: boolean;
}

const SkillChart: React.FC<SkillChartProps> = ({ onDark = false }) => {
  const chartData = SKILLS.filter(s => s.category === 'Hard Skill').map(s => ({
    subject: s.name,
    A: s.level,
    fullMark: 100,
  }));

  return (
    <div className="w-full flex-1 min-h-[250px] md:min-h-[300px] relative overflow-hidden">
      {/* 
        The "absolute inset-0" wrapper is a proven fix for Recharts measurement issues 
        in flexbox containers. It forces the chart to observe the parent's established 
        dimensions after the layout has stabilized.
      */}
      <div className="absolute inset-0 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke={onDark ? "rgba(255,255,255,0.2)" : "#E5E7EB"} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ 
                fill: onDark ? '#BFDBFE' : '#6B7280', 
                fontSize: 10, 
                fontWeight: 600 
              }} 
            />
            <Radar
              name="Skills"
              dataKey="A"
              stroke={onDark ? "#FFFFFF" : "#2563EB"}
              fill={onDark ? "#FFFFFF" : "#2563EB"}
              fillOpacity={onDark ? 0.4 : 0.3}
              className="transition-all duration-1000"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillChart;
