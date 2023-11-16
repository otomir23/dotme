import {cva} from "@/cva.config";
import {VariantProps} from "cva";
import {ComponentProps} from "react";
import Link from "next/link";

export const buttonStyles = cva({
    base: `rounded-md p-2 border-2 bg-neutral-100 border-neutral-200 text-neutral-900 dark:bg-neutral-900 flex 
    dark:border-neutral-800 dark:text-neutral-100 fill-current justify-center items-center focus:outline-none 
    focus:ring ring-neutral-100 dark:ring-neutral-900`,
});


export function LinkButton(
    {className, children, ...props}: VariantProps<typeof buttonStyles> & ComponentProps<typeof Link>
) {
    return (
        <Link className="contents" {...props}>
            <Button className={className}>
                {children}
            </Button>
        </Link>
    )
}

export function Button(
    {className, ...props}: VariantProps<typeof buttonStyles> & ComponentProps<'button'>
) {
    return (
        <button className={buttonStyles({className})} {...props} />
    )
}