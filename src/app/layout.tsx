import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { WorkspaceShell } from '@/components/workspace/workspace-shell'
import { cn } from '@/lib/utils'

import './globals.css'

const geistHeading = localFont({
  src: [
    {
      path: '../../public/fonts/geist-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
})

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter-latin-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
})

const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/geist-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
})

const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/geist-mono-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kranix.prodevopsguytech.com'),
  title: {
    default: 'Kranix IO — AI-native Control Plane',
    template: '%s | Kranix IO',
  },
  description: 'Open-source infrastructure runtime for containers and clusters. MCP-compatible. GitOps-native. Deploy, orchestrate, and operate — for humans and AI agents alike.',
  keywords: [
    'Kranix',
    'Kubernetes',
    'Docker',
    'MCP',
    'GitOps',
    'control plane',
    'infrastructure',
    'AI agents',
    'container orchestration',
    'open source',
  ],
  authors: [{ name: 'Kranix IO', url: 'https://kranix.prodevopsguytech.com' }],
  creator: 'Kranix IO',
  publisher: 'Kranix IO',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kranix.prodevopsguytech.com',
    title: 'Kranix IO — AI-native Control Plane',
    description: 'Open-source infrastructure runtime for containers and clusters. MCP-compatible. GitOps-native. Built for humans and AI agents.',
    siteName: 'Kranix IO',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kranix IO — AI-native Control Plane',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kranix IO — AI-native Control Plane',
    description: 'Open-source infrastructure runtime for containers and clusters. MCP-compatible. GitOps-native. Built for humans and AI agents.',
    images: ['/og-image.png'],
    creator: '@kranixio',
  },
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Kranix IO',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#f5f2eb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="linen"
      className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, 'font-sans', inter.variable, geistHeading.variable)}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden">
        <WorkspaceShell>{children}</WorkspaceShell>
      </body>
    </html>
  )
}
