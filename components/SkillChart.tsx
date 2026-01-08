
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
    <div className="w-full flex-1 min-h-[250px] relative">
      {/* 
        We use width="99%" and a small debounce to prevent the common Recharts 
        "width/height -1" warning which often occurs during rapid flex-layout calculations.
      */}
      <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0} debounce={100}>
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
  );
};

export default SkillChart;
