import ErrorBase from "@/app/error-base";

export default function DatabaseError() {
    return <ErrorBase
        title="Unable to connect to database"
    />
}