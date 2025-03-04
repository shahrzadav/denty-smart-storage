import Link from 'next/link';
import { useState, useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [occupiedCompartments, setOccupiedCompartments] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/compartments');
        const data = await response.json();
        const total = data.reduce((sum: number, comp: any) => sum + comp.quantity, 0);
        const occupied = data.filter((comp: any) => comp.quantity > 0).length;
        setTotalItems(total);
        setOccupiedCompartments(occupied);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Menu */}
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-14">
            <Link href="/" className="flex items-center px-4 py-2 text-white hover:bg-gray-800">
              Overview
            </Link>
            <Link href="/settings" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800">
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        {children}
      </main>

      {/* Status Bar */}
      <footer className="fixed bottom-0 w-full bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span>Total Products:</span>
              <span className="font-medium">{totalItems}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Occupied Compartments:</span>
              <span className="font-medium">{occupiedCompartments}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 