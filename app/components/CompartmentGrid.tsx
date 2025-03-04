import { useState, useEffect } from 'react';
import NumberPad from './NumberPad';

interface Compartment {
  id: number;
  productName: string;
  quantity: number;
}

const CompartmentGrid = () => {
  const [compartments, setCompartments] = useState<Compartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawalAmount, setWithdrawalAmount] = useState<{ [key: number]: string }>({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [occupiedCompartments, setOccupiedCompartments] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCompartments();
  }, []);

  const fetchCompartments = async () => {
    try {
      const response = await fetch('/api/compartments');
      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.error || 'Failed to fetch compartments');
        return;
      }
      const data = await response.json();
      setCompartments(data);
      
      // Calculate totals
      const total = data.reduce((sum: number, comp: any) => sum + comp.quantity, 0);
      const occupied = data.filter((comp: any) => comp.quantity > 0).length;
      setTotalProducts(total);
      setOccupiedCompartments(occupied);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching compartments:', error);
      setErrorMessage('Failed to load compartments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async (id: number) => {
    const amount = parseInt(withdrawalAmount[id] || '0');
    if (!amount || amount <= 0) {
      setErrorMessage('Please enter a valid withdrawal amount');
      return;
    }

    try {
      const response = await fetch('/api/compartments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, withdrawQuantity: amount }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to process withdrawal');
        return;
      }
      
      if (data.success) {
        fetchCompartments();
        setWithdrawalAmount(prev => ({ ...prev, [id]: '' }));
        setSuccessMessage(data.message || 'Withdrawal successful');
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error updating compartment:', error);
      setErrorMessage('Failed to process withdrawal. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-20">
      {/* Error Message */}
      {errorMessage && (
        <div className="fixed top-16 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md z-50">
          <span className="block sm:inline">{errorMessage}</span>
          <button 
            onClick={() => setErrorMessage(null)}
            className="absolute top-0 right-0 px-4 py-3"
          >
            <span className="text-red-500">&times;</span>
          </button>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-16 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-6 mb-8">
        {compartments.map((compartment) => (
          <div
            key={compartment.id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <input 
                  type="checkbox" 
                  checked={compartment.quantity > 0} 
                  readOnly 
                  className="form-checkbox" 
                />
                <h3 className="font-medium">{compartment.productName}</h3>
              </div>
              <div className="text-sm text-gray-600">
                Qty: {compartment.quantity}
              </div>
            </div>
            <NumberPad
              value={withdrawalAmount[compartment.id] || ''}
              onChange={(value) => setWithdrawalAmount(prev => ({
                ...prev,
                [compartment.id]: value
              }))}
              onSubmit={() => handleWithdrawal(compartment.id)}
              maxQuantity={compartment.quantity}
            />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CompartmentGrid; 