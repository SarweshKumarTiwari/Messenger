export default function SubmitSpinner() {
    return (
        <div className="rounded-lg p-2 bg-sky-300 border-sky-400 w-full flex justify-center text-white">
            <div className="float-center inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
        </div>
    )
}
