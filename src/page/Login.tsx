import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {login} from '@/services/Auth'
import {isAxiosError} from "axios";
import {toast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";
import {useNavigate} from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(2, {message:"아이디는 최소 2자 이상이어야 합니다."}),
  password: z.string().min(3,{message:"비밀번호는 최소 3자 이상이어야 합니다."})
})

export const Login = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    try {
      await login("user", {username:values.username,password:values.password})
      navigate("/")
    } catch (e) {
      if (isAxiosError(e)) {
        toast({
          title: '로그인 실패',
          description: '아이디 또는 비밀번호를 확인해주세요.',
          variant: 'destructive', // 스타일 조정
        });
      }
    }
  }

  return(
    <div className="md:container md:mx-auto p-4 h-screen">
      <div className="flex flex-row items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border rounded-2xl p-8 shadow-md w-96">
              <h2 className="text-center text-2xl font-bold mb-2">로그인</h2>
              <div className="relative flex flex-col items-center my-5 w-full">
                <FormField
                  control={form.control}
                  name="username"
                  render={({field})=>(
                  <FormItem className="w-4/5 mb-2">
                    <FormControl>
                      <Input type="text" placeholder="아이디" className="w-full" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField
                  control={form.control}
                  name="password"
                  render={({field})=>(
                  <FormItem className="w-4/5">
                    <FormControl>
                      <Input type="password" placeholder="비밀번호" className="w-full" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
              </div>
              <div className="text-center">
                <Button type="submit" className="w-4/5">로그인</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Toaster/>
    </div>
  )
}