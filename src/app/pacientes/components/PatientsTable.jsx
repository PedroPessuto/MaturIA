'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DadosPacienteForm } from '@/components/custom/forms/DadosPacienteForm'
import { ArrowUpDown } from 'lucide-react'
import { H2 } from '@/components/custom/typo/H2'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

export default function PacientesTable({ data }) {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  // Verificação para garantir que data esteja definido e seja um array
  const tableData = Array.isArray(data) ? data : []

  // Table
  const columns = [
    {
      accessorKey: 'id',
      header: 'Identificador',
    },
    {
      accessorKey: 'nome',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome do Paciente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        return (
          <div className='flex gap-3'>
            <Link href={`/paciente/${row.original.id}`}>
              <Button type="submit">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>
              </Button>
            </Link>
          </div>
        )
      },
    },
  ]

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="flex flex-col">
      <div className="w-full h-full flex flex-col gap-8 my-auto">
        <div className="flex justify-between">
          <H2 className="w-full flex justify-between">
            Lista de Pacientes
            <Dialog open={showModal} onOpenChange={toggleModal}>
              <DialogTrigger asChild>
                <Button onClick={toggleModal}>Adicionar Paciente</Button>
              </DialogTrigger>
              <DialogContent style={{ height: '90vh' }}>
                <DadosPacienteForm toggleModal={toggleModal} />
              </DialogContent>
            </Dialog>
          </H2>
        </div>
        <div>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar Por Pacientes"
              value={(table.getColumn('nome').getFilterValue())}
              onChange={(event) =>
                table.getColumn('nome')?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Nenhum paciente encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Voltar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próximo
            </Button>
          </div>
        </div >
      </div>
    </div>
  )
}
