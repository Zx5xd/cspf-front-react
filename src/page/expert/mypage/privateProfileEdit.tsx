import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserEntity} from "@/types/entity.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {expertInfoUpdate} from "@/services/UserManage.ts";
import {FormEvent} from "react";
import {useExpertStore} from "@/store/useExpertStore.ts";

// Zod 스키마 정의
const accountSchema = z.object({
    company: z.string().min(1, "회사명을 입력하세요."),
    phone: z
        .string()
        .regex(/^010\d{4}\d{4}$/, "전화번호는 010XXXXXXXX 형식으로 입력하세요."),
});

const passwordSchema = z
    .object({
        password: z
            .string()
            .min(4, "새 비밀번호는 최소 4자 이상이어야 합니다.")
            .max(20, "새 비밀번호는 최대 20자 이하여야 합니다."),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.",
        path: ["confirm"], // 에러를 확인 비밀번호 필드에 연결
    });


export const ExpertPrivateProfileEdit = ({ isOpen, onClose, userCode }: { isOpen: boolean; onClose: () => void; userCode:string }) =>{
    const {setExpert} = useExpertStore()

    const {
        register: registerAccount,
        handleSubmit: handleAccountSubmit,
        formState: { errors: accountErrors },
    } = useForm({
        resolver: zodResolver(accountSchema),
    });

    // 비밀번호 수정 폼
    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
    } = useForm({
        resolver: zodResolver(passwordSchema),
    });

    const onAccountSubmit = (data: any, e: FormEvent) => {
        e.preventDefault()
        console.log("회원정보 데이터:", data);
        data.expertCode = userCode
        // 서버로 데이터 전송
        expertInfoUpdate(data).then(result => {console.log(result)
            setExpert(prevData => ({...prevData, ...data}))
            onClose()
        })
    };

    const onPasswordSubmit = (data: any, e:FormEvent) => {
        e.preventDefault()
        console.log("비밀번호 데이터:", data);
        const sendData = {
            password: data.password,
            expertCode: userCode,
        }
        expertInfoUpdate(sendData).then(result => {console.log(result)
            setExpert(prevData => ({...prevData, ...data}))
            onClose()
        })

    };

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-[600px] sm:w-[540px]">
                <SheetHeader className={"pb-2 pt-1"}>
                    <SheetTitle>Edit profile</SheetTitle>
                </SheetHeader>

        <Tabs defaultValue="account" className="w-[350px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">회원정보 수정</TabsTrigger>
                <TabsTrigger value="password">비밀번호 수정</TabsTrigger>
            </TabsList>

            {/* 회원정보 수정 */}
            <TabsContent value="account">
                <form onSubmit={ (e)=>{
                   e.preventDefault()
                    handleAccountSubmit(onAccountSubmit)(e)// 데이터 처리
                }}>
                    <Card>
                        <CardHeader>
                            <CardTitle>회원정보 수정</CardTitle>
                            <CardDescription className={"text-xs"}>
                                회원정보를 수정한 후 저장 버튼을 눌러주세요.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="addr">회사명</Label>
                                <Input id="addr" {...registerAccount("company")} />
                                {accountErrors.addr && (
                                    <p className="text-red-500">{accountErrors.addr.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="phone">전화번호</Label>
                                <Input id="phone" {...registerAccount("phone")} />
                                {accountErrors.phone && (
                                    <p className="text-red-500">{accountErrors.phone.message}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant={"outline"} type="submit">저장</Button>
                        </CardFooter>
                    </Card>
                </form>
            </TabsContent>

            {/* 비밀번호 수정 */}
            <TabsContent value="password">
                <form onSubmit={(e) => {e.preventDefault()
                    handlePasswordSubmit(onPasswordSubmit)(e)
                }}>
                    <Card>
                        <CardHeader>
                            <CardTitle>비밀번호 수정</CardTitle>
                            <CardDescription className={"text-xs"}>
                                새 비밀번호를 설정한 후 저장 버튼을 눌러주세요.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="new">새 비밀번호</Label>
                                <Input
                                    id="new"
                                    type="password"
                                    {...registerPassword("password")}
                                />
                                {passwordErrors.new && (
                                    <p className="text-red-500">{passwordErrors.new.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="confirm">새 비밀번호 확인</Label>
                                <Input
                                    id="confirm"
                                    type="password"
                                    {...registerPassword("confirm")}
                                />
                                {passwordErrors.confirm && (
                                    <p className="text-red-500">
                                        {passwordErrors.confirm.message}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant={"outline"} type="submit">저장</Button>
                        </CardFooter>
                    </Card>
                </form>
            </TabsContent>
        </Tabs>
                <SheetFooter>
                </SheetFooter>
        {/*</Tabs>*/}
            </SheetContent>
        </Sheet>
    );
}
