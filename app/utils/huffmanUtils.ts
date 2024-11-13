export async function getFrequencyData(text: string) {
    const response = await fetch('/api/calculate-frequency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to calculate frequency');
    }
    return response.json();
  }