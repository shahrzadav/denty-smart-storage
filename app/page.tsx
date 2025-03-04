'use client';

import Layout from './components/Layout';
import CompartmentGrid from './components/CompartmentGrid';

export default function Home() {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Smart Storage Overview
        </h1>
        <CompartmentGrid />
      </div>
    </Layout>
  );
}
