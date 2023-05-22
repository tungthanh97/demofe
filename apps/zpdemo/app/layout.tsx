import { AppAuthentication } from '../services/provider/AppAuthentication';
import './global.css';
import 'tailwindcss/tailwind.css';

export const metadata = {
  title: 'Welcome to zpdemo',
  description: 'Demo zp app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppAuthentication>{children}</AppAuthentication>
      </body>
    </html>
  );
}
