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
import {UserEntity} from "@/types/entity.ts";
import {useNavigate} from "react-router-dom";
import {ProfileEdit} from "@/page/admin/user/ProfileEdit.tsx";
import {useState} from "react";
import {userInfoDelete} from "@/services/UserManage.ts";

export const columns: ColumnDef<UserEntity>[] = [
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
    accessorKey: "userCode",
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
        userInfoDelete(row.getValue('userCode'))
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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsSheetOpen(true) }>
              수정
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => deleteUser()}
            >삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ProfileEdit
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          userCode={row.getValue("userCode")}
      /></>
      )
    },
  },
]
