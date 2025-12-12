import { Check, X } from "lucide-react"

interface SaveStatusMessageProps {
    saved: boolean
    error: string | null
}

export function SaveStatusMessage({ saved, error }: SaveStatusMessageProps) {
    if (error) {
        return (
            <div
                role="alert"
                aria-live="assertive"
                className="flex items-center gap-3 rounded-lg border-2 border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive shadow-sm"
            >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/20">
                    <X className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="font-medium">{error}</span>
            </div>
        )
    }

    if (saved) {
        return (
            <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-3 rounded-lg border-2 border-green-600 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm dark:bg-green-950/30 dark:text-green-400"
            >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Check className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="font-medium">Settings saved successfully</span>
            </div>
        )
    }

    return null
}
