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
import {ExpertEntity} from "@/types/entity.ts";
import {ProfileEdit} from "@/page/admin/user/ProfileEdit.tsx";
import {useState} from "react";
import {userInfoDelete} from "@/services/UserManage.ts";
import {ExpertProfileEdit} from "@/page/admin/expert/ProfileEdit.tsx";

export const expertColumns: ColumnDef<ExpertEntity>[] = [
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
    accessorKey: "expertCode",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          className="w-full"
        >
          이메일
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {

      const [isSheetOpen, setIsSheetOpen] = useState(false)

      const deleteUser = async () => {
        userInfoDelete(row.getValue('expertCode'))
      }

      return (<>
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
                onClick={() => setIsSheetOpen(true) }>
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => deleteUser()}>삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      <ExpertProfileEdit
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          userCode={row.getValue("expertCode")}
      /></>
      )
    },
  },
]
