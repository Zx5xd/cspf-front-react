import { ColumnDef } from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {AnnounceEntity, BlackListEntity, QuestionsEntity} from "@/types/entity.ts";
import {convertToKoreanTime} from "@/services/convertDate.ts";

export const blacklistManageColumns: ColumnDef<BlackListEntity>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") || null
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "신고번호",
  },
  {
    accessorKey: "perpetrator",
    header: "신고자",
  },
  {
    accessorKey: "declarer",
    header: "가해자",
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <div
          className="w-full"
        >
          신고사유
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
  },
  {
    accessorKey:"createdAt",
    header:"생성일자",
    cell: ({ row }) => {
      const createdAt:string = row.getValue('createdAt');
      const [date, time] = convertToKoreanTime(createdAt);
      return <div><div>{date}</div><div>{time}</div></div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log("TEST")}>
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
