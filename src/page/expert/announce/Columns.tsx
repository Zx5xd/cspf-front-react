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
import {AnnounceEntity, QuestionsEntity} from "@/types/entity.ts";
import {convertToKoreanTime} from "@/services/convertDate.ts";
import {AnnounceDetail} from "@/page/admin/announce/AnnounceDetail.tsx";
import {useNavigate} from "react-router-dom";

export const announceColumns: ColumnDef<AnnounceEntity>[] = [
  {
    accessorKey: "id",
    header:  ({ column }) => {
      return (
          <div
              className=""
          >
            글번호
          </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: "제목",
  },
  {
    accessorKey: "createdAt",
    header:"생성시각",
    cell: ({ row }) => {
      const createdAt:string = row.getValue('createdAt');
      const [date, time] = convertToKoreanTime(createdAt);
      return <div><div>{date}</div><div>{time}</div></div>;
    },
  },
  {
    accessorKey: "actions",
    header: "조회",
    cell: ({ row }) => {
      const navigate = useNavigate()
      return(
        <Button variant={"outline"} className={''} onClick={() => navigate('/expert/anDetail', {state: row.original})}>조회</Button>
          )
    },
  },
]
