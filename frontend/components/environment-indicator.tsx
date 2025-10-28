'use client';

export function EnvironmentIndicator() {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT || 'local';
  
  // Don't show in production
  if (env === 'production') return null;
  
  const config = {
    local: {
      bg: 'bg-primary',
      text: 'LOCAL',
      icon: '🔧'
    },
    staging: {
      bg: 'bg-accent',
      text: 'STAGING',
      icon: '🧪'
    },
    development: {
      bg: 'bg-primary',
      text: 'DEV',
      icon: '💻'
    }
  };
  
  const envConfig = config[env as keyof typeof config] || {
    bg: 'bg-gray-500',
    text: env.toUpperCase(),
    icon: '❓'
  };
  
  return (
    <div className={`fixed bottom-4 right-4 px-3 py-1 rounded-full text-primary-foreground text-xs font-medium ${envConfig.bg} shadow-lg flex items-center gap-1 z-50`}>
      <span>{envConfig.icon}</span>
      <span>{envConfig.text}</span>
    </div>
  );
}