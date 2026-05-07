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
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

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
        enableColumnFilter: false,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('first_name', {
        header: () => 'First Name',
        cell: (info) => info.getValue(),
        filterFn: 'includesString',
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('last_name', {
        header: () => 'Last Name',
        cell: (info) => info.getValue(),
        filterFn: 'includesString',
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('email', {
        header: () => 'Email',
        cell: (info) => info.getValue(),
        filterFn: 'includesString',
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('date_of_birth', {
        header: () => 'Date of birth',
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('age', {
        header: () => 'Age',
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('country', {
        header: () => 'Country',
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('phone', {
        header: () => 'Phone',
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
        footer: (info) => info.column.id,
      }),
    ],
    [],
  );
  const table = useReactTable<Person>({
    data: fetchedData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col items-center justify-center max-w-5/6 m-auto mt-12">
      {isError && <div className="text-red-600">{error?.message}</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <table className="table-fixed w-4/5">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-300">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap py-3.5 px-2 text-sm font-semibold text-left cursor-pointer select-none overflow-hidden"
                  >
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </div>
                    {header.column.getCanFilter() ? (
                      <input
                        className="border w-full"
                        value={
                          (header.column.getFilterValue() as string | number) ||
                          ''
                        }
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                      />
                    ) : null}
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
                    className="whitespace-nowrap p-2 text-sm font-light overflow-hidden"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function FilteredTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  );
}
