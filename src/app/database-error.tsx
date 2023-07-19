import {ExclamationCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function DatabaseError() {
    return (
        <div className="mx-auto mt-32 text-center max-w-md w-full">
            <ExclamationCircleIcon className="w-8 h-8 inline mb-4" />
            <h1 className="text-2xl font-bold">Unable to connect to database</h1>
            <p>
                Please{' '}
                <Link className="decoration-dashed underline underline-offset-4" href="https://t.me/otomir23">contact me</Link>{' '}
                to resolve the issue.
            </p>
        </div>
    )
}