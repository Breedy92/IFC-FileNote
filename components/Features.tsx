import { FileText, Shield, Brain } from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Smart File Notes",
    description: "Transform meeting transcripts into structured, professional file notes instantly."
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Analysis",
    description: "Advanced AI technology understands context and generates comprehensive summaries."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure & Compliant",
    description: "Your data is protected with enterprise-grade security and compliance measures."
  }
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}