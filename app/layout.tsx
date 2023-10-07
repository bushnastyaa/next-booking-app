import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import Navbar from '@app/components/navbar/Navbar';
import Footer from '@app/components/Footer';
import LoginModal from '@app/components/modals/LoginModal';
import RegisterModal from '@app/components/modals/RegisterModal';
import ToasterProvider from '@app/providers/ToasterProvider';
import getCurrentUser from '@app/actions/getCurrentUser';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Booking',
  description: 'Discover the world with Booking',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
