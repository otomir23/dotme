import ErrorBase from "@/components/error-base"

export default function DatabaseError() {
    return (
        <ErrorBase
            title="Unable to connect to database"
        />
    )
}
