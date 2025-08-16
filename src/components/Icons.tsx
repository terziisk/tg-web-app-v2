
import {
  Rocket,
  Settings,
  Activity,
  User,
  Bot,
  Loader2,
  Sparkles,
  type LucideProps,
} from 'lucide-react';


export const Icons = {
  advertiser: (props: LucideProps) => <Rocket {...props} />,
  management: (props: LucideProps) => <Settings {...props} />,
  activities: (props: LucideProps) => <Activity {...props} />,
  user: (props: LucideProps) => <User {...props} />,
  bot: (props: LucideProps) => <Bot {...props} />,
  spinner: (props: LucideProps) => <Loader2 {...props} />,
  sparkles: (props: LucideProps) => <Sparkles {...props} />,
  star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  warning: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 9v2" />
      <path d="M12 15h.01" />
      <path d="M21.17 18.83A10 10 0 1 1 5.83 3.17" />
    </svg>
  ),
  starFilled: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  trophy: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12.17 4.31a2.37 2.37 0 0 0-3.34 0L4 9l2 1.95v5.82a2.23 2.23 0 0 0 2.22 2.23h7.56A2.23 2.23 0 0 0 18 16.77V11L20 9l-4.83-4.69ZM9.44 16.89a1.11 1.11 0 1 1 .09-2.22 1.12 1.12 0 0 1-.09 2.22Zm5.12 0a1.11 1.11 0 1 1 .09-2.22 1.12 1.12 0 0 1-.09 2.22ZM17 9.15 15.17 11h-2.12V8H11v3H8.83L7 9.15l3.42-3.42a1.19 1.19 0 0 1 1.68 0Z" />
    </svg>
  ),
  loader: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
