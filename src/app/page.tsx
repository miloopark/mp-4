'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/art?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Harvard Art Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword (e.g. sculpture)"
          style={{ marginRight: '8px' }}
        />
        <button type="submit">Search</button>
      </form>
    </main>
  );
}
