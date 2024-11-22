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
import {QuestionsEntity} from "@/types/entity.ts";
import {convertToKoreanTime} from "@/services/convertDate.ts";
import {useNavigate} from "react-router-dom";

export const quesBoardColumns: ColumnDef<QuestionsEntity>[] = [
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
    accessorKey: "authorCode",
    header: "글쓴이",
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
      const navigate = useNavigate();
      return(    <Button variant={"outline"} className={''} onClick={()=> navigate('/expert/quesDetail', {state: row.original})}>조회</Button>)
},
  },
   // {
   //   id: "actions",
   //   enableHiding: false,
   //   cell: ({ row }) => {
   //     const payment = row.original
   //
   //     return (
   //       <DropdownMenu>
   //         <DropdownMenuTrigger asChild>
   //           <Button variant="ghost" className="h-8 w-8 p-0">
   //             <span className="sr-only">Open menu</span>
   //             <MoreHorizontal />
   //           </Button>
   //         </DropdownMenuTrigger>
   //         <DropdownMenuContent align="end">
   //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
   //           <DropdownMenuItem
   //             onClick={() => console.log("TEST")}>
   //             수정
   //           </DropdownMenuItem>
   //           <DropdownMenuSeparator />
   //           <DropdownMenuItem>삭제</DropdownMenuItem>
   //         </DropdownMenuContent>
   //       </DropdownMenu>
   //     )
   //   },
   // },
]
