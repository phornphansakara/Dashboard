"use client"
import { useParams, usePathname, useSearchParams } from "next/navigation"

export default function Page(){
    
    const params = useParams<{account: string}>()
    const pathName = usePathname();
    const searchParams = useSearchParams();

    return(
        <h2 className="text-center">
            Overview: {params.account}
            Path Name: {pathName}
            Search Params: {searchParams.get("id")}
            Search Params: {searchParams.get("transaction")}
        </h2>
    )
}