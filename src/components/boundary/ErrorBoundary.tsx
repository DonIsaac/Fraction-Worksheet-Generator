import React, { Component, ErrorInfo, PropsWithChildren } from "react"

// eslint-disable-next-line @typescript-eslint/ban-types
type ErrorBoundaryProps = PropsWithChildren<{}>
export interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: PropsWithChildren<Record<string, never>>) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: any): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(error)
        console.error(errorInfo)
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h1>Something went wrong, please try again.</h1>
                    <p>If this continues, please <a href="https://github.com/DonIsaac/Fraction-Worksheet-Generator/issues">submit a bug report</a>.</p>
                </div>
            )

        }

        return this.props.children
    }
}
