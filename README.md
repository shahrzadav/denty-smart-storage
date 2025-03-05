# Denty Smart Storage System

A Next.js application for managing dental supplies storage with a 4x4 grid compartment system.

## Features

- 16 compartment grid overview
- Real-time quantity management
- Withdrawal functionality for each compartment
- Status bar showing total products and occupied compartments
- Navigation menu with Overview and Settings pages

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shahrzadav/denty-smart-storage.git
cd denty-smart-storage
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Architecture

### Frontend Components

1. **Layout Component** (`app/components/Layout.tsx`)
   - Provides consistent layout across pages
   - Contains navigation menu and status bar
   - Manages global state for total products and occupied compartments

2. **CompartmentGrid Component** (`app/components/CompartmentGrid.tsx`)
   - Displays 4x4 grid of compartments
   - Manages compartment state and withdrawal operations
   - Handles error and success messages

3. **NumberPad Component** (`app/components/NumberPad.tsx`)
   - Custom numeric input for withdrawals
   - Validates input against available quantity
   - Provides clear and submit functionality

### API Routes

1. **GET /api/compartments**
   - Returns list of all compartments
   - Includes product information and quantities

2. **PUT /api/compartments**
   - Updates compartment quantities
   - Validates withdrawal amounts
   - Returns updated compartment data

### Data Flow

1. Initial load:
   - Frontend fetches compartment data via GET request
   - Displays current quantities and status

2. Withdrawal process:
   - User enters quantity via NumberPad
   - Frontend validates input
   - PUT request updates quantity
   - UI updates to reflect changes

### Error Handling

- Input validation on both frontend and backend
- Clear error messages for users
- Quantity validation before withdrawal
- API error responses with appropriate status codes

## Future Improvements

1. Add authentication system
2. Implement persistent storage with database
3. Add unit and integration tests
4. Add inventory alerts for low quantities
5. Implement Settings page functionality

## Running Tests

(Note: Tests to be implemented in future updates)

To run tests:
```bash
npm test
```

