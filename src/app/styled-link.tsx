import {ComponentProps} from "react";
import Link from "next/link";

export default function StyledLink({className, ...props}: ComponentProps<typeof Link>) {
    return <Link className={"underline font-medium underline-offset-2 " + className} {...props} />
}