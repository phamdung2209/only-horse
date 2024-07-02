const Separate = ({ className }: { className?: string }) => {
    return <div aria-hidden="true" className={`h-2 w-full bg-muted ${className}`} />
}

export default Separate
