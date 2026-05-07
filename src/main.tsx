import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import BasicTable from './BasicTable.tsx';
// import SortingTable from './SortingTable.tsx';
// import PaginatedTable from './PaginatedTable.tsx';
import FilteredTable from './FilteredTable.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <BasicTable /> */}
    {/* <SortingTable /> */}
    {/* <PaginatedTable /> */}
    <FilteredTable />
  </StrictMode>,
);
