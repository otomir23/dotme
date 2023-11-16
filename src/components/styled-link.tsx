import {ComponentProps} from "react";
import Link from "next/link";
import {cva} from "@/cva.config";

const linkStyles = cva({
    base: "underline font-medium underline-offset-2 focus:outline-none focus:underline-offset-8 focus:bg-white/10 rounded"
})

export default function StyledLink({className, ...props}: ComponentProps<typeof Link>) {
    return <Link className={linkStyles({className})} {...props} />
}