import {
  ColumnDef,
  flexRender,
  getCoreRowModel, getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button.tsx";
import {ProfileEdit} from "@/page/admin/user/ProfileEdit.tsx";
import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {AnnUpdateForm} from "@/page/admin/announce/AnnUpdateForm.tsx";
import {BoardDelete} from "@/services/BoardManage.ts";
import {AnnWriteForm} from "@/page/admin/announce/AnnWriteForm.tsx";
import {QuesUpdateForm} from "@/page/expert/question/QuesUpdateForm.tsx";
import {QuesWriteForm} from "@/page/expert/question/QuesWriteForm.tsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function QuesDataTable<TData, TValue>({
                                           columns,
                                           data,
                                         }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, // 첫 페이지
        pageSize: 13,  // 페이지당 행 수 (기본값)
      },
    },
  })

  return (
      <div className="rounded-md border h-full flex-1">
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                          <TableHead key={header.id} className={"text-center"}>
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
                          data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className={"text-center"}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                      </TableRow>
                  ))
              ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center truncate">
                      No results.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
          <div className="w-full flex place-content-end mt-3 pe-14">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"}>작성</Button>
              </DialogTrigger>
              <DialogContent>

                <DialogHeader>
                  <DialogTitle>문의사항 작성</DialogTitle>
                </DialogHeader>
                <QuesWriteForm/>
              </DialogContent>
            </Dialog>
          </div>
        <div className="flex items-center justify-end space-x-2 py-4 pe-14 mt-3">
          <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
          >
            Next
          </Button>

        </div>
      </div>
  )
}
