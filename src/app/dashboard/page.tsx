import { redirect } from "next/navigation";

export default function Page(){
    
    const isLoggedIn = true;

    if (isLoggedIn){
        redirect("/dashboard/overview")
    }else{
        redirect("/auth/login")
    }
}