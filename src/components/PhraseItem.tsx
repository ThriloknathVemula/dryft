export const PhraseItem = ({ phrase, index }: { phrase: string; index: number }) => {
    return (
        <div
            key={index}
            className="flex items-center justify-center px-3 py-2 rounded-lg shadow-inner text-white font-medium text-sm tracking-wide cursor-default hover:bg-gray-900 transition-colors duration-300 select-none"
        >
            {phrase}
        </div>
    )
}