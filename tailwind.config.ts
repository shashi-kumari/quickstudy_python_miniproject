
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				quickstudy: {
					purple: '#8A63FF',
					blue: '#5E9EFF',
					green: '#4ECDC4',
					pink: '#FF90B3',
					yellow: '#FFD166',
					coral: '#FF7676',
					teal: '#35D0BA',
					indigo: '#6B78FF',
					background: '#F9FAFC',
					darkbg: '#2D3748',
					text: '#2D3748',
					darktext: '#F9FAFC',
					lighttext: '#4A5568' // Added for better light mode contrast
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'card-flip': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(180deg)' },
				},
				'pulse-light': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'scale-up': {
					'0%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'card-flip': 'card-flip 0.6s ease-out',
				'pulse-light': 'pulse-light 2s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s infinite',
				'scale-up': 'scale-up 0.3s ease-out',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-main': 'linear-gradient(135deg, #8A63FF 0%, #5E9EFF 100%)',
				'gradient-secondary': 'linear-gradient(135deg, #FF90B3 0%, #FFD166 100%)',
				'gradient-vibrant': 'linear-gradient(to right, #ee9ca7, #ffdde1)',
				'gradient-cool': 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)',
				'gradient-warm': 'linear-gradient(90deg, hsla(29, 92%, 70%, 1) 0%, hsla(0, 87%, 73%, 1) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
