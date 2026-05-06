import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

type Person = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  age: number;
  country: string;
  phone: number;
};

const queryClient = new QueryClient();

function Table() {
  const tableQWueryClient = useQueryClient(queryClient);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const {
    data: fetchedData,
    isError,
    error,
    isLoading,
  } = useQuery(
    {
      queryKey: ['table_query'],
      queryFn: async (): Promise<Person[]> => {
        const res = await fetch(
          'https://my.api.mockaroo.com/tanstack_test.json?key=68f02840',
        );
        console.log('fetch hit');
        if (!res.ok) {
          throw new Error('Error: network status not ok!');
        }
        return await res.json();
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    tableQWueryClient,
  );
  const columnHelper = createColumnHelper<Person>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => 'ID',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('first_name', {
        header: () => 'First Name',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('last_name', {
        header: () => 'Last Name',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('email', {
        header: () => 'Email',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('date_of_birth', {
        header: () => 'Date of birth',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('age', {
        header: () => 'Age',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('country', {
        header: () => 'Country',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('phone', {
        header: () => 'Phone',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
    ],
    [],
  );
  const table = useReactTable<Person>({
    data: fetchedData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
  });

  return (
    <div className="flex flex-col justify-center max-w-5/6 m-auto mt-12">
      {isError && <div className="text-red-600">{error?.message}</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <table className="min-w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-300">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap py-3.5 px-2 text-sm font-semibold text-left cursor-pointer select-none"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-200">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap p-2 text-sm font-light"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="py-2 px-3 pl-6 gap-2 -ms-px first:rounded-s-full first:ms-0 last:rounded-e-full text-md font-medium bg-gray-100 hover:z-10 border border-gray-200 focus:outline-hidden focus:bg-white disabled:opacity-50 disabled:pointer-events-none hover:border-gray-300"
            >
              ‹‹
            </button>
            <button
              type="button"
              className="py-2 px-3 gap-2 -ms-px first:rounded-s-full first:ms-0 last:rounded-e-full text-md font-medium bg-gray-100 hover:z-10 border border-gray-200 focus:outline-hidden focus:bg-white disabled:opacity-50 disabled:pointer-events-none hover:border-gray-300"
            >
              ‹
            </button>
            <button
              type="button"
              className="py-2 px-3 gap-2 -ms-px first:rounded-s-full first:ms-0 last:rounded-e-full text-md font-medium bg-gray-100 hover:z-10 border border-gray-200 focus:outline-hidden focus:bg-white disabled:opacity-50 disabled:pointer-events-none hover:border-gray-300"
            >
              ›
            </button>
            <button
              type="button"
              className="py-2 px-3 pr-6 gap-2 -ms-px first:rounded-s-full first:ms-0 last:rounded-e-full text-md font-medium bg-gray-100 hover:z-10 border border-gray-200 focus:outline-hidden focus:bg-white disabled:opacity-50 disabled:pointer-events-none hover:border-gray-300"
            >
              ››
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function PaginatedTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  );
}
