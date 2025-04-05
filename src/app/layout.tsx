export const metadata = {
  title: 'Harvard Art Museums App',
  description: 'Art search powered by Harvard Art Museums API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
