"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

interface DiagnosticTest {
  id: number;
  patientName: string;
  testType: string;
  result: string;
  testDate: string;
  notes?: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    patientName: '',
    testType: '',
    result: '',
    testDate: '',
    notes: '',
  });

  const [tests, setTests] = useState<DiagnosticTest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch test results
  const fetchTests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tests');
      const data = await response.json();
      setTests(data);
    } catch (error) {
      toast.error('Failed to fetch test results.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      testDate: new Date(formData.testDate).toISOString(), // Convert to ISO string
    };
    console.log('Form Data:', formattedData); // Log the data being sent
    const response = await fetch('/api/tests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });
    if (response.ok) {
      toast.success('Test result added successfully!');
      setFormData({
        patientName: '',
        testType: '',
        result: '',
        testDate: '',
        notes: '',
      });
      fetchTests(); // Refresh the list
    } else {
      const errorData = await response.json(); // Log the error response
      console.error('Error:', errorData);
      toast.error(`Failed to add test result: ${errorData.error}`);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this test result?')) {
      const response = await fetch(`/api/tests/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Test result deleted successfully!');
        fetchTests(); // Refresh the list
      } else {
        toast.error('Failed to delete test result.');
      }
    }
  };

  // Define columns for the table
  const columns = [
    {
      header: 'Patient Name',
      accessorKey: 'patientName',
    },
    {
      header: 'Test Type',
      accessorKey: 'testType',
    },
    {
      header: 'Result',
      accessorKey: 'result',
    },
    {
      header: 'Test Date',
      accessorKey: 'testDate',
      cell: (info: any) => new Date(info.getValue()).toLocaleString(),
    },
    {
      header: 'Notes',
      accessorKey: 'notes',
    },
    {
      header: 'Actions',
      cell: (info: any) => (
        <button
          onClick={() => handleDelete(info.row.original.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          Delete
        </button>
      ),
    },
  ];

  // Create table instance
  const table = useReactTable({
    data: tests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true, // Use server-side pagination if needed
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Diagnostic Test Results</h1>

      {/* Add Test Result Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Test Result</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Test Type</label>
            <input
              type="text"
              placeholder="Test Type"
              value={formData.testType}
              onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Result</label>
            <input
              type="text"
              placeholder="Result"
              value={formData.result}
              onChange={(e) => setFormData({ ...formData, result: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Test Date</label>
            <input
              type="datetime-local"
              placeholder="Test Date"
              value={formData.testDate}
              onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <input
              type="text"
              placeholder="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          Add Test Result
        </button>
      </form>

      {/* Test Results Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Test Results</h2>
        {isLoading ? (
          <div className="flex justify-center items-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100">
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="p-3 text-left text-sm font-medium text-gray-700">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-3 text-sm text-gray-700">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              >
                Previous
              </button>
              <span>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}