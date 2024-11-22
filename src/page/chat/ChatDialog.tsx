import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FilePlus2Icon, LucideFile} from "lucide-react";
import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {imgUpload} from "@/services/Chat.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useChatRoomStore} from "@/store/chatStore.ts";

export const ChatDialog = ({id}:{id:string}) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]); // 파일을 배열로 관리
  const [isOpen, setIsOpen] = useState(false);

  const {socket} = useChatRoomStore();

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList?.length) {
      const newFiles = Array.from(fileList);
      setFiles((prevFiles) => {
        // Add new files to the existing list, but limit the total to 3 files
        const updatedFiles = [...prevFiles, ...newFiles];
        return updatedFiles.slice(0, 3); // 최대 3개까지만 저장
      });
      console.log(files)
      setIsOpen(true); // 파일이 선택되면 Dialog 열기
    }
    e.target.value = ''; // 동일한 파일을 다시 선택할 수 있도록 input 초기화
  };

  const upload = () => {
    const imageFormData = new FormData();
    const fileFormData = new FormData();

    // Separate images and other files
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        imageFormData.append("files", file);
      } else {
        fileFormData.append("files", file);
      }
      console.log(file); // 파일 정보 출력 (디버깅용)
    });

    imgUpload(id,imageFormData).finally(()=> {
      setIsOpen(false);
      setFiles([]); // 파일 초기화
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setFiles([]); // 파일 초기화
  };

  return(
    <>
      <input type="file" hidden={true} ref={inputFileRef} multiple onChange={onChangeFiles} />
      <TooltipProvider>
        <Tooltip delayDuration={120}>
          <TooltipTrigger asChild>
            <Button variant="outline" className="md:w-10 md:h-10 rounded-2xl mr-2" onClick={() => inputFileRef.current?.click()}>
              <FilePlus2Icon/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>첨부파일</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <span style={{display:"none"}}/>
        </DialogTrigger>
        <DialogContent className="max-h-[75vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              파일 업로드
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="space-y-4 max-h-[50vh]">
            {files.length > 0 && (
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center space-x-4">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="미리보기 이미지"
                        className="w-16 h-16 object-cover border border-gray-300 rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded bg-gray-100">
                        <span className="text-sm text-gray-500">
                          <LucideFile/>
                        </span>
                      </div>
                    )}
                    <p className="text-sm">{file.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
          <DialogFooter>
            <Button onClick={upload}>업로드</Button>
            <Button variant="destructive" onClick={handleClose}>취소</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
