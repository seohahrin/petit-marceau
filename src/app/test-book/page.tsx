'use client';

import { useState } from 'react';

export default function TestBookPage() {
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId: 'petit-marceau-1',
        guestName: 'Test Guest',
        guestEmail: 'test@example.com',
        checkInDate: '2026-03-06',
        checkOutDate: '2026-03-10',
      }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Test Booking</h1>
      <button onClick={handleTest}>Create Booking</button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}