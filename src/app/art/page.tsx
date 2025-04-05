'use client';

import { Suspense } from 'react';
import ArtClient from './ArtClient';

export default function ArtPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArtClient />
    </Suspense>
  );
}
