import { LogInIcon } from 'lucide-react'

export function Header() {
  return (
    <div className="mx-auto flex w-full max-w-[900px] items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Product Roadmap</h1>
        <p className="text-navy-100 text-sm">Follow the development of our entire platform</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative"></div>
        <button className="bg-navy-700 border-navy-500 hover:bg-navy-600 flex size-8 cursor-pointer items-center justify-center rounded-full border-2 transition-colors duration-150">
          <LogInIcon className="text-navy-200 size-3.5" />
        </button>
      </div>
    </div>
  )
}
