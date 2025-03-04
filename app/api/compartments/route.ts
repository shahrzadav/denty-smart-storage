import { NextResponse } from 'next/server';

// Mock data 
let compartments = [
  { id: 1, productName: 'Toothpaste', quantity: 10 },
  { id: 2, productName: 'Toothbrush', quantity: 15 },
  { id: 3, productName: 'Mouthwash', quantity: 5 },
  { id: 4, productName: 'Floss', quantity: 20 },
  { id: 5, productName: 'Whitening Strips', quantity: 8 },
  { id: 6, productName: 'Dental Picks', quantity: 12 },
  { id: 7, productName: 'Gum', quantity: 18 },
  { id: 8, productName: 'Breath Freshener', quantity: 7 },
  { id: 9, productName: 'Tongue Scraper', quantity: 9 },
  { id: 10, productName: 'Dental Mirror', quantity: 6 },
  { id: 11, productName: 'Interdental Brush', quantity: 14 },
  { id: 12, productName: 'Orthodontic Wax', quantity: 11 },
  { id: 13, productName: 'Retainer Cleaner', quantity: 13 },
  { id: 14, productName: 'Denture Adhesive', quantity: 4 },
  { id: 15, productName: 'Denture Cleaner', quantity: 16 },
  { id: 16, productName: 'Dental Floss Picks', quantity: 3 }
];

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json(compartments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { id, withdrawQuantity } = body;

    // Input validation
    if (!id || !withdrawQuantity) {
      return NextResponse.json(
        { error: 'Missing required fields: id and withdrawQuantity' },
        { status: 400 }
      );
    }
 
    if (typeof withdrawQuantity !== 'number' || withdrawQuantity <= 0) {
      return NextResponse.json(
        { error: 'withdrawQuantity must be a positive number' },
        { status: 400 }
      );
    }

    // Check if id in compartment exists
    const compartment = compartments.find(comp => comp.id === id);
    if (!compartment) {
      return NextResponse.json(
        { error: `Compartment with id ${id} not found` },
        { status: 404 }
      );
    }

    // Check if enough quantity is available
    // this also handled in 
    if (compartment.quantity < withdrawQuantity) {
      return NextResponse.json(
        { 
          error: 'Insufficient quantity', 
          available: compartment.quantity,
          requested: withdrawQuantity 
        },
        { status: 400 }
      );
    }

    // Update quantity
    const newQuantity = Math.max(0, compartment.quantity - withdrawQuantity);
    compartment.quantity = newQuantity;
    
    compartments = compartments.map(comp => 
      comp.id === id ? compartment : comp
    );
    
    return NextResponse.json({ 
      success: true, 
      compartments,
      message: `Successfully withdrawn ${withdrawQuantity} units from ${compartment.productName}`
    });

  } catch (error) {
    console.error('Error in PUT /api/compartments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 