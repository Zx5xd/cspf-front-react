import {ColumnDef} from "@tanstack/react-table"
import {Button} from "@/components/ui/button.tsx";
import {ExpertEntity} from "@/types/entity.ts";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {sendMail, visionCert} from "@/services/Utils.ts";
import {expertGetSearch, expertInfoDelete, expertInfoUpdate} from "@/services/UserManage.ts";
import {EmailType} from "@/types/mail.ts";

export const chckCertColumns: ColumnDef<ExpertEntity>[] = [
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "company",
    header: "회사명",
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          className="w-full"
        >
          전화번호
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "actions",
    header: "조회",
    cell: ({ row }) => {
        const [visionText, setVisionText] = useState<string>('Loading')
        const [imageAddr, setImageAddr] = useState<string>('')
        const host = import.meta.env.VITE_BE_URL
        const [isOpen, setIsOpen] = useState<boolean>(false)

      useEffect(() => {
        expertGetSearch('images',row.original.expertCode).then(data => {
          console.log(data)
          setImageAddr(host+data)
          visionCert(data).then(visionResult => {setVisionText(visionResult)})
        })
        console.log(row.original.certImage)
        //
      }, []);

      return(<>

        <Dialog open={isOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"} onClick={() => setIsOpen(true)}>조회</Button>
          </DialogTrigger>
          <DialogContent >

            <DialogHeader>
              <DialogTitle>{row.getValue('name')}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-row space-x-4">
              {/* 왼쪽 이미지 */}
              <div className="w-1/2">
                <img
                    src={imageAddr}
                    alt="Dialog Image"
                    className="rounded-lg w-full h-auto object-cover"
                />
              </div>
              {/* 오른쪽 텍스트 */}
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-sm text-gray-600">
                  {visionText}
                </p>
              </div>
            </div>
            <DialogFooter className="justify-end">
              <Button variant="secondary" onClick={() => {
                sendMail(EmailType.denial, row.original)
                expertInfoDelete(row.original.expertCode)
                setIsOpen(false)
              }}>
                거부
              </Button>
              <Button variant="outline" onClick={() => {
                const patchData = {
                  credentialStatus: 1,
                  expertCode: row.original.expertCode,
                }

                expertInfoUpdate(patchData)
                sendMail(EmailType.success, row.original)
                setIsOpen(false)
              }}>
                저장
              </Button>
            </DialogFooter>

          </DialogContent>
        </Dialog>


      </>)
    },
  },
]
